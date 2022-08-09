import React, { useState } from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc,where, addDoc, orderBy} from 'firebase/firestore'
 import { auth, db } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './listing.css'
import geohash from "ngeohash";
import {  BsTrash} from 'react-icons/bs'
import { Trans, useTranslation } from 'react-i18next';


const Listing = () => {
  const [user, setUser] = useState({})
  const [userData, setUserData] = useState([])
  const [search, setSearch] = useState("");
  const [loci, setLoci] = useState({});
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  
  React.useEffect(() => {
    window.onload = function (e) {
      getlocation(e);
    };

    let unsubscribe = onAuthStateChanged(auth, (currentUser) =>
    {
      setUser(currentUser)
      localStorage.setItem("User1", user.email)
    })
    // const LocalUser = localStorage.getItem("User1")
   
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (QuerySnapshot) => {    
      let todoArray = [];
      QuerySnapshot.forEach((doc) => {
        todoArray.push({ ...doc.data(), id: doc.id })
      });
      setUserData(todoArray)
     
      navigate("../home")
     })       
    // eslint-disable-next-line no-sequences
    return () => unsub, unsubscribe()

  }, [])
         
  const getlocation = async (e) => {
        e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (getCurrentPosition) {
        const coords = [{
          "lati": getCurrentPosition.coords.latitude,
          "longi": getCurrentPosition.coords.longitude
        }]
        localStorage.setItem("Cords", JSON.stringify(coords))
          });
    } else {
      alert("error occured while fetching your location")
    }
  }

  
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
  }
  
  // const getTimeStamp = (data1) => {
  //   const unixTimestamp = {data1}
  //   // console.log(data1)
  //   const date = new Date(data1 * 1000)
  //   // console.log(date)
  //   return (
  // ""
  //   )
  // }

  // const place = JSON.parse(localStorage.getItem('Cords'));
  // const lng = loci[0].longi;
  // const lat = loci[0].lati
  
  
const getGeohashRange = function (latitude, longitude, distance) {
    var lat = 0.0144927536231884; // degrees latitude per mile
    var lon = 0.0181818181818182; // degrees longitude per mile
    var lowerLat = latitude - lat * distance;
    var lowerLon = longitude - lon * distance;
    var upperLat = latitude + lat * distance;
    var upperLon = longitude + lon * distance;
    var lower = geohash.encode(lowerLat, lowerLon);
    var upper = geohash.encode(upperLat, upperLon);
    return {
        lower: lower,
        upper: upper
    };
};
// Retrieve the current coordinates using the navigator API
// navigator.geolocation.getCurrentPosition(function (position) {
//     var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
//     var range = getGeohashRange(latitude, longitude, 10);
    
//         db.collection("Users")
//         .where("geohash", ">=", range.lower)
//         .where("geohash", "<=", range.upper)
//         .onSnapshot(function (snapshot) {
//         // Your own custom logic here
//         console.log(snapshot.docs);
//     });
// });




  return (
    <div style={{ "backgroundColor": "#eee", }}> <h3 style={{ paddingTop: "1rem", textAlign: "center", color: "#ff805d" }}>
      <Trans i18nKey="List.3">All Posts</Trans></h3>
      <div style={{ textAlign: "center" }}>
        <input style={{ width: "20rem", height: "2rem", border: "none", margin: "1rem",}}
          type="search" value={search} placeholder=" Search" onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      <div>Location Filter
        <input type="integer" />
             </div>
      <div className='container1'>
        {!userData ? <div> Loading...</div> :
          userData.filter((data) => {
            if (search === "") {
              return data
            } else if (data.UserName.toLowerCase().includes(search.toLowerCase())) {
              return data
            }
          }).map((data) => {
            return (
              <div key={data.id}>
                <div className='containerBox1'>
                  <div className='card'><strong><Trans i18nKey="List.2">Title</Trans></strong>
                    : {data.Description ? data.Description : "----NA-----"}     
                    <hr />  <hr />
                    <div><strong><Trans i18nKey="Profile.2">Name</Trans>: </strong>
                      {data.UserName && data.UserName ? data.UserName : "---NA---"}
                    </div>
                    <div>
                      <strong><Trans i18nKey="Profile.3">Email</Trans>: </strong> {data.email}
                    </div>
                    <span>
                      <strong><Trans i18nKey="List.1"> User's Co-ordinates:</Trans></strong>
                    </span>
                    <div>
                      <strong><Trans i18nKey="Profile.4">Latitude</Trans>:</strong> {data.userLocation[0].lati}
                    </div>
                    <div>
                      <strong><Trans i18nKey="Profile.5">Longitude</Trans>: </strong>{data.userLocation[0].longi}
                    </div>
                    {/* <div><strong>Posted on: </strong>{getTimeStamp(data.createdAt)}</div>  */}
              
                  

            {/* { currentUser=== data.email && user?  <button onClick={() => {
            handleDelete(data.id)
              }} >Del</button>: ""}   */}
                    {!user? "": <div> {user.email===data.email && user? <button className='buttonPosition' onClick={() => {
                      handleDelete(data.id)
                    }}><BsTrash size="1rem" border="none" color='#ff805d' />
                    </button> : <em><Trans i18nKey="Profile.7">Only Author have right to do Modification!</Trans></em>}</div>}


                 
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