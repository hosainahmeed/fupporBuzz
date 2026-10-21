import { Path, Svg } from "react-native-svg";

export function CommentIcon({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Svg
      width={width || 19}
      height={height || 17}
      viewBox="0 0 19 19"
      fill="none"
    >
      <Path
        d="M19 9.5C19 14.7467 14.7467 19 9.50001 19C7.87191 19 6.3394 18.5904 5 17.8687C3.13177 16.862 1.87462 17.7979 0.76593 17.9658C0.59774 17.9913 0.43025 17.9302 0.30997 17.81C0.12741 17.6274 0.0926601 17.3451 0.19351 17.1074C0.62866 16.0818 1.02821 14.1382 0.48341 12.5C0.16981 11.557 0 10.5483 0 9.5C0 4.25329 4.2533 0 9.50001 0C14.7467 0 19 4.25329 19 9.5Z"
        fill="#31C392"
      />
    </Svg>
  );
}
