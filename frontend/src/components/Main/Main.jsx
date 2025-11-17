import pencil from "../../assets/images/pencil.svg";
import plusSign from "../../assets/images/plussign.svg";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Card/ImagePopup/ImagePopup";
import PopupConfirmation from "./components/Popup/components/popupConfirmation/PopupConfirmation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

export default function Main({
  onOpenPopupConfirmation,
  onOpenPopupImage,
  onOpenPopup,
  onClosePopup,
  popup,
  popupImage,
  popupConfirmation,
  cards,
  onCardDelete,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [pencilState, setPencilState] = useState(false);

  const newCardPopup = { title: "New card", children: <NewCard /> };
  const editProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Change Image", children: <EditAvatar /> };
  const editPopupConfirmation = {
    title: "Confirmar?",
    children: <PopupConfirmation />,
  };

  function handleCardClick(card) {
    const imagePopup = {
      children: <ImagePopup card={card} onClose={onClosePopup} />,
    };
    onOpenPopupImage(imagePopup);
  }

  function handlePencilState(value) {
    setPencilState(value);
  }

  useEffect(() => {
    function handleEscKey(event) {
      if (popup || popupImage || popupConfirmation) {
        if (event.key === "Escape") {
          onClosePopup();
        }
      }
    }

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [popup, popupImage, popupConfirmation, onClosePopup]);

  return (
    <main className="main">
      <section className="profile">
        <div
          onClick={() => {
            onOpenPopup(editAvatarPopup);
          }}
          className="profile-container"
          onMouseEnter={() => handlePencilState(true)}
          onMouseLeave={() => handlePencilState(false)}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className={
              "profile__image" + (pencilState ? " profile__image-opacity" : "")
            }
          />
          <img
            src={pencil}
            alt="icone de edição"
            className={
              pencilState
                ? "image-profile-pincel-active"
                : "image-profile-pincel"
            }
          />
        </div>
        <div className="profile__feat">
          <h1 className="profile__title">{currentUser.name}</h1>
          <div
            className="profile__border-pincel"
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <img
              src={pencil}
              alt="icone de um pincel"
              className="profile__pincel"
            />
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <div
          className="profile__border-plus"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img src={plusSign} alt="icone de adição" className="profile__plus" />
        </div>
      </section>
      <ul className="photos">
        {cards &&
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onOpenPopupConfirmation={onOpenPopupConfirmation}
              onCardDelete={onCardDelete}
            />
          ))}
      </ul>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      {popupImage && <div>{popupImage.children}</div>}
      {popupConfirmation && (
        <Popup onClose={onClosePopup} title={editPopupConfirmation.title}>
          {editPopupConfirmation.children}
        </Popup>
      )}
    </main>
  );
}

Main;

// solved
// * Adicionar validação de formulário
// * Adicionar feat closepopup quando clicado "ESC" e fora do popup
// * Adicionar popup de confirmação ao excluir cartão
// * As fontes não estao sendo carregadas
// * mostrar icone do lápis quando mouse em cima da foto de perfil
