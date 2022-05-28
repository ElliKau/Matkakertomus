import React from "react";
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import Modal from 'react-modal';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";

const OmatMatkat = () => {

  const { loginContext, setLoginContext, loginContextId, setLoginContextId, loginContextKuva, setLoginContextKuva } = useContext(UserContext);

  const [omatMatkat, setOmatMatkat] = useState([]);
  const [muokkaa, setMuokkaa] = useState(false);
  const [idmatka, setIdmatka] = useState("");
  const [disable, setDisabled] = useState(true);
  const [alkupvm, setAlkupvm] = useState("");
  const [loppupvm, setLoppupvm] = useState("");
  const [yksityinen, setYksityinen] = useState("off");
  const [MatkanNimi, setMatkanNimi] = useState("");
  const [matkanTiedot, setMatkanTiedot] = useState([]);
  const navigate = useNavigate();
  Modal.setAppElement('#root');

  //matkojen haku, myös yksityiset
  useEffect(() => {
    axios.get(`http://localhost:3004/api/omatmatkat/${loginContextId}`).then((response) => {
      setOmatMatkat(response.data)
    });

  }, []);

  //Matkan poistaminen
  const PoistaMatkaClicked = (props) => {
    setIdmatka(props);
    console.log(idmatka, "tässä on matkaid");
    if (window.confirm("haluatko poistaa varmasti matkan?")) {
      axios.delete("http://localhost:3004" + `/api/deletematka/${props}`,).then((response) => {
        console.log("vastaus", response);
      })
      alert("Poistit matkan onnistuneesti!")

      navigate("/")
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:3004"/getmatka/${idmatka}`, {

    })
      .then(function (response) {
        setMatkanTiedot(response.data);
        console.log("data: ", matkanTiedot);

        response.data.map((val) => {

          setAlkupvm(val.alkupvm);
          setLoppupvm(val.loppupvm)

          setMatkanNimi(val.nimi)
          console.log(alkupvm)
          console.log(val.loppupvm)

          if (val.yksityinen == 1)
            setYksityinen("on")
          if (val.yksityinen == 0)
            setYksityinen("off")


        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [idmatka]);

  //Modaali
  let subtitle;
  const [modal, setOpenmodal] = useState(false);
  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }
  const HandleCancel = () => {
    setOpenmodal(false);
  }

  //Matkan muokkaus ja tarkistukset
  const Muokkaamatka = () => {
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
      axios.put("http://localhost:3004" + `/UpdateMatka/${idmatka}`, { nimi: MatkanNimi, alkupvm: alkupvm, loppupvm: loppupvm, yksityinen: yksityinen }).then((response) => {
        console.log("vastaus", response);

        setMatkanNimi("");
        setAlkupvm("");
        setLoppupvm("");
        setIdmatka("");
        alert("Muokkasit matkaa onnistuneesti!")
        setOpenmodal(false);
      })
    }


  }

  //Matkojen näyttäminen
  const omatmatkat_rivit = omatMatkat.map((matka) => {

    if (!matka.kuva) {
      matka.kuva = "matkakertomus_empty.jpg";
    }
    return <div className="u-border-2 u-border-palette-5-light-3 u-container-style u-expanded-width u-group u-shape-rectangle u-group-1">
      <div className="u-container-layout u-container-layout-1">
        <img className="u-expanded-height u-image u-image-default u-image-1" src={`/uploads/${matka.kuva}`} data-image-width="1280" data-image-height="820" />
        <h2 className="u-text u-text-default u-text-2">{matka.nimi}<span style={{ fontWeight: '700' }}></span></h2>
        <p className="u-text u-text-3" style={{ maxHeight: '90px', minHeight: '90px' }}>{matka.teksti}</p>
        <a style={{ float: 'right', marginRight: '20px', marginTop: '65px' }}><a className="nappi"><NavLink to={`/matkat/${matka.idmatka}`}>AVAA MATKA</NavLink></a><a className="nappi-poista" onClick={() => PoistaMatkaClicked(matka.idmatka)}>X</a></a>
        <p className="u-text u-text-4"><b>Julkaistu:</b> {matka.luomispvm}</p>
      </div>
    </div>
  });
console.log(omatmatkat_rivit,"RIVIT")
  return (
    <section className="u-align-center u-clearfix u-section-9">
      <div className="u-clearfix u-sheet u-sheet-1">
        <h3 className="u-text u-text-default u-text-1">OMAT MATKAT</h3>
        <div>
                  {(() => {
                    if (omatmatkat_rivit.length == 0) {
                      return (
                        <div style={{justifyContent:'center', marginTop:50}}>

                          <h3>Et ole vielä luonut matkoja</h3>

                        </div>
                      )
                    } else {
                      return (
                        omatmatkat_rivit
                      )
                    }
                  })()}
                </div>
      </div>
      <Modal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '200px',
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
            margin: 'auto',
            height: '700px'
          }
        }}
        isOpen={modal}
        onAfterOpen={afterOpenModal}
        contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Muuta matkan tietoja</h2>
        <div></div>
        <form >
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
        </form >

        <input type="button" value={muokkaa == true ? "TALLENNA" : "MUOKKAA"} onClick={() => Muokkaamatka()} class={muokkaa == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>
        <input type="button" value="POISTU TALLENTAMATTA" onClick={() => HandleCancel()} class={muokkaa == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>

      </Modal>
    </section>
  );
}

export default OmatMatkat;