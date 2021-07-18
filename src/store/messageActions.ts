import { AppDispatch } from ".";
import { getMessages } from "../service/api";
import {
  FETCH_MESSAGES_FAILED,
  FETCH_MESSAGES_LOADING,
  FETCH_MESSAGES_SUCCESS,
} from "./messageReducer";

export async function getMessagesActionThunk(dispatch: AppDispatch) {
  dispatch({
    type: FETCH_MESSAGES_LOADING,
  });
  try {
    const messages = await getMessages();
    dispatch({
      type: FETCH_MESSAGES_SUCCESS,
      payload: messages,
    });
  } catch {
    dispatch({
      type: FETCH_MESSAGES_FAILED,
    });
  }
}
