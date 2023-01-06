export const getTeamLogo =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key];

export type TeamType = {
  teamID: number;
  team_uuid: string;
  team_name: string;
  team_market: string;
  team_abbr: string;
  teamIcon: string;
  team_sort: string;
};

export type FavortriteType = {
  teamID: number;
  teamSort: string;
};
