import React from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {UserContext} from "../UserContext";
import {useContext} from "react";
import axios from 'axios';

import logo_dark from '../matkakertomus_logo_dark.png';



const NavBar = () => {


    const {loginContext, setLoginContext, setLoginContextId, loginContextId, loginContextKuva, setLoginContextKuva} = useContext(UserContext);

    const logout = () =>{


        axios.delete("http://localhost:3004/logout").then((response) => {

        if(response)
        {

          setLoginContext("");
          setLoginContextId("");
          setLoginContextKuva("");

        }

        });

    }
   
    return (
      <header className="u-clearfix u-header u-sticky u-sticky-234c u-white u-header" id="sec-8fa0"><div className="u-clearfix u-sheet u-sheet-1">
        <a href="#" className="u-hover-feature u-image u-logo u-image-1" data-image-width="248" data-image-height="81">
        <NavLink to="/"> <img src={logo_dark} className="u-logo-image u-logo-image-1" /></NavLink>
        </a>
        <nav className="u-menu-dropdown u-offcanvas u-menu-1">
          <div className="u-custom-menu u-nav-container">
            <ul className="u-custom-font u-heading-font u-nav u-spacing-30 u-unstyled u-nav-1">
  
            <li className="u-nav-item" data-testid="id_kirjaudubtn">{loginContext ? <a onClick={() => logout()} style={{cursor: "pointer", padding: '14px 0px' }} className="u-border-2 u-border-active-palette-2-base u-border-hover-palette-2-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-black u-text-hover-palette-2-base">Kirjaudu ulos</a> : <a className="u-border-2 u-border-active-palette-2-base u-border-hover-palette-2-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-black u-text-hover-palette-2-base" style={{ padding: '14px 0px' }}><NavLink to="/kirjaudu">KIRJAUDU</NavLink></a>}</li>
              <li className="u-nav-item"><a className="u-border-2 u-border-active-palette-2-base u-border-hover-palette-2-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-black u-text-hover-palette-2-base" style={{ padding: '14px 0px' }}><NavLink to="/profiili">{loginContext} </NavLink></a></li>
            </ul>
          </div>
        </nav>
        {loginContext ? <a href="#" className="u-border-2 u-border-palette-2-base u-btn u-btn-round u-button-style u-hover-palette-2-base u-none u-radius-5 u-text-hover-white u-text-palette-2-base u-btn-1"> <NavLink to="/matkat/add">Lisää matka</NavLink></a> : ""}
        <nav className="u-align-left u-menu-dropdown u-offcanvas u-menu-2">
          <div className="u-custom-menu u-nav-container">
            <ul className="u-custom-font u-heading-font u-nav u-spacing-30 u-unstyled u-nav-3">
              <li className="u-nav-item"><a className="u-border-2 u-border-active-palette-2-base u-border-hover-palette-2-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-black u-text-hover-palette-2-base" style={{ padding: '14px 18px' }}><NavLink to="/">ETUSIVU</NavLink></a></li>
              <li className="u-nav-item">{loginContext ? <a className="u-border-2 u-border-active-palette-2-base u-border-hover-palette-2-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-black u-text-hover-palette-2-base" data-testid="id_matkabtn" style={{ padding: '14px 18px' }}><NavLink to="/matkat">MATKAT</NavLink></a> : ""}</li>
               <li className="u-nav-item">{loginContext ?<a className="u-border-2 u-border-active-palette-2-base u-border-hover-palette-2-base u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-black u-text-hover-palette-2-base" style={{ padding: '14px 18px' }}><NavLink to="/jasenet">JÄSENET</NavLink></a> : ""}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      </header>
    );
  }

  export default NavBar;