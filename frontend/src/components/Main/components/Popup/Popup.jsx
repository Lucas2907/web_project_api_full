import closeButton from "../../../../assets/images/plussign.svg";

export default function Popup(props) {
  const { onClose, title, children } = props;

  function handleContentClick(e) {
    e.stopPropagation();
  }
  return (
    <div className="popup popup-confirmation" onClick={onClose}>
      <div className="popup__container" onClick={handleContentClick}>
        <img
          src={closeButton}
          alt="imagem de um icone de fechar"
          className="popup__close-button"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
