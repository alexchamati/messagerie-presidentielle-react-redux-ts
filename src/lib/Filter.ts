export default interface FilterReducerState {
  sortType: SortType;
  privatizationType: PrivatizationType;
}

export enum SortType {
  DEFAULT = "DEFAULT",
  CHRONOLOGICAL = "CHRONOLOGICAL",
}

export enum PrivatizationType {
  ALL = "ALL",
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}
