import React from "react"
import "./signup.css"
import { auth, db, } from "../../firebase"
import { createUserWithEmailAndPassword} from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup } from "firebase/auth"
import { onAuthStateChanged } from 'firebase/auth'
import { useTranslation, Trans } from 'react-i18next';

const SignUp = () => {

    const { t, i18n } = useTranslation();
    const { useState } = React;    
    const[eye,seteye]=useState(true);
    const[inpass,setinpass]=useState("password");
     const[warning,setwarning]=useState(false);
    const[tick,settick]=useState(false);
    
    const [inputText, setInputText] = useState({
        email: "",
        password: ""
    });
    
    const [wemail, setwemail] = useState(false);
    const [wpassword, setwpassword] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    
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
        try {
            const user = await createUserWithEmailAndPassword(auth, inputText.email, inputText.password)
                .then(cred => {
                    console.log("new value", cred)
                    // return db.collection('user').doc(cred.user.uid)
                })
            console.log(user)
            // in built method for registering or signup
            navigate('../home')   
        }
        catch (error) {
            console.log(error.message)
        } setInputText({
            email: "",
            password: ""
        })
        
        setwemail(false);
        setwpassword(false);
        if (inputText.email == "") {
            setwemail(true);
        }
        else if (inputText.password == "")
            setwpassword(true);
        else {
                    //   alert("form submitted");
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
                                <h3><Trans i18nKey="SignUP.1">Register with Multilingual</Trans>.</h3>
                                <p><Trans i18nKey="SignUP.2">Welcome</Trans> </p>
                            </div>
                            <form onSubmit={submitForm}>
                                <div className="input-text">
                                    <input type="text" placeholder="Email" className={`${wemail ? "text-warning" : ""}`}
                                        value={inputText.email} onChange={inputEvent} name="email" />
                                    <i className="fa fa-envelope"></i>
                                </div>
                                <div className="input-text">
                                    <input type={inpass} placeholder="Password" className={` ${warning ? "warning" : ""} 
                                    ${wpassword ? "text-warning" : ""}`} value={inputText.password} onChange={inputEvent} name="password" />
                                    <i className="fa fa-lock"></i>
                                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </div>
                                <div className="button">
                                    <button type="submit"> <Trans i18nKey="Login.6">Register</Trans> </button>
                                </div>
                            </form>
                            <hr />
                            <div className="or">
                                <p> <Trans i18nKey="SignUP.3">or</Trans></p>
                            </div>
                            <div className="register">
                                <p style={{ fontSize: ".8rem" }}>
                                    <Trans i18nKey="SignUP.4">Already Have An Account?</Trans>
                                    <Link to="../login"> <strong><Trans i18nKey="ForgetPass.4">
                                        Click Here!</Trans></strong></Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;