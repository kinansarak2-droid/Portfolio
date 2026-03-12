# Fonts

Drop self-hosted font files here.

## Structure
Create a subfolder per font family:
```
fonts/
  MyFont/
    Regular.woff2
    Medium.woff2
    Bold.woff2
    Italic.woff2
```

## Declaring Fonts
In `src/styles/typography.css`:
```css
@font-face {
  font-family: 'MyFont';
  src: url('/assets/fonts/MyFont/Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Format Priority
Prefer `.woff2` (best compression). Keep `.woff` as fallback.
