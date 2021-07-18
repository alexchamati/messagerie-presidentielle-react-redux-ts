import { ChangeEvent, FunctionComponent } from "react";
import { useAppDispatch } from "../hooks";
import { PrivatizationType, SortType } from "../lib/Filter";
import {
  setPrivatizationTypeAction,
  setSortTypeAction,
} from "../store/filterActions";
import styles from "./ChatFilter.module.css";

const ChatFilter: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const setSortType = (sortType: SortType) =>
    dispatch(setSortTypeAction(sortType));
  const setPrivatizationType = (privatizationType: PrivatizationType) =>
    dispatch(setPrivatizationTypeAction(privatizationType));

  function handleSelectSortType(event: ChangeEvent<HTMLSelectElement>) {
    setSortType(
      SortType.DEFAULT === event.target.value
        ? SortType.DEFAULT
        : SortType.CHRONOLOGICAL
    );
  }

  function handleSelectPrivatizationType(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    if (event.target.value === PrivatizationType.ALL) {
      setPrivatizationType(PrivatizationType.ALL);
    } else if (event.target.value === PrivatizationType.PRIVATE) {
      setPrivatizationType(PrivatizationType.PRIVATE);
    } else if (event.target.value === PrivatizationType.PUBLIC) {
      setPrivatizationType(PrivatizationType.PUBLIC);
    }
  }

  return (
    <div className={styles.host}>
      <div className="fr-select-group">
        <label className="fr-label">
          <span className="fr-hint-text">Tri :</span>
        </label>
        <select
          className="fr-select"
          defaultValue={SortType.DEFAULT}
          onChange={handleSelectSortType}
        >
          <option value={SortType.DEFAULT}>Par défaut</option>
          <option value={SortType.CHRONOLOGICAL}>Plus récent</option>
        </select>
      </div>
      <div className="fr-select-group">
        <label className="fr-label">
          <span className="fr-hint-text">Type :</span>
        </label>
        <select
          className="fr-select"
          defaultValue={PrivatizationType.ALL}
          onChange={handleSelectPrivatizationType}
        >
          <option value={PrivatizationType.ALL}>Public {"&"} Privé</option>
          <option value={PrivatizationType.PRIVATE}>Privé</option>
          <option value={PrivatizationType.PUBLIC}>Public</option>
        </select>
      </div>
    </div>
  );
};

export default ChatFilter;
