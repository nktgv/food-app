import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface UserIconProps {
  size?: number;
  color?: string;
}

export default function UserIcon({ size = 24, color = 'currentColor' }: UserIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 6.35 6.35" fill="none">
      <Path
        d="M 3.1708661,3.2974124 C 1.907863,3.2997936 0.86304935,4.299744 0.79995125,5.5634239 A 0.26460945,0.26460945 0 0 0 1.0655682,5.8404096 H 5.2864993 A 0.26460945,0.26460945 0 0 0 5.5500489,5.5634239 C 5.48687,4.2981438 4.4396051,3.2975523 3.1750001,3.2974124 Z"
        fill={color}
      />
      <Path
        d="m 3.1750901,0.5095872 c -0.669506,0 -1.2153281,0.54839 -1.2153321,1.21864 -1.9e-6,0.6702501 0.5458221,1.2205301 1.2153321,1.2205301 0.6695099,0 1.217222,-0.55028 1.2172191,-1.2205301 -4e-6,-0.67025 -0.5477132,-1.21864 -1.2172191,-1.21864 z"
        fill={color}
      />
    </Svg>
  );
}
