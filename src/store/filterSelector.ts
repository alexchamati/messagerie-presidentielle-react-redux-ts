import { RootState } from ".";
import Filter from "../lib/Filter";

export function filterSelector(state: RootState): Filter {
  return state.filters;
}
