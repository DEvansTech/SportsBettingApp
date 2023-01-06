export type Props = {
  rangeValue: number;
  setRangeValue: (value: number) => void;
  disabled: boolean;
  maximumValue?: number;
  minimumValue?: number;
};
