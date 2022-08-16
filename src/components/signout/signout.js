import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { Trans, useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const SignoutButton = () => {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState({})
    const Navigate = useNavigate();
    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            //  {sessionStorage.setItem("User", JSON.stringify(currentUser.email))}
        })
        return () => unsubscribe();
    }, [])

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem("User1");
        Navigate("../login")
    }
    return (
        <>
            <div>
                {!user ? true :<div><Typography variant="div" sx={{
                    backgroundColor: "#ff805d", '&:hover':
                        { color: "black" }, ml:5,
                }} >{user.email}</Typography> <Button sx={{
                    backgroundColor: "#ffffff", '&:hover':
                        { backgroundColor: 'red', boxShadow: 'none', color: 'white', fontWeight: 800 }, width: "5rem", height: "1.9rem", ml: 1,
                }} onClick={logout}><Trans i18nKey="Logout.1">Logout</Trans></Button> </div>}
            </div>
        </>
    )
}

export default SignoutButton