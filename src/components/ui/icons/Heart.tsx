import Svg, { Path } from "react-native-svg";

export function Heart({ width, height }: { width?: number; height?: number }) {
  return (
    <Svg
      width={width || 21}
      height={height || 17}
      viewBox="0 0 21 18"
      fill="#31C392"
    >
      <Path d="M8.9107 16.9677C6.08942 14.858 0.5 10.0348 0.5 5.69444C0.5 2.82563 2.60526 0.5 5.5 0.5C7 0.5 8.5 1 10.5 3C12.5 1 14 0.5 15.5 0.5C18.3947 0.5 20.5 2.82563 20.5 5.69444C20.5 10.0348 14.9106 14.858 12.0893 16.9677C11.1399 17.6776 9.8601 17.6776 8.9107 16.9677Z" />
    </Svg>
  );
}
