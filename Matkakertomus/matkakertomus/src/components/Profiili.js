import React from "react";
import axios from "axios";
import Modal from 'react-modal';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import pic from '../empty_icon.png'
import { NavLink } from "react-router-dom";

const Profiili = () => {


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { loginContext, setLoginContext, loginContextId, setLoginContextId, loginContextKuva, setLoginContextKuva } = useContext(UserContext);
  const [kirjautunut, setKirjautunut] = useState(loginContext);
  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [nimimerkki, setNimimerkki] = useState(kirjautunut);
  const [paikkakunta, setPaikkakunta] = useState("");
  const [esittely, setEsittely] = useState("");
  const [email, setEmail] = useState("");
  const [kuva, setKuva] = useState();
  const [kuvaosoite, setKuvaosoite] = useState();
  const [muokkaaPressed, setMuokkaaPressed] = useState(false);
  const [omatTiedot, setomatTiedot] = useState([]);
  const [disable, setDisabled] = useState(true);
  const [idmatkaaja, setIdmatka] = useState();
  const [matkat, setMatkat] = useState([]);
  const url = "http://localhost:3004";

  //Modal.setAppElement('#root'); 

  //Omien tietojen muokkaus
  const muokkaaKayttaja = () => {
    muokkaaPressed ? setOpenmodal(false) : setOpenmodal(true)

    setMuokkaaPressed(true);
    //console.log(" estetty oli ", disable);
    if (disable == false) {
      console.log("Muokkaus")
      const formData = new FormData();
      formData.append("etunimi", etunimi);
      formData.append("sukunimi", sukunimi);
      formData.append("nimimerkki", nimimerkki);
      formData.append("paikkakunta", paikkakunta);
      formData.append("esittely", esittely);
      formData.append("idmatkaaja", idmatkaaja);

      if (kuva != undefined) {
        formData.append('file', kuva[0]);
        //console.log(formData.get('file'));
      }
      else {
        formData.append('kuvaosoite', kuvaosoite);
      }

      //kuvan lisääminen
      axios.put(url + `/update/${idmatkaaja}`, formData
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setMuokkaaPressed(false);
    }

    disable === true ? setDisabled(false) : setDisabled(true);

  }

  //Omien tietojen haku tietokannasta
  useEffect(() => {
    axios.post(url + '/get/kayttaja', {
      kirjautunut: kirjautunut,
    })
      .then(function (response) {
        setomatTiedot(response.data);

        response.data.map((val) => {
          setEtunimi(val.etunimi)
          setSukunimi(val.sukunimi)
          setPaikkakunta(val.paikkakunta)
          setEsittely(val.esittely)
          setEmail(val.email)
          setIdmatka(val.idmatkaaja);
          setKuvaosoite(val.kuva);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [kirjautunut]);

  //Matkojen haku
  useEffect(() => {
    axios.get(url + `/get/matkat/${idmatkaaja}`).then((response) => {
      setMatkat(response.data);
    })
  }, [kirjautunut])


  //Modaali ja muotoilu
  let subtitle;
  const [modal, setOpenmodal] = useState(false);
  function afterOpenModal() {
    /*subtitle.style.color = '#f00';*/
  }

  const proftyyli = {
    backgroundColor: 'rgb(41 45 51)',
    border: '0',
    width: '100%',
    padding: '0',
    color: '#fff'
  };
  const esittelyTyyli = {
    backgroundColor: 'rgb(41 45 51)',
    height: '200px',
    border: '0',
    resize: 'none',
    width: '569px',
    color: '#fff',
    padding: '0',
  }
  const esittelyMuokkaus = {
    height: '170px',
    resize: 'none'
  }

  return (
    <section class="skrollable u-clearfix u-palette-5-dark-3 u-section-8" id="sec-37a4">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout">
            <div class="u-layout-row">
              <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                <div class="u-container-layout u-valign-top u-container-layout-1">
                  <img data-image-width="1280" data-image-height="1280" class="u-image u-image-circle u-image-1" style={{ backgroundImage: `url("/uploads/${kuvaosoite}")` }}></img>
                </div>
              </div>
              <div //Tiedot

                class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2">

                <div class="u-container-layout u-container-layout-2">

                  <h2 class="u-text u-text-default u-text-1 "><Etunimi proftyyli={proftyyli} etunimi={etunimi} setEtunimi={setEtunimi} disable={disable} /><Sukunimi proftyyli={proftyyli} sukunimi={sukunimi} setSukunimi={setSukunimi} disable={disable} /><br /></h2>
                  <br />
                  <p class="u-text u-text-4"><Nimimerkki proftyyli={proftyyli} nimimerkki={nimimerkki} setNimimerkki={setNimimerkki} disable={disable} /></p>
                  <p class="u-text u-text-2"><Email proftyyli={proftyyli} email={email} setEmail={setEmail} disable={disable} /><span style={{ fontWeight: '700' }}></span>
                  </p>
                  <p class="u-text u-text-3"><Paikkakunta proftyyli={proftyyli} paikkakunta={paikkakunta} setPaikkakunta={setPaikkakunta} disable={disable} /></p>
                  <p class="u-text u-text-5"><Esittely proftyyli={esittelyTyyli} esittely={esittely} setEsittely={setEsittely} disable={disable} /></p>
                  <div>
                    <input type="button" value={muokkaaPressed == true ? "TALLENNA" : "MUOKKAA PROFIILIA"} onClick={() => muokkaaKayttaja()} class={muokkaaPressed == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>

                    <a class="u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-2"><NavLink to="/matkat/add">LISÄÄ MATKA</NavLink></a>
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
                      backgroundColor: 'rgba(21, 21, 21, 0.75)',
                      zIndex: '20'
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
                      minWidth: '400px',
                      margin: '-150px 606px',
                      height: '815px'
                    }
                  }}
                  isOpen={modal}
                  onAfterOpen={afterOpenModal}
                  contentLabel="Example Modal">
                  <h2 className="u-text u-text-default u-text-1" ref={(_subtitle) => (subtitle = _subtitle)}>MUOKKAA PROFIILIA</h2>
                  <div></div>
                  <form >
                    <Etunimi etunimi={etunimi} setEtunimi={setEtunimi} disable={disable} />
                    <Sukunimi sukunimi={sukunimi} setSukunimi={setSukunimi} disable={disable} />
                    <Paikkakunta paikkakunta={paikkakunta} setPaikkakunta={setPaikkakunta} disable={disable} />
                    <Esittely proftyyli={esittelyMuokkaus} esittely={esittely} setEsittely={setEsittely} disable={disable} />
                    <Kuva kuva={kuva} setKuva={setKuva} kuvaosoite={kuvaosoite} /><br />
                  </form >
                  <input type="button" style={{ width: '100%' }} value={muokkaaPressed == true ? "TALLENNA MUUTOKSET" : "MUOKKAA"} onClick={() => muokkaaKayttaja()} class={muokkaaPressed == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>
                  <input type="button" style={{ width: '100%', marginTop: '-10px', marginBottom: '0px' }} value={muokkaaPressed == true ? "PERUUTA" : "MUOKKAA"} onClick={() => muokkaaKayttaja()} class={muokkaaPressed == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>
                </Modal>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Etunimi = (props) => {
  const { setEtunimi } = props;
  return <label className="u-label u-text-grey-30 u-label-1">{props.disable ? "" : "Etunimi"}
    <input maxlength="45" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" type="text" disabled={props.disable} style={props.proftyyli} value={props.etunimi} onChange={(e) => setEtunimi(e.target.value)}></input>
  </label>;
}
const Sukunimi = (props) => {
  const { setSukunimi } = props;
  return <label className="u-label u-text-grey-30 u-label-1">{props.disable ? "" : "Sukunimi"}
    <input maxlength="45" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" type="text" disabled={props.disable} style={props.proftyyli} value={props.sukunimi} onChange={(e) => setSukunimi(e.target.value)}></input>
  </label>;
}
const Nimimerkki = (props) => {
  const { setNimimerkki } = props;
  return <label className="u-label u-text-grey-30 u-label-1">{props.disable ? "" : "Nimimerkki"}
    <input maxlength="45" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" type="text" disabled={props.disable} style={props.proftyyli} value={props.nimimerkki} onChange={(e) => setNimimerkki(e.target.value)}></input>
  </label>;
}
const Paikkakunta = (props) => {
  const { setPaikkakunta } = props;
  return <label className="u-label u-text-grey-30 u-label-1">{props.disable ? "" : "Paikkakunta"}
    <input maxlength="45" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" type="text" disabled={props.disable} style={props.proftyyli} value={props.paikkakunta} onChange={(e) => setPaikkakunta(e.target.value)}></input>
  </label>;
}
const Esittely = (props) => {
  const { setEsittely } = props;
  return <label className="u-label u-text-grey-30 u-label-1">{props.disable ? "" : "Esittely"}
    <br /><textarea maxlength="500" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" type="text" disabled={props.disable} style={props.proftyyli} value={props.esittely} onChange={(e) => setEsittely(e.target.value)}></textarea>
  </label>;
}
const Email = (props) => {
  const { setEmail } = props;
  return <label className="u-label u-text-grey-30 u-label-1">{props.disable ? "" : "Email"}
    <input maxlength="45" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5" type="text" disabled={props.disable} style={props.proftyyli} value={props.email} onChange={(e) => setEmail(e.target.value)}></input>
  </label>;
}

const Kuva = (props) => {
  const [esikatselu, setEsikatselu] = useState("");
  const { setKuva } = props;

  //haetaan data kansiosta
  const onChange = (e) => {
    const [esikatselu] = e.target.files;
    setEsikatselu(URL.createObjectURL(esikatselu));
    setKuva(e.target.files);
  }
  //input 'file' aukaisee kansionäkymän, jos uutta kuvaa ei ole valittu näytetään tietokannasta haettu
  return <label> <br />
    <img style={{ maxWidth: '150px', maxHeight: '150px', resizeMode: 'center' }} src={ !esikatselu ? `/uploads/${props.kuvaosoite}`: esikatselu} alt="Profiilikuva" />
    <br></br>
    <input type="file" name="file" accept='image/*' onChange={(e) => onChange(e)}></input>
  </label>;
}



export default Profiili;