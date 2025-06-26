'use client'

import { useMediaQuery } from 'react-responsive';

interface InTextImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  float?: 'left' | 'right' | 'none'
  margin?: string
  borderRadius?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  className?: string
  style?: React.CSSProperties
}

export default function InTextImage({
  src,
  alt,
  width = 'auto',
  height = 'auto',
  float = 'left',
  margin = '0 1rem 1rem 0',
  borderRadius = '0.5rem',
  objectFit = 'cover',
  className = '',
  style = {}
}: InTextImageProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmall = useMediaQuery({ maxWidth: 480 });

  // Responsive sizing
  const getResponsiveWidth = () => {
    if (typeof width === 'number') {
      return isVerySmall ? Math.min(width, 120) : isMobile ? Math.min(width, 150) : width;
    }
    if (typeof width === 'string' && width.includes('px')) {
      const numWidth = parseInt(width);
      return isVerySmall ? Math.min(numWidth, 120) : isMobile ? Math.min(numWidth, 150) : numWidth;
    }
    return width;
  };

  const getResponsiveHeight = () => {
    if (typeof height === 'number') {
      return isVerySmall ? Math.min(height, 120) : isMobile ? Math.min(height, 150) : height;
    }
    if (typeof height === 'string' && height.includes('px')) {
      const numHeight = parseInt(height);
      return isVerySmall ? Math.min(numHeight, 120) : isMobile ? Math.min(numHeight, 150) : numHeight;
    }
    return height;
  };

  // Responsive margins
  const getResponsiveMargin = () => {
    if (isVerySmall) {
      return float === 'left' ? '0 0.5rem 0.5rem 0' : '0 0 0.5rem 0.5rem';
    }
    if (isMobile) {
      return float === 'left' ? '0 0.75rem 0.75rem 0' : '0 0 0.75rem 0.75rem';
    }
    return margin;
  };

  const imageStyle: React.CSSProperties = {
    float,
    width: getResponsiveWidth(),
    height: getResponsiveHeight(),
    margin: getResponsiveMargin(),
    borderRadius,
    objectFit,
    maxWidth: '100%',
    display: 'block',
    ...style
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`in-text-image ${className}`}
      style={imageStyle}
    />
  );
} 