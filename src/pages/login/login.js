import React from "react"
import "./login.css"
import { signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup } from "firebase/auth"
import { useDispatch } from "react-redux";
import { login} from '../../redux/userSlice'
import { Trans, useTranslation } from 'react-i18next';

const LogIn = () => {
    const { useState } = React;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [eye, seteye] = useState(true);
    const [inpass, setinpass] = useState("password");
    const [warning, setwarning] = useState(false);
    const [tick, settick] = useState(false);
    const [inputText, setInputText] = useState({
        email: "",
        password:""
    });
    
    const { t, i18n } = useTranslation();
    const [wemail, setwemail] = useState(false);
    const [wpassword, setwpassword] = useState(false);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const googleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                    // const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user.email;
                if (user) {
                    dispatch(
                        login({
                            user: result.user,                                 
                        })
                    )
                    navigate("../profile")
                }
                    // ...
            }).catch((error) => {
        // Handle Errors here.
                //  alert("Please try again)
            });
    }

    const Eye = () => {
        if (inpass == "password") {
            setinpass("text");
            seteye(false);
            setwarning(true);
        }
        else {
            setinpass("password");
            seteye(true);
            setwarning(false);
        }
    }

    const Tick = () => {
        if (tick) {
            settick(false);
        }
        else {
            settick(true);
        }
    }

    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputText((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        });
    } 
    
    const submitForm = async (e) => {
        e.preventDefault();
        const user = await signInWithEmailAndPassword(auth, inputText.email, inputText.password)
        console.log("user details", user)
        if (user) {            
            navigate('../profile')
        }       
        // using inbuit method of firebase fr signing in.
       
        setwemail(false);
        setwpassword(false);
        if (inputText.email == "") {
            setwemail(true);
        }
        else if (inputText.password == "")
            setwpassword(true);
        else {
            alert("form submitted");
        }
    }     

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
                                <h3><Trans i18nKey="Login.1">Log in to Multilingual.</Trans></h3>
                                <p><Trans i18nKey="Login.2">Welcome Back!</Trans></p>
                            </div>
                            <form onSubmit={submitForm}>
                                <div className="input-text">
                                    <input type="text" placeholder="Email" className={`${wemail ? "text-warning" : ""}`}
                                        value={inputText.email} onChange={inputEvent} name="email" />
                                    <i className="fa fa-envelope"></i>
                                </div>
                                <div className="input-text">
                                    <input type={inpass} placeholder="Password" className={` ${warning ? "warning" : ""}
                                                         ${wpassword ? "text-warning" : ""}`}
                                        value={inputText.password} onChange={inputEvent} name="password" />
                                    <i className="fa fa-lock"></i>
                                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </div>
                                <div className="rem_pass">
                                    <div className="remember">
                                        <span onClick={Tick} className={` ${tick ? "green" : ""}`}><i className="fa fa-check"></i></span>
                                        <p><Trans i18nKey="Login.3">Remember Me</Trans></p>
                                    </div>
                                    <Link to="../forgetpassword"><Trans i18nKey="ForgetPass.1">Forget Password ?</Trans></Link>
                                </div>
                                <div className="button">
                                    <button type="submit"><Trans i18nKey="description.part2">Login</Trans></button>
                                </div>
                            </form>
                            <hr />
                            <div className="or">
                                <p>or</p>
                            </div>
                            <div className="social">
                                <span onClick={() => { googleLogin() }}><i className="fa fa-google"></i><Trans i18nKey="Login.4">Login with Google</Trans></span>
                            </div>
                            <div className="register">
                                <span style={{ fontSize: ".8rem" }}><Trans i18nKey="Login.5">Don't have an account?</Trans>
                                    <Link to="../signup"><strong> <Trans i18nKey="Login.6">Register</Trans></strong></Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LogIn;