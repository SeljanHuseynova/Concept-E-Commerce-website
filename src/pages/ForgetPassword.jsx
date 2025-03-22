import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "../context/LanguageProvider";
import { forgetPassword } from "../redux/accountSlice";
import BreamCrumb from "../components/Global/breadcrumb/BreamCrumb";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const ForgetPassword = () => {
  const { t } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-in-out", once: false });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      setErrorMsg("Please fill all fields");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Invalid email format");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters long");
      return;
    }
    setErrorMsg("");
    dispatch(forgetPassword({ email, newPassword }));
  };

  return (
    <div className="account-form" data-aos="fade-down">
      <BreamCrumb />
      <div className="recover" data-aos="flip-left">
        <form onSubmit={handleSubmit}>
          <div className="part">
            <label data-aos="fade-up">{t("account.email")}</label>
            <input
              type="email"
              placeholder={t("account.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-aos="zoom-in"
            />
          </div>
          <div className="part">
            <label data-aos="fade-up">{t("account.new-password")}</label>
            <input
              type="password"
              placeholder={t("account.password")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              data-aos="zoom-in"
            />
          </div>

          {errorMsg && (
            <span className="error error-animate" data-aos="shake">
              {errorMsg}
            </span>
          )}
          {error && (
            <span className="error error-animate" data-aos="shake">
              {error}
            </span>
          )}
          <div className="bottom">
            <button type="submit" disabled={loading} data-aos="fade-up">
              {loading ? "Loading..." : t("products.reset")}
            </button>
            <Link to="/login" className="link" data-aos="fade-up">
              {t("account.cancel")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
