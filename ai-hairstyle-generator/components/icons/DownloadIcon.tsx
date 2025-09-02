import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const DownloadIcon: React.FC = () => (
  <Svg
    height="20"
    width="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="white"
    strokeWidth={2}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </Svg>
);
