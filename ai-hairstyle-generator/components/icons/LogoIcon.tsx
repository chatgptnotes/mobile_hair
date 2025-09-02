import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, SvgProps } from 'react-native-svg';

export const LogoIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 100 100" {...props}>
        <Defs>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="rgb(129, 140, 248)" stopOpacity="1" />
                <Stop offset="100%" stopColor="rgb(167, 139, 250)" stopOpacity="1" />
            </LinearGradient>
            <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="rgb(55, 65, 81)" stopOpacity="1" />
                <Stop offset="100%" stopColor="rgb(30, 41, 59)" stopOpacity="1" />
            </LinearGradient>
        </Defs>
        <Rect width="100" height="100" rx="24" fill="url(#grad2)"/>
        <G transform="translate(20 20) scale(0.6)">
            <Path d="M50 0 C 77.6142 0, 100 22.3858, 100 50 C 100 77.6142, 77.6142 100, 50 100 C 22.3858 100, 0 77.6142, 0 50 C 0 22.3858, 22.3858 0, 50 0 Z" fill="url(#grad1)"/>
            <Path d="M50 15 C 69.33 15, 85 30.67, 85 50 C 85 69.33, 69.33 85, 50 85 C 30.67 85, 15 69.33, 15 50 C 15 30.67, 30.67 15, 50 15 Z" fill="rgb(30, 41, 59)"/>
            <Circle cx="50" cy="50" r="25" fill="url(#grad1)"/>
        </G>
        <Circle cx="78" cy="18" r="6" fill="#34d399"/>
    </Svg>
);
