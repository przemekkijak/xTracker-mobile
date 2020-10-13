import * as React from 'react';
import Svg, { Circle, Rect, Path, G, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';

export default function SvgComponent(props) {
  return (
<Svg width="100%" height="500" viewBox="0 160 558 473" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0)">
<Path d="M255.271 605.396C197.723 659.316 61.1119 648.143 0 635.816V0L558 0.596451V525.473L474.575 532.63C425.785 537.004 312.82 551.478 255.271 605.396Z" fill="url(#paint0_linear)"/>
</G>
<Defs>
<LinearGradient id="paint0_linear" x1="41.9624" y1="28.3868" x2="355.543" y2="432.409" gradientUnits="userSpaceOnUse">
<Stop stopColor="#537A8F"/>
<Stop offset="1" stopColor="#3B697C"/>
</LinearGradient>
<ClipPath id="clip0">
<Rect width="558" height="473" fill="white"/>
</ClipPath>
</Defs>
</Svg>

  );
}

