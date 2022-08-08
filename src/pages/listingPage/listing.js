import React, { useState } from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc,where, addDoc, orderBy} from 'firebase/firestore'
 import { auth, db } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './listing.css'
import {  BsTrash} from 'react-icons/bs'
import { useTranslation, Trans } from 'react-i18next';
const Listing = () => {
  const [user, setUser] = useState({})
  const [userData, setUserData] = useState([])
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) =>
  {
      setUser(currentUser)
      localStorage.setItem("User1", user.email)
    })
    const user1 = localStorage.getItem("User1")
   
     const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
               const unsub = onSnapshot(q, (QuerySnapshot) => {    
            let todoArray = [];
            QuerySnapshot.forEach((doc) => {
              todoArray.push({...doc.data(), id:doc.id})
            }); 
                 setUserData(todoArray)
                 navigate("../home")               
            })
    // eslint-disable-next-line no-sequences
    return () => unsub, unsubscribe()        
 }, [])
         
   const handleDelete = async (id) => {
        await deleteDoc(doc(db, "users", id));
   }
  // console.log("from server", userData)
  
//   const unixTimestamp = userData[0].createdAt;
// const date = new Date(unixTimestamp*1000);
// console.log("Unix Timestamp:",unixTimestamp)

//   console.log("Date Timestamp:", date.getTime())
//   console.log("Date: "+date.getDate()+
//           "/"+(date.getMonth()+1)+
//           "/"+date.getFullYear()+
//           " "+date.getHours()+
//           ":"+date.getMinutes()+
//           ":"+date.getSeconds());

  const getTimeStamp = () => {
    const unixTimestamp = userData[0].createdAt;
    const date = new Date(unixTimestamp * 1000);
}
  
  return ( 
    <div style={{ "backgroundColor": "#eee",   }}> <h3 style={{ paddingTop: "1rem", textAlign:"center", color:"#ff805d" }}><Trans i18nKey="List.3">All Posts</Trans></h3>
    <div style={{textAlign:"center" }}>
      <input style={{width:"20rem", height:"2rem",border:"none", margin:"1rem"}} type="search" value={search} placeholder=" Search" onChange={(e) => {setSearch(e.target.value) }} />  </div>
     <div className='container1'>
      {!userData? <div> Loading...</div> : userData.filter((data) => {
        if (search === "") {
          return data
        } else if (data.UserName.toLowerCase().includes(search.toLowerCase())) {
          return data
       }
      }).map((data) => {    
        return (        
          <div  key={data.id}>
        <div className='containerBox1'>
          <div className='card'><strong><Trans i18nKey="List.2">Title</Trans></strong> : {data.Description? data.Description: "----NA-----"}
          <hr/>  <hr/>
            <div><strong><Trans i18nKey="Profile.2">Name</Trans>: </strong>{data.UserName && data.UserName? data.UserName: "---NA---" }</div>
              <div><strong><Trans i18nKey="Profile.3">Email</Trans>: </strong> {data.email}</div>
              <span><strong><Trans i18nKey="List.1"> User's Co-ordinates:</Trans></strong></span>
            <div><strong><Trans i18nKey="Profile.4">Latitude</Trans>:</strong> {data.userLocation[0].lati}</div>
              <div><strong><Trans i18nKey="Profile.5">Longitude</Trans>: </strong>{data.userLocation[0].longi}</div>
               {/* <div><strong>Posted on: </strong>{getTimeStamp(data.createdAt.nanoseconds)}</div> */}
            {/* { currentUser=== data.email && user?  <button onClick={() => {
            handleDelete(data.id)
              }} >Del</button>: ""}   */}
                {user ? <button className='buttonPosition' onClick={() => {
                  handleDelete(data.id)
                }}><BsTrash size="1rem" border="none" color='#ff805d' />  </button> : <em>Please Login to do Modification!</em>}  
          </div>
        </div>
        </div>      
        )
      })}
      </div>
  
      </div>
   
  )
}

export default Listing;