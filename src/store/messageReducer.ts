import { MessageReducerState } from "../lib/Message";

const initialState: MessageReducerState = {
  status: "idle",
  values: [],
};

export const FETCH_MESSAGES_LOADING = "FETCH_MESSAGES_LOADING";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILED = "FETCH_MESSAGES_FAILED";

export default function messageReducer(
  state: MessageReducerState = initialState,
  action: any
): MessageReducerState {
  switch (action.type) {
    case FETCH_MESSAGES_LOADING:
      return { ...state, status: "loading" };
    case FETCH_MESSAGES_SUCCESS:
      return { ...initialState, status: "finished", values: action.payload };
    case FETCH_MESSAGES_FAILED:
      return { ...state, status: "error" };
    default:
      return state;
  }
}
