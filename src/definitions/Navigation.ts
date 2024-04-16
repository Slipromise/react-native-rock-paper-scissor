export enum RootStackNames {
  PORTAL = 'PORTAL',
  GAME_LISTS = 'GAME_LISTS',
  GAME = 'GAME',
}

export type RootStackParamList = {
  [RootStackNames.PORTAL]: undefined;
  [RootStackNames.GAME_LISTS]: undefined;
  [RootStackNames.GAME]: {id: string};
};
