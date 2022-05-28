import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";

const Members = () => {

    const [jäsenet, setJäsenet] = useState([]);
  
    useEffect(() => {
  
      axios.get("http://localhost:3004/api/jasenet").then((response) => {
  
        setJäsenet(response.data)
  
      });
  
    }, []);
  
    const rivit = jäsenet.map((val) => (
  
      <div className="u-align-center u-container-style u-list-item u-repeater-item">
        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
          <div alt="" className="u-align-center u-image u-image-circle u-image-1" style={{backgroundImage: `url("/uploads/${val.kuva}")`}} data-image-width="1280" data-image-height="1280"></div>
          <h5 className="u-text u-text-3">{val.etunimi} {val.sukunimi}</h5>
          <p className="u-text u-text-4">{val.nimimerkki}</p>
          <p className="u-text u-text-4">{val.paikkakunta}</p>
          <p className="u-text u-text-4 tooltip">ESITTELY
          <span class="tooltiptext">{val.esittely}</span>
          </p>
        </div>
      </div>
    ));
  
    return (
      <section className="u-align-center u-clearfix u-section-10" id="sec-c588">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="u-container-style u-expanded-width u-group u-palette-5-light-3 u-shape-rectangle u-group-1">
            <div className="u-container-layout u-container-layout-1">
              <h4 className="u-align-center u-text u-text-1">JÄSENET</h4>
              <p className="u-align-center u-text u-text-2">Tutustu muihin matkailijoihin!<br/>Voit lukea lisää haluamastasi käyttäjästä osoittamalla henkilön esittely tekstin kohdalle.</p>
            </div>
          </div>
          <div className="u-expanded-width u-list u-list-1">
      <div className="u-repeater u-repeater-1">
      {rivit}
        </div>
    
        </div>
  
        </div>
      </section>
    );
  }

  export default Members;