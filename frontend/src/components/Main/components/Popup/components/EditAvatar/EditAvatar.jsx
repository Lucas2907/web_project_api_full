import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { url: currentUser.avatar || "" },
  });

  useEffect(() => {
    reset({ url: currentUser.avatar || "" });
  }, [currentUser.avatar, reset]);

  function handleSubmitForm(data) {
    handleUpdateAvatar({ avatar: data.url });
  }

  return (
    <form
      id="imageProfile-form"
      className="popup__forms popup__forms-imageProfile"
      noValidate
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="popup__inputs-container">
        <input
          {...register("url", {
            required: "Digite uma URL",
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
              message: "Digite uma URL válida",
            },
            validate: (value) => value.trim().length > 0,
          })}
          className="popup__input popup__input-link"
          type="url"
          placeholder="Link da imagem"
        />
        {errors.url && (
          <span className="popup__input-error url-error">
            {errors.url.message}
          </span>
        )}
      </div>
      <button
        disabled={!isValid}
        className={
          "popup__button" + (!isValid ? " popup__button-inactive" : "")
        }
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
}
