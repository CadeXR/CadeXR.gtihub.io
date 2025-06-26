# InTextImage Component

## Overview

The InTextImage component provides in-text image support for FrostedWindow content with automatic text wrapping and responsive sizing. Images are contained within window bounds and support various positioning options.

## Features

- **Text Wrapping**: Images can float left, right, or not at all
- **Responsive Sizing**: Automatically adjusts size based on screen size
- **Window Bounds**: Images are constrained to stay within window boundaries
- **Hover Effects**: Subtle scale and shadow effects on hover
- **Accessibility**: Proper alt text support
- **Customizable**: Various styling options available

## Usage

### Basic Usage
```tsx
import InTextImage from './components/UI/InTextImage';

<InTextImage
  src="/path/to/image.jpg"
  alt="Description of image"
  width={180}
  height={180}
  float="left"
/>
```

### Advanced Usage
```tsx
<InTextImage
  src="/path/to/image.jpg"
  alt="Description of image"
  width={200}
  height={150}
  float="right"
  margin="0 0 1rem 1rem"
  borderRadius="0.75rem"
  objectFit="cover"
  style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | required | Image source path |
| `alt` | string | required | Alternative text for accessibility |
| `width` | number \| string | 'auto' | Image width (responsive on mobile) |
| `height` | number \| string | 'auto' | Image height (responsive on mobile) |
| `float` | 'left' \| 'right' \| 'none' | 'left' | Text wrapping direction |
| `margin` | string | '0 1rem 1rem 0' | CSS margin (responsive) |
| `borderRadius` | string | '0.5rem' | Border radius for rounded corners |
| `objectFit` | string | 'cover' | CSS object-fit property |
| `className` | string | '' | Additional CSS classes |
| `style` | object | {} | Additional inline styles |

## Responsive Behavior

### Desktop (>768px)
- Full specified width/height
- Standard margins
- No size restrictions

### Mobile (≤768px)
- Maximum width: 150px
- Maximum height: 150px
- Reduced margins
- Maintains aspect ratio

### Very Small (≤480px)
- Maximum width: 120px
- Maximum height: 120px
- Minimal margins
- Optimized for small screens

## Text Wrapping

The component automatically handles text wrapping:

- **Left Float**: Image appears on the left, text flows around the right
- **Right Float**: Image appears on the right, text flows around the left
- **None**: Image appears inline with text

Use `<div style={{ clear: 'both' }}></div>` to clear floats when needed.

## Styling

The component includes:
- Subtle shadow and border
- Hover effects (scale and enhanced shadow)
- Responsive sizing
- Proper containment within window bounds

## Example in AboutContent

```tsx
<section>
  <InTextImage
    src="/media/headshotnew.jpg"
    alt="Professional headshot"
    width={isMobile ? 120 : 180}
    height={isMobile ? 120 : 180}
    float="left"
    borderRadius="0.75rem"
    objectFit="cover"
  />
  <p className="mb-4 text-sm md:text-base">
    Text content that wraps around the image...
  </p>
  <div style={{ clear: 'both' }}></div>
</section>
```

## CSS Classes

The component uses the `.in-text-image` class which includes:
- Box shadow and border styling
- Hover effects
- Responsive behavior
- Proper float handling 