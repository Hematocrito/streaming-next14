/* eslint-disable react/require-default-props */
interface Prop {
  width?: number;
  height?: number;
}

export function ModelEarningIcon({ ...props }: Prop) {
  return <img className="coin-icon" {...props} src="/modelcoin.png" alt="" />;
}
