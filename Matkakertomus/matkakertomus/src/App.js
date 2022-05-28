// Komponenttien import components kansiosta
import EtusivuHeader from "./components/EtusivuHeader"
import EtusivuTeksti from "./components/EtusivuTeksti"
import EtusivuVideo from "./components/EtusivuVideo"
import EtusivuMatkakohteet from "./components/EtusivuMatkakohteet"
import Footer from "./components/Footer"
import FormMatkat from "./components/FormMatkat"
import Kirjaudu from "./components/Kirjaudu"
import Matkat from "./components/Matkat"
import MatkatTarina from "./components/MatkatTarina"
import Members from "./components/Members"
import NavBar from "./components/NavBar"
import OmatMatkat from "./components/OmatMatkat"
import Profiili from "./components/Profiili"

import axios from 'axios';
import {UserContext} from "./UserContext";

import {Routes, Route, Navigate} from 'react-router-dom';
import React, {useState, useEffect} from "react";

import './home.css';
import './nicepage.css';

function App() {

  const [loginContext, setLoginContext] = useState("");
  const [loginContextId, setLoginContextId] = useState("");
  const [loginContextKuva, setLoginContextKuva] = useState("");



  useEffect(() =>{

    axios.get("http://localhost:3004/login", { withCredentials: true }).then((response) =>{

    if(response.data.loggedIn == true)
    console.log(response)
    setLoginContext(response.data.user[0].nimimerkki);
    setLoginContextId(response.data.user[0].idmatkaaja);
    setLoginContextKuva(response.data.user[0].kuva);

    })

  }, [])

  return (
    <div className="u-body">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta charSet="utf-8"></meta>
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"></link>
    <UserContext.Provider value={{loginContext, setLoginContext, loginContextKuva, setLoginContextKuva, loginContextId, setLoginContextId}}>
    <Routes>
      
      <Route path="/"           element={[<NavBar/>,<EtusivuHeader/>,<EtusivuTeksti/>,<EtusivuMatkakohteet/>,<Footer/>]}/>
      <Route path="/kirjaudu"   element={[loginContext ? (<Navigate to='/'/>) : <NavBar/>,<Kirjaudu/>,<Footer/>]}/>
      <Route path="/profiili"   element={[loginContext ? [<NavBar/>,<Profiili/>, <OmatMatkat/>,<Footer/>] : <Navigate to='/kirjaudu'/>]}/>
      <Route path="/matkat"     element={[loginContext ? [<NavBar/>,<Matkat/>,<Footer/>] : <Navigate to='/kirjaudu'/>] }/>
      <Route path="/matkat/:idmatka"   element={[<NavBar/>,<MatkatTarina/>,<Footer/>]}/>
      <Route path="/matkat/add" element={[loginContext ? [<NavBar/>,<FormMatkat/>,<Footer/>] : <Navigate to='/kirjaudu'/>]}/>
      <Route path="/jasenet"    element={[loginContext ? [<NavBar/>,<Members/>,<Footer/>] : <Navigate to='/kirjaudu'/>]}/>
      
    </Routes>
    </UserContext.Provider>
    </div>
  );
}

export {
  App
};
