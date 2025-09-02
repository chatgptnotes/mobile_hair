import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ResetIcon: React.FC = () => (
  <Svg
    height="20"
    width="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#e2e8f0"
    strokeWidth={2}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0112 3v0a9 9 0 017.5 13.5M20 20l-1.5-1.5A9 9 0 0112 21v0a9 9 0 01-7.5-13.5"
    />
  </Svg>
);
