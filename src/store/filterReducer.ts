import FilterReducerState, { PrivatizationType, SortType } from "../lib/Filter";

const initialState: FilterReducerState = {
  sortType: SortType.DEFAULT,
  privatizationType: PrivatizationType.ALL,
};

export const SET_SORT_TYPE_ACTION = "SET_SORT_TYPE_ACTION";
export const SET_PRIVATIZATION_TYPE_ACTION = "SET_PRIVATIZATION_TYPE_ACTION";

export default function filterReducer(
  state: FilterReducerState = initialState,
  action: any
): FilterReducerState {
  switch (action.type) {
    case SET_SORT_TYPE_ACTION:
      return { ...state, sortType: action.payload };
    case SET_PRIVATIZATION_TYPE_ACTION:
      return { ...state, privatizationType: action.payload };
    default:
      return state;
  }
}
