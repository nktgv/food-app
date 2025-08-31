import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ShoppingBagIconProps {
  size?: number;
  color?: string;
}

export default function ShoppingBagIcon({ size = 24, color = 'currentColor' }: ShoppingBagIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 17" fill="none">
      <Path
        d="M2.625 4.25008L5.25 1.41675H15.75L18.375 4.25008M2.625 4.25008V14.1667C2.625 14.5425 2.80937 14.9028 3.13756 15.1685C3.46575 15.4342 3.91087 15.5834 4.375 15.5834H16.625C17.0891 15.5834 17.5342 15.4342 17.8624 15.1685C18.1906 14.9028 18.375 14.5425 18.375 14.1667V4.25008M2.625 4.25008H18.375M14 7.08341C14 7.83486 13.6313 8.55553 12.9749 9.08688C12.3185 9.61824 11.4283 9.91675 10.5 9.91675C9.57174 9.91675 8.6815 9.61824 8.02513 9.08688C7.36875 8.55553 7 7.83486 7 7.08341"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
