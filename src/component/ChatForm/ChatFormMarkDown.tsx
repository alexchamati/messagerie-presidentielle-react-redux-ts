import { FunctionComponent } from "react";
import { addGift, addHighlight, addVideo } from "../../lib/Markdown";
import styles from "./ChatFormMarkDown.module.css";

interface ChatFormMarkDownProps {
  replyText: React.RefObject<HTMLTextAreaElement>;
  id: number;
}

const ChatFormMarkDown: FunctionComponent<ChatFormMarkDownProps> = ({
  replyText,
  id = 0,
}) => {
  return (
    <div className={styles.host}>
      <markdown-toolbar class={styles.markdown} for={"md-textaera-" + id}>
        <md-bold>
          <i className="ri-bold"></i>
        </md-bold>
        <md-header>
          <i className="ri-heading"></i>
        </md-header>
        <md-italic>
          <i className="ri-italic"></i>
        </md-italic>
        <md-link>
          <i className="ri-link"></i>
        </md-link>
        <md-image>
          <i className="ri-image-add-line"></i>
        </md-image>
        <div className={styles.hrCutomRules}></div>
        <button type="button" data-md-button onClick={() => addGift(replyText)}>
          <i className="ri-gift-line"></i>
        </button>
        <button
          type="button"
          data-md-button
          onClick={() => addHighlight(replyText)}
        >
          <i className="ri-error-warning-line"></i>
        </button>
        <button
          type="button"
          data-md-button
          onClick={() => addVideo(replyText)}
        >
          <i className="ri-video-add-line"></i>
        </button>
      </markdown-toolbar>
      <textarea
        id={"md-textaera-" + id}
        ref={replyText}
        placeholder="Votre message"
        className="fr-input"
        required
      ></textarea>
    </div>
  );
};

export default ChatFormMarkDown;
