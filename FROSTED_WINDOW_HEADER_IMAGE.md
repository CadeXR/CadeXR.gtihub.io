# FrostedWindow Header Image Feature

## Overview

The FrostedWindow component now supports optional header images that can be displayed at the top of any frosted window. This feature maintains full backward compatibility while adding visual enhancement capabilities.

## Usage

### Basic Usage (No Header Image)
```tsx
<FrostedWindow
  id="my-window"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  defaultPosition={{ x: 100, y: 100 }}
>
  <div>Window content here</div>
</FrostedWindow>
```

### With Header Image
```tsx
<FrostedWindow
  id="my-window"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  defaultPosition={{ x: 100, y: 100 }}
  headerImage={{
    src: "/path/to/image.jpg",
    alt: "Header image description",
    height: "200px",
    objectFit: "cover"
  }}
>
  <div>Window content here</div>
</FrostedWindow>
```

## Header Image Properties

The `headerImage` prop accepts an object with the following properties:

- **`src`** (required): The path to the image file
- **`alt`** (optional): Alternative text for accessibility (defaults to "Header image")
- **`height`** (optional): Height of the image container (defaults to "150px" on desktop, "120px" on mobile)
- **`objectFit`** (optional): CSS object-fit property for the image (defaults to "cover")

### Object Fit Options
- `cover`: Scales the image to cover the entire container (may crop)
- `contain`: Scales the image to fit within the container (no cropping)
- `fill`: Stretches the image to fill the container
- `none`: No scaling applied
- `scale-down`: Similar to `contain` but never scales up

## Styling Details

When a header image is present:
- The image container has rounded top corners to match the window's border radius
- The window header (title bar) has no top border radius since the image handles it
- The main window container only has bottom border radius
- The image is positioned above the title bar with a subtle border separator

## Responsive Behavior

- **Desktop**: Default image height is 150px
- **Mobile**: Default image height is 120px
- The image container is fully responsive and adapts to the window width
- All existing responsive behaviors of FrostedWindow are preserved

## Backward Compatibility

This feature is completely backward compatible:
- Existing FrostedWindow usage will continue to work unchanged
- The `headerImage` prop is optional
- All existing props and functionality remain the same
- No breaking changes to the component API

## Example Implementation

See `src/components/UI/FrostedWindowExample.tsx` for a complete working example that demonstrates both basic usage and header image usage.

## Technical Implementation

The header image feature:
- Uses conditional rendering to only show the image when the prop is provided
- Maintains the existing window structure and styling
- Properly handles border radius coordination between image and window elements
- Preserves all existing positioning, centering, and responsive logic
- Integrates seamlessly with the existing particle system and window management 