import { useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function PopupConfirmation() {
  const userContext = useContext(CurrentUserContext);
  const { handleCardDelete, popupConfirmation } = userContext;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleCardDelete(popupConfirmation);
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="confirmation-form"
      className="popup__forms popup__forms-confirmation"
      noValidate
    >
      <button className="popup__button" type="submit">
        Sim
      </button>
    </form>
  );
}
