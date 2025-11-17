import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { isValidEmail, isSafePassword } from "../../utils/utils";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(isSafePassword(password) && isValidEmail(email));
  }, [email, password]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    onLogin({ email, password });
  };

  return (
    <>
      <Header children={"Registrar-se"} path={"/signup"} />
      <div className="auth">
        <form className="auth__form" onSubmit={handleSubmit}>
          <h2 className="auth__title">Entrar</h2>
          <div className="auth__inputs">
            <input
              className="auth__input"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              required
            />
            <input
              className="auth__input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div className="auth__actions">
            <button
              className={
                "auth__submit " + (isValid ? "" : "auth__submit-disabled")
              }
              type="submit"
              disabled={!isValid}
            >
              Entrar
            </button>
          </div>
        </form>
        <p className="auth__text">
          <Link to="/signup" className="auth__link">
            Ainda não é membro? Inscreva-se aqui!
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
