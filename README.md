# Linktree Personal — Iván

Una página de enlaces minimalista y moderna con estética oscura, diseñada para mostrar tu perfil profesional y proyectos.

## Características

- **Single HTML file** — Sin dependencias externas (solo fuentes de Google)
- **Dark theme** — Negros profundos con un acento eléctrico (cyan)
- **Mobile-first** — Diseño responsive desde el inicio
- **Glassmorphism** — Tarjetas con blur y transparencia sutil
- **Animaciones suaves** — Hover states con transiciones de 200-300ms
- **CSS Variables** — Personalización de colores en un solo lugar
- **Accesible** — Focus states, reduced motion support

## Vista Previa

Abre `index.html` directamente en tu navegador — no requiere servidor.

## Personalización

### Colores

Todos los colores están en variables CSS al inicio del `<style>`:

```css
:root {
    /* Backgrounds */
    --bg-primary: #0a0a0b;      /* Fondo principal */
    --bg-secondary: #111113;    /* Fondo secundario */
    --bg-card: rgba(20, 20, 22, 0.8);  /* Tarjetas */
    
    /* Text */
    --text-primary: #f0f0f0;    /* Texto principal */
    --text-secondary: #8a8a8e;  /* Texto secundario */
    --text-muted: #5a5a5e;      /* Texto apagado */
    
    /* Accent */
    --accent: #00d4ff;         /* Color principal de acento */
    --accent-glow: rgba(0, 212, 255, 0.15);  /* Glow del acento */
}
```

#### Cambiar el color de acento

Para un acento verde neón:
```css
--accent: #00ff88;
--accent-glow: rgba(0, 255, 136, 0.15);
--border-accent: rgba(0, 255, 136, 0.2);
```

Para un acento coral:
```css
--accent: #ff6b6b;
--accent-glow: rgba(255, 107, 107, 0.15);
--border-accent: rgba(255, 107, 107, 0.2);
```

Para un acento púrpura:
```css
--accent: #a855f7;
--accent-glow: rgba(168, 85, 247, 0.15);
--border-accent: rgba(168, 85, 247, 0.2);
```

### Contenido

#### Avatar
Busca `<div class="avatar">I</div>` y cambia la letra. Para usar una imagen:

```html
<div class="avatar">
    <img src="tu-foto.jpg" alt="Iván" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">
</div>
```

#### Enlaces Sociales
Cada enlace tiene esta estructura:

```html
<a href="https://youtube.com/@tucanal" class="link-card" target="_blank" rel="noopener">
    <div class="link-icon">
        <svg viewBox="0 0 24 24"><path d="..."/></svg>
    </div>
    <div class="link-content">
        <div class="link-title">YouTube</div>
        <div class="link-subtitle">Tu descripción</div>
    </div>
    <span class="link-arrow">→</span>
</a>
```

#### Proyectos
Cada proyecto:

```html
<div class="project-card">
    <div class="project-header">
        <span class="project-name">Nombre</span>
        <span class="project-status">Active</span>
    </div>
    <p class="project-desc">Descripción breve.</p>
    <div class="project-tags">
        <span class="tag">Tech1</span>
        <span class="tag">Tech2</span>
    </div>
</div>
```

## Deploy

### GitHub Pages (Gratis)

1. Crea un repositorio: `tu-usuario.github.io` o cualquier nombre
2. Sube el `index.html` a la raíz
3. Ve a Settings → Pages → Source: main branch
4. Tu página estará en `https://tu-usuario.github.io/nombre-repo`

### Netlify (Gratis)

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta con el `index.html`
3. Listo — URL generada automáticamente

### Vercel (Gratis)

1. Ve a [vercel.com](https://vercel.com)
2. Importa desde GitHub o arrastra archivos
3. Deploy automático

### Cualquier hosting estático

Sube el `index.html` a cualquier servidor web (Apache, Nginx, S3, etc.)

## Estructura

```
linktree/
├── index.html      # Página completa (único archivo necesario)
└── README.md       # Este archivo
```

## Fuente

Por defecto usa [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts.

Para cambiarla, modifica el `<link>` en el `<head>`:

```html
<!-- Ejemplo: Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Y actualiza la variable:
```css
--font-main: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

## Licencia

Libre para uso personal y comercial. No hay restricciones.

---

Hecho con intención.