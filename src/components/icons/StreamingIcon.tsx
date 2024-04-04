/* eslint-disable react/require-default-props */
interface Prop {
    width?: number;
    height?: number;
  }

export function StreamingIcon({ ...props }: Prop) {
  return <img className="streaming-icon" {...props} src="./streaming-icon-old.png" alt="" />;
}
