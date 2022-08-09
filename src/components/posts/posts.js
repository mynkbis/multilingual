import React, { useState } from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc,where, addDoc, serverTimestamp, orderBy } from 'firebase/firestore'
 import { auth, db } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
import './post.css'

const Post = () => {
  const [name, setname] = useState();
  const [desc, setDesc]=useState()
  const navigate = useNavigate();
  const {i18n } = useTranslation();
  
  const [user, setUser] = useState({})
  React.useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth,
      (currentUser) => {
        setUser(currentUser)
        localStorage.setItem("User1", user.email)
      })
    const user1 = localStorage.getItem("User1")
    return () => unsubscribe()        
 },[])
  
  
  const getlocation = (e) => {
        e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (getCurrentPosition) {
        const coords = [{
          "lati": getCurrentPosition.coords.latitude,
          "longi": getCurrentPosition.coords.longitude
        }]
        localStorage.setItem("Cords", JSON.stringify(coords))
        navigate("../profile/post")
      });
    } else {
      alert("error occured while fetching your location")
    }
  }
  
  const handlechange = (e) => {
    setname(e.target.value)
    console.log(name)
  }
  const location = JSON.parse(localStorage.getItem("Cords"))
  // console.log("prodcut",userData) 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "users"), {
      userLocation: location.map((loc) => loc),
      UserName: name,
      Description: desc,
      createdAt: serverTimestamp(),
      email: `${user.email}`,
      Uid: `${user.uid}`,                
    })
    navigate("../home")
  }
    
  return (
    <div className="container">
      <div>
        <h1> <Trans i18nKey="Post.1">Hello</Trans> {user.displayName ? user.displayName : 'User'}</h1>
        <div className="card">
          <form >
            <div className="inputValues">
              <div className="input-text">
                <span><strong><Trans i18nKey="Profile.2">Name: </Trans> </strong></span>
                <input placeholder='Name' defaultValue={name} onChange={(e) => { handlechange(e) }} />
              </div>
              <div className="input-text">
                <span><strong><Trans i18nKey="Post.4">Description </Trans>: </strong></span>
                <input placeholder="Description" defaultValue={desc} onChange={(e) => { setDesc(e.target.value) }} />
              </div>
            </div>
            <div className="form">              
              {location && location.map((loc) => {
                return (<div key={loc.name} className="card1" style={{ display: "block", textAlign: "center", height: "12rem", }}>
                  <span><strong>{user.displayName ? user.displayName : <Trans i18nKey="Post.5">User</Trans>}
                    <Trans i18nKey="Post.6"> your co-ordinates are:</Trans></strong> </span>
                  <hr style={{ margin: ".5rem", }} />
                  <div ><strong><Trans i18nKey="Profile.4">Latitude </Trans>: </strong>{loc.lati}</div>
                  <div><strong><Trans i18nKey="Profile.5">Longitude </Trans>: </strong>{loc.longi}</div>
                </div>)
              })}
            </div>
            <div className="button">
              {!location ?
                <button onClick={(e) => getlocation(e)} > <Trans i18nKey="Post.3">Latitude:To Know Your Location</Trans></button> : ""}
            </div>
            <div className="button">
              <button onClick={(e) => { handleSubmit(e) }}><Trans i18nKey="Post.2">Submit </Trans></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Post;