import React from 'react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth"
import { useTranslation, Trans } from 'react-i18next';

const ForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const { useState } = React;
  const [email, setEmail] = useState("");
     const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const sendPasswordReset = async (e) => {
     e.preventdefault()
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
      navigate("../login")
    } catch (err) {
      console.error(err);
      // alert("email id not matched with database");
    }
};
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="form">
            <div className="left-side">
              <img src="https://theedtalk.in/wp-content/uploads/2021/09/learning-foreign-languages.jpg" alt="loginjg" />
            </div>
            <div className="right-side">
              <div className="heading">
                <h3><Trans i18nKey="ForgetPass.1">Forget Password</Trans></h3>
                <p><Trans i18nKey="ForgetPass.2">Use Registered Email to receive the link!</Trans></p>
              </div>
              <form>
                <div className="input-text">
                  <input
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Registered email...."
                  />
                  <i className="fa fa-envelope"></i>
                </div>
                <div className="button">
                  <button type='submit' onClick={(e) => sendPasswordReset(e)}><Trans i18nKey="Post.2">Submit</Trans></button>
                </div>
              </form>
              <hr />
              <div className="or">
                <p><Trans i18nKey="SingUP.3">or</Trans></p>
              </div>
              <div className="register">
                <p style={{ fontSize: ".8rem" }}><Trans i18nKey="ForgetPass.3">For Login</Trans> <Link to="../login">
                  <strong> <Trans i18nKey="ForgetPass.4">Click Here!</Trans></strong></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword