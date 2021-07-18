import ChatBox from "./component/ChatBox";
import ChatForm from "./component/ChatForm/ChatForm";
import ChatFilter from "./component/ChatFilter";
import styles from "./App.module.css";
import { useAppSelector } from "./hooks";
import { messageStatusSelector } from "./store/messageSelectors";
import { getMessagesActionThunk } from "./store/messageActions";
import store from "./store";

function App() {
  const status = useAppSelector(messageStatusSelector);

  const refresh = () => store.dispatch(getMessagesActionThunk);

  return (
    <div className={styles.host}>
      <ChatForm />
      <ChatFilter />
      {status === "loading" && "Chargement..."}
      {status === "error" && (
        <div className="fr-callout fr-fi-information-line">
          <h4 className="fr-callout__title">Oups !</h4>
          <p className="fr-callout__text">
            Une erreur s'est produite, merci de réessayer ultérieurement
          </p>
          <button className="fr-btn" onClick={refresh}>
            Réessayer
          </button>
        </div>
      )}
      <ChatBox />
    </div>
  );
}

export default App;
