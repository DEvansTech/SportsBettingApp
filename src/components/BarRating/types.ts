export type Props = {
  value: number | undefined;
  status: string | undefined;
  outCome: boolean;
  pushScore?: string;
  whiteCircle?: boolean;
};

export type RippleBarProps = {
  direction: string;
  rippleStyle: object | undefined;
  status: boolean;
};
