import { FunctionComponent, useState } from "react";
import Message from "../lib/Message";
import { PrivatizationType } from "../lib/Filter";
import ChatForm from "./ChatForm/ChatForm";
import styles from "./ChatMessage.module.css";
import { parseCustomElement } from "../lib/Markdown";
import { unified } from "unified";
import markdown from "remark-parse";
import html from "remark-html";

const processor = unified().use(markdown).use(html, { sanitize: true });

interface ChatMessageProps {
  message: Message;
  depth: number;
  privatizationType: PrivatizationType;
}

const ChatMessage: FunctionComponent<ChatMessageProps> = ({
  message,
  depth,
  privatizationType,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  function handleReply() {
    setShowReplyForm(true);
  }

  return (
    <div className={styles.host} style={{ marginLeft: depth * 50 + "px" }}>
      <div className={styles.containerMessage}>
        <div
          className={
            styles.subContainerMessage +
            " " +
            (privatizationType === PrivatizationType.PRIVATE &&
            message.private === false
              ? styles.opacityLight
              : "")
          }
        >
          <div className={styles.user}>
            <small>{message.user}</small>
          </div>
          <div
            className={
              styles.message +
              " " +
              (message.private ? styles.messagePrivate : styles.messagePublic)
            }
            dangerouslySetInnerHTML={{
              __html: parseCustomElement(
                processor.processSync(message.content).toString()
              ),
            }}
          />
        </div>
        {depth < 9 && (
          <div>
            <button
              type="button"
              className={"fr-link " + styles.replyButton}
              onClick={handleReply}
            >
              Répondre
            </button>
          </div>
        )}
      </div>
      {showReplyForm && (
        <ChatForm
          showReplyForm={showReplyForm}
          idMessage={message.id !== undefined ? message.id : 0}
          privateMessage={message.private}
          setShowReplyForm={setShowReplyForm}
        />
      )}
    </div>
  );
};

export default ChatMessage;
