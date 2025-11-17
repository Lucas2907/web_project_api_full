import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: currentUser.name || "",
      about: currentUser.about || "",
    },
  });

  useEffect(() => {
    reset({
      name: currentUser.name || "",
      about: currentUser.about || "",
    });
  }, [currentUser, reset]);

  function onSubmit(data) {
    handleUpdateUser({ name: data.name, about: data.about });
  }

  return (
    <form
      id="profile-form"
      className="popup__forms popup__forms-profile"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="popup__inputs">
        <div className="popup__inputs-container">
          <input
            maxLength={26}
            {...register("name", {
              required: "O campo 'Nome' é obrigatório",
              minLength: {
                value: 2,
                message: "O nome deve ter pelo menos 2 caracteres",
              },
              maxLength: {
                value: 25,
                message: "O nome deve ter no máximo 25 caracteres",
              },
            })}
            className="popup__input popup__input-name"
            type="text"
            id="name"
            name="name"
            placeholder="Nome"
          />
          {errors.name && (
            <span className="popup__input-error name-error">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="popup__inputs-container">
          <input
            {...register("about", {
              required: "O campo 'Sobre mim' é obrigatório",
              minLength: {
                value: 2,
                message: "Deve ter pelo menos 2 caracteres",
              },
              maxLength: {
                value: 25,
                message: "Deve ter no máximo 25 caracteres",
              },
            })}
            maxLength={26}
            className="popup__input popup__input-about-me"
            type="text"
            id="aboutme"
            name="about"
            placeholder="Sobre mim"
          />
          {errors.about && (
            <span className="popup__input-error aboutme-error">
              {errors.about.message}
            </span>
          )}
        </div>
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
