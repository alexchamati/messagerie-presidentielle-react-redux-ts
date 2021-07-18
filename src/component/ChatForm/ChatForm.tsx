import { FormEvent, FunctionComponent, useEffect, useRef } from "react";
import Message from "../../lib/Message";
import ChatFormMarkDown from "./ChatFormMarkDown";
import styles from "./ChatForm.module.css";
import { getMessagesActionThunk } from "../../store/messageActions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { messageStatusSelector } from "../../store/messageSelectors";
import { addMessage } from "../../service/api";

interface ChatFormProps {
  showReplyForm?: boolean;
  idMessage?: number;
  privateMessage?: boolean;
  setShowReplyForm?: (showReplyForm: boolean) => void;
}

const ChatForm: FunctionComponent<ChatFormProps> = ({
  showReplyForm = undefined,
  idMessage = 0,
  privateMessage = false,
  setShowReplyForm = undefined,
}) => {
  const replyText = useRef<HTMLTextAreaElement>(null);
  const replyId = useRef<HTMLInputElement>(null);
  const replyUser = useRef<HTMLInputElement>(null);
  const replyPrivate = useRef<HTMLInputElement>(null);

  const status = useAppSelector(messageStatusSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showReplyForm === undefined || showReplyForm) {
      replyUser.current!.focus();
    }
  }, [showReplyForm]);

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();
    const newMessage: Message = {
      user: replyUser.current!.value,
      content: replyText.current!.value,
      private: replyPrivate.current!.checked,
      replies: [],
    };

    try {
      await addMessage(
        newMessage,
        replyId.current ? parseInt(replyId.current.value) : 0
      );
      dispatch(getMessagesActionThunk);
      replyText.current !== null && (replyText.current.value = "");
      replyUser.current !== null && (replyUser.current.value = "");
      replyPrivate.current !== null && (replyPrivate.current.value = "public");
      setShowReplyForm !== undefined && setShowReplyForm(false);
    } catch {
      alert("Erreur d'envoi, veuillez réessayer ultérieurement");
    }
  }

  return (
    <>
      <form className={styles.replyForm} onSubmit={handleOnSubmit}>
        <input ref={replyId} type="hidden" value={idMessage} />
        <div className={styles.textInputGroup}>
          <input
            ref={replyUser}
            type="text"
            placeholder="Votre nom"
            className="fr-input"
            required
          />
          <ChatFormMarkDown replyText={replyText} id={idMessage} />
        </div>
        <div className={styles.radioInput}>
          {!privateMessage && (
            <div>
              <input
                type="radio"
                id={"message-public-" + idMessage}
                name="privatization"
                value="public"
                ref={replyPrivate}
                defaultChecked
              />
              <label htmlFor={"message-public-" + idMessage}>Public</label>
            </div>
          )}
          <div>
            <input
              type="radio"
              id={"message-private-" + idMessage}
              name="privatization"
              value="private"
              ref={replyPrivate}
              defaultChecked={privateMessage}
            />
            <label htmlFor={"message-private-" + idMessage}>Private</label>
          </div>
        </div>
        <button
          disabled={status === "loading"}
          className={"fr-btn " + styles.submitButton}
          type="submit"
        >
          Répondre
        </button>
      </form>
    </>
  );
};

export default ChatForm;
