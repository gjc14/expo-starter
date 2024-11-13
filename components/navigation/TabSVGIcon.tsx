import Svg, { SvgProps } from "react-native-svg";

import { type FC, type PropsWithChildren } from "react";

export interface IconProps extends SvgProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export const TabSvgIcon: FC<PropsWithChildren<IconProps>> = ({
  children,
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  ...rest
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </Svg>
);
