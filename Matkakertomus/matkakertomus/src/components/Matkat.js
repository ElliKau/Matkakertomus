import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";

const Matkat = () => {

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [matkat, setMatkat] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3004/api/matkat").then((response) => {

      setMatkat(response.data)

    });

  }, []);
  const LisaaClicked = (props) => {
    navigate("/matkat/" + props)
  }
  const rivit = matkat.map((matka, i) => {
    if (!matka.kuva) {
      matka.kuva = "matkakertomus_empty.jpg"
    }
    return <div key={i} className="u-border-2 u-border-palette-5-light-3 u-container-style u-expanded-width u-group u-shape-rectangle u-group-1">
      <div className="u-container-layout u-container-layout-1">

        <img className="u-expanded-height u-image u-image-default u-image-1" src={`/uploads/${matka.kuva}`} alt="" data-image-width="1280" data-image-height="820" />
        <h2 className="u-text u-text-default u-text-2" data-testid="id_matkanimi">{matka.nimi}<span style={{ fontWeight: '700' }}></span></h2>
        <p className="u-text u-text-3" style={{ maxHeight: '90px', minHeight: '90px' }}>{matka.teksti}</p>
        <a className="u-border-2 u-border-palette-2-base u-btn u-btn-round u-button-style u-hover-palette-2-base u-none u-radius-6 u-text-body-color u-text-hover-white u-btn-1" onClick={() => LisaaClicked(matka.idmatka)}>LUE LISÄÄ</a>
        <p className="u-text u-text-4" data-testid="id_matkaajanimim"><b>Julkaistu:</b> {matka.luomispvm} - {matka.nimimerkki}</p>
      </div>
    </div>

  });

  return (
    <section style={{ marginBottom: '50px' }} className="u-align-center u-clearfix u-section-3">

      <div className="u-clearfix u-sheet u-sheet-1">
        <h3 className="u-text u-text-default u-text-1">Viimeisimmät matkat</h3>
        {rivit}
      </div>
    </section>
  );
}

export default Matkat;