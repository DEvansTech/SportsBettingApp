import { GameDataType } from '@Store/types';

export type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      gameData: GameDataType;
    };
  };
};

export type SpreadProps = {
  gameData: GameDataType;
  selectedTeam?: string;
  selectedAwayTeam: boolean;
  selectedHomeTeam: boolean;
};

export type WinProps = {
  gameData: GameDataType;
  selectedAwayTeam: boolean;
  selectedHomeTeam: boolean;
};

export type OUProps = {
  gameData: GameDataType;
};
