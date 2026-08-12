# Juegos de mesa (móvil)

Página **estática** para jugar desde el móvil a tres juegos de mesa:

1. **Amigos de mierda**
2. **Mente vacuna**
3. **Wavelength**

No necesita backend. Todo corre en el navegador. El estado del mazo (orden, cartas quitadas, idioma, etc.) se guarda en `localStorage` y cookies del dispositivo.

## Controles

| Gesto / botón | Acción |
|---|---|
| Swipe **←** | Siguiente carta |
| Swipe **→** | Anterior carta |
| Swipe **↑** o botón Quitar | Sacar carta del mazo |
| 🔀 | Barajar las que quedan |
| 🗑 | Ver cartas quitadas, multi-selección y **Recuperar** |

### Wavelength

- Texto por defecto en **español** (JSON `assets/wavelength-parejas.json`)
- Botón **ES/EN** para cambiar idioma
- Botón **📷** para ver la foto de la carta
- Pensado para poner el móvil **en horizontal** delante de la ruleta

## Probar en local

Abre la carpeta con cualquier servidor estático (recomendado; algunos navegadores limitan `file://`):

```bash
# Python
python3 -m http.server 8765

# o Node
npx serve .
```

Luego entra desde el móvil (misma Wi‑Fi) a:

`http://<IP-de-tu-ordenador>:8765/`

Opcional: `server.py` en esta carpeta es un servidor local con proxy; **no hace falta** para GitHub Pages.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub e sube **todo el contenido** de este proyecto (incluida la carpeta `cards/`).
2. En el repo: **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` (o `master`), carpeta: `/ (root)`.
5. Guarda y espera 1–2 minutos.

La URL será algo como:

`https://<tu-usuario>.github.io/<nombre-repo>/`

### Importante

- Las rutas de cartas y assets son **relativas** (`cards/…`, `assets/…`, `js/…`), válidas tanto en la raíz del sitio como en un subpath de proyecto de Pages.
- El repo será **pesado** (~decenas/cientos de MB) por las imágenes de las cartas. GitHub permite repos grandes, pero el primer `git push` puede tardar.
- Si usas Git LFS, asegúrate de que Pages sirva bien los binarios (a veces es más simple subir PNGs normales sin LFS).

## Estructura

```
├── index.html
├── README.md
├── css/styles.css
├── js/app.js
├── assets/
│   ├── icon-*.png
│   ├── mente-reglas.png
│   └── wavelength-parejas.json
└── cards/
    ├── amigos/        # 001.png … 111.png
    ├── mente/         # 001.png … 252.png
    └── wavelength/    # 001.png … 250.png
```

## Privacidad / datos

No hay servidor de juego ni cuentas. Solo almacenamiento local del navegador en el dispositivo que uses.

## Licencia de contenido

Las cartas e imágenes pertenecen a sus respectivos editores/autores de los juegos de mesa. Este proyecto es una herramienta personal de ayuda en partida; no redistribuyas comercialmente el material sin permiso.
