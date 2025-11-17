import plusSign from "../../../../../assets/images/plussign.svg";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import { useContext } from "react";
export default function ImagePopup(props) {
  const { name, link } = props.card;
  const { handleClosePopup } = useContext(CurrentUserContext);

  function handleContentClick(e) {
    e.stopPropagation();
  }
  return (
    <div className="popup-sobreposition" onClick={handleClosePopup}>
      <div className="popup-image" onClick={handleContentClick}>
        <img className="popup-image__image" src={link} alt={name} />
        <p className="popup-image__text">{name}</p>
        <img
          src={plusSign}
          alt="imagem de um icone de fechar"
          className="popup__close-button popup__close-button_image"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
