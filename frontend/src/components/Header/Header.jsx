import logo from "../../assets/images/header.svg";
import { Link } from "react-router-dom";
export default function Header({ children, path, userEmail, onSignout }) {
  return (
    <header className="header">
      <div className="header__elements">
        <img src={logo} alt="imagem da logo" className="header__logo" />
        <div className="header__info">
          {userEmail}
          {path === "/signin" || path === "/signup" ? (
            <Link to={path} className="auth__link">
              {children}
            </Link>
          ) : (
            <p className="auth__link" onClick={onSignout}>
              {children}
            </p>
          )}
        </div>
      </div>
      <hr className="header__line" />
    </header>
  );
}
