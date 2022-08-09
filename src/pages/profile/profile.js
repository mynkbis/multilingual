import React, { useState } from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc,where, addDoc, serverTimestamp, orderBy } from 'firebase/firestore'
 import { auth, db } from '../../firebase'
import {  } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import './profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
const Profile = () => {
  const [name, setname] = useState();
  const[userData, setUserData]=useState()
  
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  
  const [user, setUser] = useState({})
  React.useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) =>
    {
      setUser(currentUser)
      localStorage.setItem("User1", user.email)
    })
    const user1 = localStorage.getItem("User1")
    const q = query(collection(db, "users"), where('email', "==", user1));
    const unsub = onSnapshot(q, (QuerySnapshot) => {    
      let todoArray = [];
      QuerySnapshot.forEach((doc) => {
        todoArray.push({ ...doc.data(), id: doc.id })
      });
      setUserData(todoArray)
    })
        // eslint-disable-next-line no-sequences
    return () => unsub, unsubscribe()        
  })
  
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
  }
  return (
    <>
      {!user && !user ? navigate("../home") :
        <div>
          <div>
            <button className='btn'><Link to='../profile/post' style={{ color: '#FFF', textDecoration: "none" }} >
              <Trans i18nKey="Profile.1">Add Post</Trans></Link></button>
          </div>
          <div className="postBox" >{userData && userData.map((data) => {
            return (
              <div className="post" key={data.id}>{data.Description && data.Description ? <h3>{data.Description}</h3> : <h3>----NA----</h3>}
                <div>
                  <hr /> <hr />
                  <div>
                    <strong><Trans i18nKey="Profile.2">Name</Trans></strong>: {data.UserName && data.UserName ? data.UserName : "---NA---"}
                  </div>
                  <div><strong><Trans i18nKey="Profile.2">Email</Trans></strong>: {data.email}</div>
                  <div><strong><Trans i18nKey="Profile.3">Latitude</Trans></strong>: {data.userLocation[0].lati}</div>
                  <div><strong><Trans i18nKey="Profile.4">Longitude</Trans></strong>: {data.userLocation[0].longi}</div>
                  {/* <div>Posted: {data.createdAt}</div> */}
                  <button id='btn' onClick={() => {
                    handleDelete(data.id)
                  }} ><Trans i18nKey="Profile.6"><strong></strong>Del</Trans>
                  </button>
                </div>
              </div>
            )
          })}
          </div>
        </div>}
    </>
  )
}

export default Profile;