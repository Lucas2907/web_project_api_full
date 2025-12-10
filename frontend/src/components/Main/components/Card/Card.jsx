import trashIcon from "../../../../assets/images/Trash.svg";
import hearthIcon from "../../../../assets/images/hearth.svg";
import Union from "../../../../assets/images/Union.svg";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, likes } = props.card;
  const isLiked = likes.some((ownerId) => ownerId === currentUser._id);
  const showTrashButton = props.card.owner === currentUser._id;
  function handleLikeClick(card) {
    props.onCardLike(card);
  }

  function handleOpenPopupConfirmationClick(card) {
    props.onOpenPopupConfirmation(card);
  }

  return (
    <li className="photos__card">
      <img
        className="photos__card-image"
        src={link}
        alt={name}
        onClick={() => props.onCardClick(props.card)}
      />
      {showTrashButton && (
        <img
          onClick={() => handleOpenPopupConfirmationClick(props.card)}
          className="photos__delete-icon"
          src={trashIcon}
          alt="a trash  icon"
        />
      )}
      <div className="photos__elements">
        <h2 className="photos__elements-text">{name}</h2>
        <img
          onClick={() => handleLikeClick(props.card)}
          className="photos__like"
          src={isLiked ? Union : hearthIcon}
          alt=""
        />
      </div>
    </li>
  );
}
