import { PrivatizationType, SortType } from "../lib/Filter";
import {
  SET_PRIVATIZATION_TYPE_ACTION,
  SET_SORT_TYPE_ACTION,
} from "./filterReducer";

export const setSortTypeAction = (sortType: SortType) => ({
  type: SET_SORT_TYPE_ACTION,
  payload: sortType,
});

export const setPrivatizationTypeAction = (
  privatizationType: PrivatizationType
) => ({
  type: SET_PRIVATIZATION_TYPE_ACTION,
  payload: privatizationType,
});
