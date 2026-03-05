import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  [key: string]: unknown;
}

const Image = ({ src, alt, width, height, className, style }: ImageProps) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    style={style}
  />
);

export default Image;
