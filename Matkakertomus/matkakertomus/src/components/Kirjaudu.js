import React from "react";
import Modal from "react-modal";
import axios from "axios";

import {UserContext} from "../UserContext";
import {useState, useEffect, useContext} from "react";
import { Navigate } from "react-router-dom";

const Kirjaudu = () => {

    const [etunimi, setEtunimi] = useState("");
    const [sukunimi, setSukunimi] = useState("");
    const [nimimerkki, setNimimerkki] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [paikkakunta, setPaikkakunta] = useState("");
    const {loginContext, setLoginContext, loginContextId, setLoginContextId, loginContextKuva, setLoginContextKuva } = useContext(UserContext);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPasswd, setLoginPasswd] = useState("");
  
   // TODO: bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
   Modal.setAppElement('#root');
  
   //pieni otsikko modaalissa
   let subtitle;
   const [modal, setOpenmodal] = useState(false);
  
   //Avaus ja sulku
   function modaaliAvaus() {
     setOpenmodal(true);
   }
   function modaaliSulje() {
     setOpenmodal(false);
   }
  
   axios.defaults.withCredentials = true;
   
   const login = (e) =>{

e.preventDefault();
  
    if(loginContext != ""){
    window.confirm("Olet jo kirjautunut sisään!");
  }
  
  else{
    axios.post("http://localhost:3004/login",{
  
    username: loginUsername,
    password: loginPasswd,
  }).then((response) =>{
  
    if(!response.data.auth){
  window.confirm(response.data.message);
  console.log(response);
    } else{
      setLoginContext(response.data.result[0].nimimerkki);
      setLoginContextId(response.data.result[0].idmatkaaja);
      setLoginContextKuva(response.data.result[0].kuva);
  
      setLoginUsername("");
      setLoginPasswd("");
    }
  
    
  });
  }
  
    };
  
    useEffect(() =>{
  
      axios.get("http://localhost:3004/login").then((response) =>{
  
      if(response.data.loggedIn == true)
      console.log(response)
      setLoginContext(response.data.user[0].nimimerkki);
      setLoginContextId(response.data.user[0].idmatkaaja);
      setLoginContextKuva(response.data.user[0].kuva);
  
      })
  
    }, [])
  
   const luoKayttaja = () => {
  
    if(etunimi == "" || sukunimi == "" || nimimerkki == "" || email == "" || password == "" )
    {
  
      window.confirm("Kaikkia kenttiä ei täytetty! Täytä kaikki kentät!");
    }
  
  
   else{
    axios.post("http://localhost:3004/api/insert",{
  
      etunimi: etunimi,
      sukunimi: sukunimi,
      nimimerkki: nimimerkki,
      email: email,
      password: password,
      paikkakunta: paikkakunta,
      }).then((response) =>{
  
        if(response.data.err){
  
          window.confirm("Nimimerkki tai sähköpostiosoite on jo käytössä!");
  
        }
        else{
        window.confirm("Rekisteröidyit onnistuneesti!");
        setEtunimi("");
        setSukunimi("");
        setNimimerkki("");
        setEmail("");
        setPassword("");
        setPaikkakunta("");
        modaaliSulje();
      }
      });
    }
      
  
  }
  
    return (<div>
  
  <Modal
  
  style={{
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(21, 21, 21, 0.75)',
      zIndex: '20'
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#FFF',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
      maxWidth: '600px',
      margin: '0px 606px',
      marginTop: '55px',
      height: '660px'
    }
  }}
            isOpen={modal}
            onRequestClose={modaaliSulje}
            contentLabel="Example Modal">
   <section>
   <button className="u-dialog-close-button u-icon u-text-grey-50 u-icon-1" onClick={modaaliSulje}>x</button>
            <h6 style={{marginLeft: '200px'}}className="u-text u-text-default u-text-1">REKISTERÖIDY</h6>
            <p style={{'font-size': '15px'}}>*-merkityt kentät ovat pakollisia!</p>  
            <div className="u-expanded-width-xs u-form u-form-1">
              <form action="#" method="POST" className="u-clearfix u-form-spacing-11 u-form-vertical u-inner-form" source="custom" name="form">
                <div className="u-form-group u-form-group-1">
                  <label for="email-a136" className="u-label">Etunimi</label><label style={{ color: "red" }} for="email-a136" className="u-label u-label-1">    *</label> 
                  <input type="text" placeholder="" value={etunimi} onChange={(e) => setEtunimi(e.target.value)} className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" required="required"/>
                </div>
                <div className="u-form-group u-form-partition-factor-2 u-form-textarea u-form-group-2">
                  <label style={{width: '100%'}} for="textarea-1457" className="u-label">Sukunimi</label><label style={{ color: "red" }} for="email-a136" className="u-label u-label-1">    *</label> 
                  <input type="text"  value={sukunimi} onChange={(e) => setSukunimi(e.target.value)} className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" required="required"/>
                </div>
                <div className="u-form-group u-form-group-3">
                  <label for="text-17ba" className="u-label">Nimimerkki</label><label style={{ color: "red" }} for="email-a136" className="u-label u-label-1">    *</label> 
                  <input type="text" placeholder="" value={nimimerkki} onChange={(e) => setNimimerkki(e.target.value)} className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" required="required"/>
                </div>
                <div className="u-form-email u-form-group u-form-group-4">
                  <label for="email-5caa" className="u-label">Sähköposti</label><label style={{ color: "red" }} for="email-a136" className="u-label u-label-1">    *</label> 
                  <input type="email"name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" required=""/>
                </div>
                <div className="u-form-group u-form-textarea u-form-group-5">
                  <label for="textarea-39ea" className="u-label">Salasana</label><label style={{ color: "red" }} for="email-a136" className="u-label u-label-1">    *</label> 
                  <input type="password" name="password" rows="4" cols="50"  value={password} onChange={(e) => setPassword(e.target.value)} className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" required="required"/>
                </div>
                <div className="u-form-group u-form-group-6">
                  <label for="text-bee9" className="u-label">Paikkakunta</label>
                  <input type="text"  value={paikkakunta} onChange={(e) => setPaikkakunta(e.target.value)} className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7"/>
                </div>
                <div className="u-align-center u-form-group u-form-submit u-form-group-7">
                  <a style={{width: '100%', marginTop: '25px'}} onClick={luoKayttaja}className="u-border-none u-btn u-btn-submit u-button-style u-palette-2-base u-btn-1">Luo Käyttäjä</a>
                  <input type="submit" value="submit" className="u-form-control-hidden"/>
                </div>
               
              </form>
            
          
        </div>
      </section>
          </Modal>
      <section className="u-align-center u-clearfix u-section-12" id="carousel_81ad">
        <div className="u-clearfix u-sheet u-sheet-1">
          <h2 className="u-custom-font u-font-montserrat u-text u-text-default u-text-1">Kirjaudu sisään</h2>
          <p className="u-small-text u-text u-text-default u-text-variant u-text-2"> Kirjautumalla sisään saat käyttöösi lisää ominaisuuksia. Voit lisätä omia tarinoita,<br/>sekä luoda yksityisiä matkoja, jotka ovat vain näkyvissä ​haluamillesi käyttäjille.</p>
          <div className="u-align-center-sm u-align-center-xs u-align-left-lg u-align-left-md u-align-left-xl u-container-style u-group u-radius-5 u-shape-round u-white u-group-1">
            <div className="u-container-layout u-valign-top u-container-layout-1">
              <div className="u-align-left u-form u-form-1">
                <form action="#" onSubmit={login}  className="u-clearfix u-form-spacing-10 u-inner-form kirjaudu" name="form" style={{padding: '10px'}}>
                  <div className="u-form-group u-form-name">
                    <label for="name-61fc" className="u-label">Käyttäjätunnus
                    <input type="text" data-testid="id_kayttajatunnus"  value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="Käyttäjätunnus" id="name-61fc" name="nimi" className="u-border-1 u-border-grey-10 u-grey-10 u-input u-input-rectangle u-radius-5" required=""/>
                    </label>
                  </div>
                  <div className="u-form-group u-form-group-2">
                    <label for="phone-0bf6" className="u-label">Salasana
                    <input type="password" data-testid="id_salasana" value={loginPasswd} onChange={(e) => setLoginPasswd(e.target.value)} placeholder="Salasana" id="phone-0bf6" name="password" className="u-border-1 u-border-grey-10 u-grey-10 u-input u-input-rectangle u-radius-5" required="required"/>
                    </label>
                  </div>
                  <div className="u-align-left u-form-group u-form-submit">
                    <button type="submit" className="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-font u-font-montserrat u-palette-2-base u-radius-5 u-btn-1">Kirjaudu</button>
                    <input type="submit" data-testid="id_submitkirjaudu" value="submit" className="u-form-control-hidden"/>
                  </div>
                  <div className="u-form-send-message u-form-send-success"> Thank you! Your message has been sent. </div>
                  <div className="u-form-send-error u-form-send-message"> Unable to send your message. Please fix errors then try again. </div>
                  <input type="hidden" value="" name="recaptchaResponse"/>
                </form>
              </div>
              <p className="u-small-text u-text u-text-default u-text-variant u-text-3">Etkö ole vielä jäsen? Rekisteröidy <span style={{fontWeight: '700'}} className="u-text-palette-2-base">
                  <a onClick={modaaliAvaus} className="u-active-none u-border-none u-btn u-button-link u-button-style u-dialog-link u-hover-none u-none u-text-palette-2-base u-btn-2">Täällä</a>
                </span>
              </p>
            </div>
            
          </div>
        </div>
      </section></div>
    );
  }

  export default Kirjaudu;