import React from "react";
import {useEffect, useState, useRef, useContext} from "react";
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';

import Modal from 'react-modal';
import { resetState } from 'react-modal/lib/helpers/ariaAppHider';
import { Link, NavLink, Routes, Route, BrowserRouter as Router, useNavigate, useLocation, Navigate, LinkButton } from 'react-router-dom'

import { Nav, Navbar, NavDropdown, Container, NavItem, MenuItem } from 'react-modal'
import "../App.css"
import "../home.css"
import { UserContext } from "../UserContext";

import Axios from 'axios';



const FormMatkat = () => {
  const [toggleState, setToggleState] = useState(1);

  useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [matkat, setMatkat] = useState([]);
  const [matkakohteet, setMatkakohteet] = useState([]);
  const [matkakohde, setMatkaKohde] = useState();
 
  const [kohde, setKohde] = useState();
  const [tarina, setTarina] = useState("");
  const [tarinanMatka, setTarinanMatka] = useState("");
  const [Tarinanpvm, settarinanpvm] = useState();
  const [alkupvm, setAlkupvm] = useState("");
  const [loppupvm, setLoppupvm] = useState("");
  const [yksityinen, setYksityinen] = useState("off");
  const [MatkanNimi, setMatkanNimi] = useState("");
  const [kuva, setKuva] = useState();
  const {loginContextId, setLoginContextId } = useContext(UserContext);
  const [kohdenimi,setKohdenimi] = useState("");
  const [maa,setMaa] = useState("");
  const [paikkakunta,setPaikkakunta]= useState("");
  const [Kuvausteksti,setKuvausteksti] = useState("");
  const [file, setFile] = useState();
  const [esikatselu, setEsikatselu] = useState();
  useEffect(() => {
    Axios.get("http://localhost:3004/api/matkattarinalle" +`/${loginContextId}`).then((response) => {
      
      setMatkat(response.data);
      console.log(response.data);
      //Tämä hakee aiemmin tehdyt matkat 
    })
  }, [])
  useEffect(() => {
    Axios.get("http://localhost:3004/api/matkakohteet").then((response) => {
      setMatkakohteet(response.data);
      console.log(response.data);
      // tämä UseEffect hakee kaikki taulussa olevat matkakohteet ID sekä nimi
    })
  }, [])
  const options = matkat.map((item) =>

    <option key={item.idmatka} value={item.idmatka}>{item.luomispvm} | {item.nimi}</option>

  );
  const options2 = matkakohteet.map((item) =>

    <option key={item.idmatkakohde} value={item.idmatkakohde}>{item.maa}, {item.paikkakunta}: {item.kohdenimi}</option>

  );
  
  console.log("matkakohteet= ", matkakohteet);
  console.log("Matkat= ", matkat);
  const navigate = useNavigate();
  const SubmitTarina = (e) => {
    
    e.preventDefault(); //Tämä vie databaseen tarinan
    const formData = new FormData();
  //********* HERE IS THE CHANGE ***********
 formData.append("idmatkakohde", matkakohde);
 formData.append("pvm", Tarinanpvm);
 formData.append("teksti", tarina);
 formData.append("idmatka",tarinanMatka);
 
 if(file != undefined){
  for (let i = 0; i < file.length; i++) {
    formData.append('file', file[i]);
  
  console.log(formData.get('file'));
  }
}
    if (tarinanMatka == 0)
      alert("Et ole lisännyt matkaa!")
    else if (matkakohde == 0)
      alert("Et ole lisännyt matkakohdetta!")
    else if (Tarinanpvm == undefined)
      alert("Et ole lisännyt päivämäärää!") // tänne lisätty tuo form data, korjaa Juuso tarvittaessa!!
    else {
      Axios.post("http://localhost:3004/api/insertTarina", formData, {  idmatkakohde: matkakohde, pvm: Tarinanpvm, teksti: tarina, idmatka: tarinanMatka }).then((response) => {
        console.log(response);
        settarinanpvm("");
        setTarina("");
        setTarinanMatka(0);
        setMatkaKohde(0);
        setFile("");
        alert("Lisäsit tarinan onnistuneesti!!");
      
      })
    }

  }
  const SubmitMatkakohde = (e) =>{
    e.preventDefault(); 
    const formData2 = new FormData();
    if (kohdenimi == "")
      alert("Et ole lisännyt kohdenimeä")
    else if (maa == "")
      alert("Et ole lisännyt maata")
    else if (paikkakunta == "")
      alert("et ole lisännyt paikkakuntaa")
      else if (Kuvausteksti == "")
      alert("et ole lisännyt kuvaustekstiä")
    


    else {

      formData2.append("kohdenimi", kohdenimi);
      formData2.append("maa", maa);
      formData2.append("paikkakunta", paikkakunta);
      formData2.append("Kuvausteksti",Kuvausteksti);

      if(file != undefined){
          formData2.append('file', file[0]);
      
        console.log(formData2.get('file'));
        
      }

      
      Axios.post("http://localhost:3004/api/insertMatkakohde", formData2).then((response) => {
        console.log("vastaus",response);
        
        setKohdenimi("");
        setMaa("");
        setPaikkakunta("");
        setFile("");
        setKuvausteksti("");
        alert("Lisäsit matkakohteen onnistuneesti")
        
        
      })
      
    }

  }
  const SubmitMatka = (e, Navigation) => {
    e.preventDefault(); //tämä vaatii vielä matkaajan id:n!!!
    if (MatkanNimi == "")
      alert("Et ole lisännyt matkannimeä")
    else if (alkupvm == "")
      alert("Et ole lisännyt alkupäivämäärää")
    else if (loppupvm == "")
      alert("et ole lisännyt loppupäivämäärää")
    else if (yksityinen == "off")
      setYksityinen(0);
    else if (yksityinen == "on")
      setYksityinen(1);


    else {
      Axios.post("http://localhost:3004/api/insertMatka", {idmatkaaja: loginContextId, nimi: MatkanNimi, alkupvm: alkupvm, loppupvm: loppupvm, yksityinen: yksityinen }).then((response) => {
        console.log("vastaus",response);
        
        setMatkanNimi("");
        setAlkupvm("");
        setLoppupvm("");
        alert("Lisäsit matkan onnistuneesti")
       
      })
      
    }
  }

  const GotoPicture = (e) => {
    const [esikatselu] = e.target.files;
    setEsikatselu(URL.createObjectURL(esikatselu));
    setFile(e.target.files);
    
  };
  
  
  return (
    <section className="u-align-center u-clearfix u-section-4" id="sec-6043">
      <div className="u-clearfix width">
        <div className="u-expanded-width u-tab-links-align-justify u-tabs u-tabs-1">
          <ul className="u-tab-list u-unstyled" role="tablist">

            <li className="u-tab-item" onClick={() => toggleTab(1)}>
              <a style={{borderRight: '0px'}} className={toggleState === 1 ? "active u-active-palette-2-base u-border-2 u-border-active-palette-2-base u-border-hover-grey-15 u-border-palette-2-base u-button-style u-hover-palette-2-base u-tab-link u-text-active-white u-text-hover-white u-text-palette-2-base u-tab-link-1" : "u-active-palette-2-base u-border-2 u-border-active-palette-2-base u-border-hover-grey-15 u-border-palette-2-base u-button-style u-hover-palette-2-base u-tab-link u-text-active-white u-text-hover-white u-text-palette-2-base u-tab-link-1"}>LUO MATKA</a>
            </li>
            <li className="u-tab-item" onClick={() => toggleTab(2)}>
              <a className={toggleState === 2 ? "active u-active-palette-2-base u-border-2 u-border-active-palette-2-base u-border-hover-grey-15 u-border-palette-2-base u-button-style u-hover-palette-2-base u-tab-link u-text-active-white u-text-hover-white u-text-palette-2-base u-tab-link-2" : "u-active-palette-2-base u-border-2 u-border-active-palette-2-base u-border-hover-grey-15 u-border-palette-2-base u-button-style u-hover-palette-2-base u-tab-link u-text-active-white u-text-hover-white u-text-palette-2-base u-tab-link-2"}>LUO MATKAKOHDE<br /></a>
            </li>
            <li className="u-tab-item" onClick={() => toggleTab(3)}>
              <a style={{borderLeft: '0px'}} className={toggleState === 3 ? "active u-active-palette-2-base u-border-2 u-border-active-palette-2-base u-border-hover-grey-15 u-border-palette-2-base u-button-style u-hover-palette-2-base u-tab-link u-text-active-white u-text-hover-white u-text-palette-2-base u-tab-link-2" : "u-active-palette-2-base u-border-2 u-border-active-palette-2-base u-border-hover-grey-15 u-border-palette-2-base u-button-style u-hover-palette-2-base u-tab-link u-text-active-white u-text-hover-white u-text-palette-2-base u-tab-link-2"}>LISÄÄ TARINA<br /></a>
            </li>

          </ul>
          <div className="u-tab-content">

            {/* Tab 1 */}
            <div className={toggleState === 1 ? "content  active-content" : "content"}>
              <div className="u-container-style u-tab-pane u-white u-tab-pane-1">

                <div className="u-container-layout u-container-layout-1">
                  <div className="u-form u-form-1">
                    <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="form" style={{ padding: '10px' }}>
                      <div className="u-form-group u-form-group-6">
                        <label htmlFor="text-83ce" className="u-label">Matkan otsikko</label>
                        <input type="text" value={MatkanNimi} onChange={(e) => setMatkanNimi(e.target.value)} id="text-83ce" name="text" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-4" maxLength="45" />
                      </div>
                      <div className="u-form-date u-form-group u-form-group-1">
                        <label htmlFor="date-b464" className="u-label">Alkupäivämäärä</label>
                        <input type="date" value={alkupvm} onChange={(e) => setAlkupvm(e.target.value)} id="date-b464" name="date" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white" required="" />
                      </div>
                      <div className="u-form-date u-form-group u-form-group-2">
                        <label htmlFor="date-4d96" className="u-label">Loppumispäivämäärä</label>
                        <input type="date" value={loppupvm} onChange={(e) => setLoppupvm(e.target.value)} id="date-4d96" name="date-1" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white" required="" />
                      </div>
                      <div className="u-form-checkbox u-form-group u-form-group-3">
                        <input type="checkbox" onChange={(e) => setYksityinen(e.target.value)} id="checkbox-fca3" name="checkbox" />
                        <label htmlFor="checkbox-fca3" className="u-label">Yksityinen matka<br />
                        </label>
                      </div>
                      <div className="u-align-left u-form-group u-form-submit">
                        <a onClick={(e) => SubmitMatka(e)} className="u-border-2 u-border-palette-2-base u-btn u-btn-round u-btn-submit u-button-style u-hover-palette-2-base u-none u-radius-5 u-text-hover-white u-text-palette-2-base u-btn-1">LISÄÄ MATKA</a>
                        <input type="submit" value="submit" className="u-form-control-hidden" />
                      </div>
                      <div className="u-form-send-message u-form-send-success"> Thank you! Your message has been sent. </div>
                      <div className="u-form-send-error u-form-send-message"> Unable to send your message. Please fix errors then try again. </div>
                      <input type="hidden" value="" name="recaptchaResponse" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab 2 */}
            <div className={toggleState === 2 ? "content  active-content" : "content"}>
              <div className="u-container-style u-tab-pane u-white u-tab-pane-2" id="tab-14b7" role="tabpanel" aria-labelledby="link-tab-14b7">
                <div className="u-container-layout u-container-layout-2">
                  <div className="u-form u-form-2">
                    <form method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="form-1" style={{ padding: '10px' }}>
                      <div className="u-form-group u-form-select u-form-group-5">
                        <label htmlFor="select-d6d0" className="u-label">Kohdenimi</label>
                        <div className="u-form-select-wrapper">
                        <input type="text" value={kohdenimi} onChange={(e) => setKohdenimi(e.target.value)} id="text-83ce" name="text" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-4" maxLength="45" />
                          
                        </div>
                      </div>
                      <div className="u-form-group u-form-group-6">
                        <label htmlFor="text-83ce" className="u-label">Maa</label>
                        <input type="text" value={maa} onChange={(e) => setMaa(e.target.value)} id="text-83ce" name="text" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-4" maxLength="45" />             </div>

                      <div className="u-form-group u-form-group-6">
                        <label htmlFor="date-4d96" className="u-label">Paikkakunta</label>
                        <input type="text" value={paikkakunta} onChange={(e) => setPaikkakunta(e.target.value)} id="text-83ce" name="text" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-4" maxLength="45" />                      </div>
                      
                      
                      <div className="u-form-group u-form-message">
                        <label htmlFor="message-9c56" className="u-label">Kuvausteksti</label>
                        <textarea style={{resize: 'none'}} placeholder="Kirjoita matkakohteen kuvaus" rows="4" value={Kuvausteksti} cols="50" onChange={(e) => setKuvausteksti(e.target.value)} id="message-9c56" name="message" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" required="" maxLength="500"></textarea>
                      <p style={{fontSize:"12px",marginLeft:"2px", marginTop:"5px", opacity:"0.7"}}>Merkkejä jäljellä: {500 - Kuvausteksti.length}</p>
                      </div>

                      <form style={{marginLeft: '10px'}} action="#">
                        <label className="u-label">Lisää kuva</label>
                  <input style={{marginLeft: '-30px', marginTop: '-3px'}} onChange={GotoPicture} type="file"  accept="image/*" className="u-border-palette-2-base u-btn u-btn-round u-button-style u-hover-palette-2-base u-none u-radius-5 u-text-hover-white u-text-palette-2-base u-btn-3"></input><br />
                  </form>

                      <div className="u-align-left u-form-group u-form-submit">
                        <a onClick={(e) => SubmitMatkakohde(e)} className="u-border-2 u-border-palette-2-base u-btn u-btn-round u-btn-submit u-button-style u-hover-palette-2-base u-none u-radius-5 u-text-hover-white u-btn-2">LISÄÄ MATKAKOHDE</a>
                        <input type="submit" value="submit" className="u-form-control-hidden" />
                      </div>
                      <div className="u-form-send-message u-form-send-success"> Thank you! Your message has been sent. </div>
                      <div className="u-form-send-error u-form-send-message"> Unable to send your message. Please fix errors then try again. </div>
                      <input type="hidden" value="" name="recaptchaResponse" />
                    </form>
                  </div>
                  <div >
                    
                    </div>
                  
                </div>
              </div>
            </div>
            {/* Tab 3 */}
            <div className={toggleState === 3 ? "content  active-content" : "content"}>
              <div className="u-container-style u-tab-pane u-white u-tab-pane-2" id="tab-14b7" role="tabpanel" aria-labelledby="link-tab-14b7">
                <div className="u-container-layout u-container-layout-2">
                  <div className="u-form u-form-2">
                    <form method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="form-1" style={{ padding: '10px' }}>
                      <div className="u-form-group u-form-select u-form-group-5">
                        <label htmlFor="select-d6d0" className="u-label">Valitse Matka</label>
                        <div className="u-form-select-wrapper">
                          <select id="select-d6d0" value={tarinanMatka} onChange={(e) => setTarinanMatka(e.target.value)} name="select" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-3">
                            <option value="0">Valitse...</option>
                            {options}
                          </select>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" version="1" className="u-caret"><path fill="currentColor" d="M4 8L0 4h8z"></path></svg>
                        </div>
                      </div>
                      <div className="u-form-group u-form-group-6">
                        <label htmlFor="text-83ce" className="u-label">Matkakohde</label>
                        <select onChange={(e) => setMatkaKohde(e.target.value)} value={matkakohde} name="select" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-3">
                          <option value="0">Valitse...</option>
                          {options2}
                        </select>              </div>

                      <div className="u-form-group u-form-group-6">
                        <label htmlFor="date-4d96" className="u-label">Ajankohta</label>
                        <input onChange={(e) => settarinanpvm(e.target.value)} value={Tarinanpvm} type="date" name="date-1" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white" required="" />
                      </div>
                      <div className="u-form-group u-form-message">
                        <label htmlFor="message-9c56" className="u-label">Tarina</label>
                        <textarea style={{resize: 'none'}} placeholder="Kirjoita tarinasi.." rows="4" value={tarina} cols="50" onChange={(e) => setTarina(e.target.value)} id="message-9c56" name="message" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" required="" maxLength="500"></textarea>
                      <p style={{fontSize:"12px",marginLeft:"2px", marginTop:"5px", opacity:"0.7"}}>Merkkejä jäljellä: {500 - tarina.length} </p>
                      </div>

                      <form style={{marginLeft: '10px'}} action="#">
                      <label className="u-label">Lisää kuvia</label>
                      <input style={{marginLeft: '-30px', marginTop: '-3px'}} onChange={GotoPicture} type="file" accept="image/*" multiple className="u-border-palette-2-base u-btn u-btn-round u-button-style u-hover-palette-2-base u-none u-radius-5 u-text-hover-white u-text-palette-2-base u-btn-3"></input><br />
                    </form>

                      <div className="u-align-left u-form-group u-form-submit">
                        <a onClick={(e) => SubmitTarina(e)} className="u-border-2 u-border-palette-2-base u-btn u-btn-round u-btn-submit u-button-style u-hover-palette-2-base u-none u-radius-5 u-text-hover-white u-btn-2">LISÄÄ TARINA</a>
                        <input type="submit" value="submit" className="u-form-control-hidden" />
                      </div>
                      <div className="u-form-send-message u-form-send-success"> Thank you! Your message has been sent. </div>
                      <div className="u-form-send-error u-form-send-message"> Unable to send your message. Please fix errors then try again. </div>
                      <input type="hidden" value="" name="recaptchaResponse" />
                    </form>
                  </div>
                  <div >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

  export default FormMatkat;