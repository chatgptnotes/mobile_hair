import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ResizeIcon: React.FC<SvgProps> = (props) => (
    <Svg height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2} {...props}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" />
    </Svg>
);
