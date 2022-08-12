/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc,where, addDoc, orderBy, endAt, QuerySnapshot, getDocs} from 'firebase/firestore'
 import { auth, db } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './listing.css'
import geohash from "ngeohash";
import {  BsTrash} from 'react-icons/bs'
import { Trans, useTranslation } from 'react-i18next';
import { getFirestore } from "firebase/firestore"
import { startAt } from 'firebase/database'
import { async } from '@firebase/util'
import firebase from 'firebase/app';
import 'firebase/firestore';
const geofire = require('geofire-common');


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
 
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      // localStorage.setItem("User1", user.email)
    })
    
   
    const q = query(collection(db, "users"));
    
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let geoArray = [];
      QuerySnapshot.forEach((doc) => {
        geoArray.push({ ...doc.data(), id: doc.id })
      });
      setUserData(geoArray)
      navigate("../home")
      console.log(userData, "test")
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
  //  const lng = place[0].longi;
  // const lat = place[0].lati


  
 // const geohash=`tsz6x57ex`
     
  // const locts = () => {
  //   const lng = 22.1766701;
  //   const lat = 78.0080745
  
  //   const radiusInM = 50 * 1000;
  //   const center = [lat, lng];
  //   const bounds = geofire.geohashQueryBounds(center, radiusInM);
  //   const promises = []
  //   for (const b of bounds) {
  //    const q = query(collection(db, "users"), orderBy("geohash"));
  //       // orderBy('geohash'),
  //       // startAt(b[0]),
  //       // endAt(b[1]));
  //      promises.push(q)
  //     // let geoArray = [];
  //     // querySnapshot.forEach((doc) => {
  //     //   geoArray.push(doc.data())
  //     //   console.log(geoArray)
  //     // })
  //   }

  //   Promise.all(promises).then((snapshots) => {
  //   const matchingDocs = [];

  //   for (const snap of snapshots) {
  //     for (const doc of snap.docs) {
  //       const lat = doc.get('lat');
  //       const lng = doc.get('lng');

  //       // We have to filter out a few false positives due to GeoHash
  //       // accuracy, but most will match
  //       const distanceInKm = geofire.distanceBetween([lat, lng], center);
  //       const distanceInM = distanceInKm * 1000;
  //       if (distanceInM <= radiusInM) {
  //         matchingDocs.push(doc);
  //       }
  //     }
  //   } 

  //   return matchingDocs;
  // }).then((matchingDocs) => {
  //   // Process the matching documents
  //   // [START_EXCLUDE]
  //   // done(matchingDocs);
  //   // [END_EXCLUDE]
  // });
 
  // }


 const locts = async () => {
  
   
   
   const center = [27.1766701, 78.0080745];
  const radiusInM = 50 * 1000;

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = await getDocs(collection(db, "users"),
      orderBy('geohash')
      ,startAt(b[0])
      ,endAt(b[1]));
    promises.push(q);
    console.log("p",promises)
  }

  // Collect all the query results together into a single list
  Promise.all(promises).then((snapshots) => {
    const matchingDocs = [];
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        console.log(snap, "testing")
        const lat = doc.get('userLocation.lati');
        const lng = doc.get('userLocation.longi');

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = geofire.distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }

    return matchingDocs;
  })
    // [END_EXCLUDE]
  }

//   // [END fs_geo_query_hashes]
   







   


  
  


  

  

  return (
    <div style={{ "backgroundColor": "#eee", }}> <h3 style={{ paddingTop: "1rem", textAlign: "center", color: "#ff805d" }}>
      <Trans i18nKey="List.3">All Posts</Trans></h3>
      <div style={{ textAlign: "center" }}>
        <input style={{ width: "20rem", height: "2rem", border: "none", margin: "1rem", }}
          type="search" value={search} placeholder=" Search" onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      <div>Location Filter
        {/* <input type="integer" onChange={()=>{geohash()}} /> */}
        <button onClick={() => { locts() }}>Location</button>
      </div>
      <div className='container1'>
        {!userData && !userData ? <div> Loading...</div> :
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
                      <strong><Trans i18nKey="Profile.4">Latitude</Trans>:</strong>{data.userLocation[0].lati}
                    </div>
                    <div>
                      <strong><Trans i18nKey="Profile.5">Longitude</Trans>: </strong>{data.userLocation[0].longi}
                    </div>
                    {/* <div><strong>Posted on: </strong>{getTimeStamp(data.createdAt)}</div>  */}
              
                  

                    {/* { currentUser=== data.email && user?  <button onClick={() => {
            handleDelete(data.id)
              }} >Del</button>: ""}   */}
                    {!user ? "" : <div> {user.email === data.email && user ? <button className='buttonPosition' onClick={() => {
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