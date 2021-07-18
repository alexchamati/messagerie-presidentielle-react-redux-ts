import Message from "../lib/Message";
import ChatMessage from "./ChatMessage";
import styles from "./ChatBox.module.css";
import { FunctionComponent } from "react";
import {
  messageFiltredSelector,
  messageStatusSelector,
} from "../store/messageSelectors";
import { filterSelector } from "../store/filterSelector";
import { useAppSelector } from "../hooks";

interface ChatBoxProps {
  depth?: number;
  messages?: Message[];
}

const ChatBox: FunctionComponent<ChatBoxProps> = ({ depth = 0, messages }) => {
  const rootMessages = useAppSelector(messageFiltredSelector);
  const filters = useAppSelector(filterSelector);
  const status = useAppSelector(messageStatusSelector);

  return (
    <div
      className={
        status === "loading" || status === "error" ? styles.chatBoxHidden : ""
      }
    >
      {Object.values(messages ? messages : rootMessages).map(
        (message: Message, index) => (
          <div key={index} className={styles.host}>
            <ChatMessage
              message={message}
              depth={depth}
              privatizationType={filters.privatizationType}
            />
            {message.replies.length > 0 && (
              <ChatBox messages={message.replies} depth={depth + 1} />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ChatBox;
