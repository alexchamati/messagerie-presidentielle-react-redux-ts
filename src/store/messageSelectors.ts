import Filter, { PrivatizationType, SortType } from "../lib/Filter";
import Message, {
  flattenTreeMessages,
  MessageReducerState,
  privateTreeBranchMessages,
  publicTreeBranchMessages,
  sortMessagesMoreRecent,
} from "../lib/Message";

export function messageSelector(state: {
  messages: MessageReducerState;
}): Message[] {
  return state.messages.values;
}

export function messageFiltredSelector(state: {
  messages: MessageReducerState;
  filters: Filter;
}) {
  let messagesTree = state.messages.values.slice();
  if (state.filters.sortType === SortType.DEFAULT) {
    if (state.filters.privatizationType === PrivatizationType.PRIVATE) {
      messagesTree = privateTreeBranchMessages(messagesTree);
    } else if (state.filters.privatizationType === PrivatizationType.PUBLIC) {
      messagesTree = publicTreeBranchMessages(messagesTree);
    }
  } else if (state.filters.sortType === SortType.CHRONOLOGICAL) {
    messagesTree = flattenTreeMessages(
      state.filters.privatizationType,
      messagesTree
    );
    messagesTree = sortMessagesMoreRecent(messagesTree);
  }
  return messagesTree;
}

export function messageStatusSelector(state: {
  messages: MessageReducerState;
  filters: Filter;
}) {
  return state.messages.status;
}
