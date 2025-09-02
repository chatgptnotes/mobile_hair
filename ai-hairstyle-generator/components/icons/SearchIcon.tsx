import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const SearchIcon: React.FC<SvgProps> = (props) => (
    <Svg height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </Svg>
);
