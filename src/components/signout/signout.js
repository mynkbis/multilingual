import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { Trans, useTranslation } from 'react-i18next';

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
        localStorage.clear();
        Navigate("../login")
    }
    return (
        <>
            <div>
                {!user ? true : <Button sx={{
                    backgroundColor: "#ff805d", '&:hover':
                        { backgroundColor: '#ffffff', boxShadow: 'none' }, width: "5rem", height: "1.9rem", ml: 15,
                }} onClick={logout}><Trans i18nKey="Logout.1">Logout</Trans></Button>}
            </div>
        </>
    )
}

export default SignoutButton