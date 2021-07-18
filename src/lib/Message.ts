import { PrivatizationType } from "./Filter";

export default interface Message {
  id?: number;
  user: string;
  content: string;
  private: boolean;
  replies: Message[];
}

export interface MessageReducerState {
  status: "idle" | "finished" | "loading" | "error";
  values: Message[];
}

export function flattenTreeMessages(
  privatizationType: PrivatizationType,
  messages: Message[] = [],
  messagesSorted: Message[] = []
) {
  for (let message of messages) {
    if (
      privatizationType === PrivatizationType.ALL ||
      (privatizationType === PrivatizationType.PUBLIC &&
        message.private === false) ||
      (privatizationType === PrivatizationType.PRIVATE &&
        message.private === true)
    ) {
      let messageTmp: Message = {
        id: message.id,
        user: message.user,
        content: message.content,
        private: message.private,
        replies: [],
      };
      messagesSorted.push(messageTmp);
    }
    if (message.replies.length > 0) {
      flattenTreeMessages(privatizationType, message.replies, messagesSorted);
    }
  }
  return messagesSorted;
}

export function sortMessagesMoreRecent(messages: Message[]) {
  let messagesTmp = messages.slice();
  return messagesTmp.sort((message, messageBis) =>
    message.id! < messageBis.id! ? 1 : messageBis.id! < message.id! ? -1 : 0
  );
}

function isPrivateReplyInBranch(messages: Message[]): boolean {
  for (let message of messages) {
    if (message.private === true) {
      return true;
    }
    if (message.replies.length > 0) {
      return isPrivateReplyInBranch(message.replies);
    }
  }
  return false;
}

export function privateTreeBranchMessages(
  messages: Message[],
  messagesSorted: Message[] = []
) {
  for (let message of messages) {
    if (message.private === true || isPrivateReplyInBranch(message.replies)) {
      let messageTmp: Message = {
        id: message.id,
        user: message.user,
        content: message.content,
        private: message.private,
        replies: [],
      };
      messagesSorted.push(messageTmp);
      if (message.replies.length > 0) {
        privateTreeBranchMessages(
          message.replies,
          messagesSorted[messagesSorted.length - 1].replies
        );
      }
    }
  }
  return messagesSorted;
}

export function publicTreeBranchMessages(
  messages: Message[],
  messagesSorted: Message[] = []
) {
  for (let message of messages) {
    if (message.private === false) {
      let messageTmp: Message = {
        id: message.id,
        user: message.user,
        content: message.content,
        private: message.private,
        replies: [],
      };
      messagesSorted.push(messageTmp);
      if (message.replies.length > 0) {
        publicTreeBranchMessages(
          message.replies,
          messagesSorted[messagesSorted.length - 1].replies
        );
      }
    }
  }
  return messagesSorted;
}
