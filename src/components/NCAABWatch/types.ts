import { GameDataType } from '@Store/types';
export type Props = {
  data: GameDataType;
  saveSelection?: (value: number, gameSort: string) => void;
  selectionState?: boolean;
  lastGame: boolean;
};
