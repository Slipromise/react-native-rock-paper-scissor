export enum RootStackNames {
  PORTAL = 'PORTAL',
  GAME_LIST = 'GAME_LIST',
  GAME = 'GAME',
}

export type RootStackParamList = {
  [RootStackNames.PORTAL]: undefined;
  [RootStackNames.GAME_LIST]: undefined;
  [RootStackNames.GAME]: {id: string};
};
