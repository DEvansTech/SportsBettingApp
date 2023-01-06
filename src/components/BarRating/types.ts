export type Props = {
  value: number | undefined;
  status: string | undefined;
  outCome: boolean;
  pushScore?: string;
  points?: string | undefined;
  team: string;
};

export type RippleBarProps = {
  direction: string;
  rippleStyle: object | undefined;
  status: boolean;
};
