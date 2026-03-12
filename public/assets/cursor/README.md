# Cursor Assets

Drop your custom cursor image files here.

## Expected Files
| File | State | Recommended Size |
|------|-------|-----------------|
| `default.png` | Default cursor | 32x32px or 64x64px |
| `pointer.png` | Hover over links/buttons | 32x32px or 64x64px |
| `drag.png` | Dragging state | 32x32px or 64x64px |
| `hidden.png` | Hidden/invisible state | optional |

## Format
- PNG with transparency preferred
- SVG also supported (reference in Cursor.tsx)
- Keep file size small — cursors load on every page

## How It Works
The `Cursor` component (`src/components/ui/Cursor/`) reads your mouse position 
and renders an absolutely-positioned `<img>` element using these files.
Global `cursor: none` is applied via `src/styles/cursor.css`.
