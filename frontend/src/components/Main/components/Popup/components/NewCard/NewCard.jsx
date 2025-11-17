import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      url: "",
    },
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = (data) => {
    handleAddPlaceSubmit({ name: data.title, link: data.url });
  };

  return (
    <form
      id="creation-form"
      className="popup__forms popup__forms-creation"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="popup__inputs">
        <div className="popup__inputs-container">
          <input
            className="popup__input"
            type="text"
            id="title"
            placeholder="Título"
            {...register("title", {
              required: "O título é obrigatório",
              minLength: {
                value: 2,
                message: "O título deve ter pelo menos 2 caracteres",
              },
              maxLength: {
                value: 25,
                message: "O título deve ter no máximo 25 caracteres",
              },
            })}
            maxLength={26}
          />
          {errors.title && (
            <span className="popup__input-error title-error">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="popup__inputs-container">
          <input
            className="popup__input"
            type="url"
            id="url"
            placeholder="Link da imagem"
            {...register("url", {
              required: "O link da imagem é obrigatório",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: "Digite um link de imagem válido",
              },
            })}
          />
          {errors.url && (
            <span className="popup__input-error url-error">
              {errors.url.message}
            </span>
          )}
        </div>
      </div>

      <button
        className={
          "popup__button" + (!isValid ? " popup__button-inactive" : "")
        }
        type="submit"
        disabled={!isValid}
      >
        Salvar
      </button>
    </form>
  );
}
