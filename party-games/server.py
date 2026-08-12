#!/usr/bin/env python3
"""Mobile party-games server with card image proxy."""

from __future__ import annotations

import argparse
import mimetypes
import socket
import urllib.error
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONFIG = {
    "cards_upstream": "http://192.168.0.10:8000",
}

# local path segment -> remote folder path
CARD_MAP = {
    "amigos": "Amigos de mierda",
    "mente": "Mente vacuna/cartas_recortadas",
    "wavelength": "Wavelength",
}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/cards/"):
            self.proxy_card(path)
            return

        # default static
        super().do_GET()

    def proxy_card(self, path: str):
        # /cards/{game}/{file}
        parts = path.strip("/").split("/")
        if len(parts) != 3:
            self.send_error(404, "Not found")
            return
        _, game, filename = parts
        if game not in CARD_MAP:
            self.send_error(404, "Unknown game")
            return
        if ".." in filename or "/" in filename or "\\" in filename:
            self.send_error(400, "Bad filename")
            return

        remote_folder = CARD_MAP[game]
        upstream = CONFIG["cards_upstream"]
        # quote each path segment so spaces work but slashes stay
        remote_path = "/".join(
            urllib.parse.quote(seg) for seg in remote_folder.split("/")
        )
        remote_url = f"{upstream}/{remote_path}/{urllib.parse.quote(filename)}"
        try:
            req = urllib.request.Request(
                remote_url,
                headers={"User-Agent": "party-games-proxy/1.0"},
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = resp.read()
                content_type = resp.headers.get("Content-Type")
        except urllib.error.HTTPError as e:
            self.send_error(e.code, f"Upstream error: {e.reason}")
            return
        except Exception as e:
            self.send_error(502, f"Proxy error: {e}")
            return

        if not content_type:
            content_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"

        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "public, max-age=3600")
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        # quieter logs
        sys_stderr = __import__("sys").stderr
        print(f"[{self.log_date_time_string()}] {fmt % args}", file=sys_stderr)


def local_ips():
    ips = set()
    try:
        hostname = socket.gethostname()
        for info in socket.getaddrinfo(hostname, None):
            ip = info[4][0]
            if ":" not in ip and not ip.startswith("127."):
                ips.add(ip)
    except Exception:
        pass
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ips.add(s.getsockname()[0])
        s.close()
    except Exception:
        pass
    return sorted(ips)


def main():
    parser = argparse.ArgumentParser(description="Party games mobile server")
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument(
        "--upstream",
        default=CONFIG["cards_upstream"],
        help="Base URL of the card image server",
    )
    args = parser.parse_args()

    CONFIG["cards_upstream"] = args.upstream.rstrip("/")

    httpd = ThreadingHTTPServer((args.host, args.port), Handler)
    print("=" * 50)
    print("  Juegos de mesa · servidor móvil")
    print("=" * 50)
    print(f"  Carpeta:   {ROOT}")
    print(f"  Cartas:    {CONFIG['cards_upstream']}")
    print(f"  Local:     http://127.0.0.1:{args.port}/")
    for ip in local_ips():
        print(f"  Móvil:     http://{ip}:{args.port}/")
    print("=" * 50)
    print("  Ctrl+C para parar")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
        httpd.server_close()


if __name__ == "__main__":
    main()
