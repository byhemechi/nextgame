export type QueryParameter = string | string[];

export interface QueryParameters {
  ClubCode?: QueryParameter;
  CompCode?: QueryParameter;
  AgeGrp?: QueryParameter;
  Division?: QueryParameter;
  Team?: QueryParameter;
  GameDate?: QueryParameter;
  RoundNo?: QueryParameter;
  GroundCode?: QueryParameter;
  showLiveResults?: QueryParameter;
  [key: string]: QueryParameter;
};