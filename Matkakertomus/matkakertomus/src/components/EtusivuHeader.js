import React from "react";
import {NavLink} from 'react-router-dom';

const EtusivuHeader = () => {
    return (
      <section className="u-align-center u-clearfix u-image u-shading u-section-1" src="" id="sec-da3d" data-image-width="1280" data-image-height="854">
        <div className="u-clearfix u-sheet u-sheet-1">
          <h1 className="u-text u-title u-text-1">Matkakertomukset</h1>
          <p className="u-large-text u-text u-text-variant u-text-2">Tervetuloa matkakertomukset sivullemme! Tule mukaan aktiivisien matkaajien pariin! Sivustollamme voit luoda tarinoita matkoistasi, ja jakaa niitä muiden käyttäjien kesken.<br/>Voit myös luoda yksityisiä matkoja.<br/>Liity mukaan tänään!</p>
          <a className="u-border-2 u-border-palette-2-base u-btn u-btn-round u-button-style u-hover-palette-2-base u-none u-radius-5 u-text-white u-btn-1"><NavLink to="/matkat">ALOITA SEIKKAILU</NavLink></a>
        </div>
      </section>
    );
  }

  export default EtusivuHeader;