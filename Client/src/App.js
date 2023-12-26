// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import About from './Components/About';
import Movies from './Components/Movies.jsx';  // Note: Updated import for Movies
import Contact from './Components/Contact.js';
import MovieDetails from './Components/MovieDetails.jsx';
import { useState } from 'react';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='/' element={<Movies />} />  {/* Updated: Render Movies component */}
            <Route path="/fetchMoive/:id" element={<MovieDetails />} />
            <Route path='/Login' element={<Login showAlert={showAlert} />}></Route>
            <Route path='/Signup' element={<Signup showAlert={showAlert} />}></Route>
            <Route path='/About' element={<About />}></Route>
            <Route path='/Contact' element={<Contact />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
