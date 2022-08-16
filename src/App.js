import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Listing from './pages/listingPage/listing'
import Navbar from './components/navbar/navbar';
import LogIn from './pages/login/login';
import SignUp from './pages/signup/signup';
import ForgetPassword from './pages/forgetPass/forgetPassword';
import Post from './components/posts/posts';
import ProfilePage from './pages/profile';



function App() {

  
  return (
    <div className="App">
       <Navbar />
        <Routes>
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/*" element={<Listing />} />
        <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/profile/post" element={<Post />} />

      </Routes>
      </div>
  );
}

export default App;














// function App() {
//   return (
//     <div className="App">
//     <Navbar/>
//       <Routes>
//         <Route exact path="/login" element={<LogIn />} />
//         <Route exact path="/signup" element={<SignUp />} />
//         <Route exact path="/*" element={<Listing />} />
//         <Route exact path="/forgetpassword" element={<ForgetPassword />} />
//         <Route exact path="/profile" element={<Profile />} />
//           <Route exact path="/profile/post" element={<Post />} />

//       </Routes>
//       </div>
//   );
// }

// export default App;
