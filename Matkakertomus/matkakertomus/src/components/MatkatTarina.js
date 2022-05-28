import React from "react";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import Modal from 'react-modal';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { UserContext } from "../UserContext";


const MatkatTarina = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { loginContext, setLoginContext, loginContextId, setLoginContextId, loginContextKuva, setLoginContextKuva } = useContext(UserContext);

  const [tarinat, setTarinat] = useState([]);
  const [tarinanTiedot, setTarinanTiedot] = useState([]);
  const [otsikko2, setOtsikko2] = useState([]);
  const [kuvat, setKuvat] = useState([]);
  const [kertomus, setkertomus] = useState("");
  const [tarinanMatka, setTarinanMatka] = useState("");
  const [Tarinanpvm, settarinanpvm] = useState();
  const [matkakohde, setMatkaKohde] = useState();
  const [idtarina, setidtarina] = useState("");
  const [muokkaa, setMuokkaa] = useState(false);
  const [matkat, setMatkat] = useState([]);
  const [matkakohteet, setMatkakohteet] = useState([]);
  const [modalmatka, setmodalmatka] = useState(false)
  const [alkupvm, setAlkupvm] = useState("");
  const [loppupvm, setLoppupvm] = useState("");
  const [yksityinen, setYksityinen] = useState("off");
  const [MatkanNimi, setMatkanNimi] = useState("");
  const [idmatka, setIdmatka] = useState("");
  const [matkanTiedot, setMatkanTiedot] = useState([]);
  const [file, setFile] = useState();
  const [esikatselu, setEsikatselu] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const tulos = location.pathname.split('/')
  let id = tulos[2];


  const images = [
    {
      original: '/uploads/matkakertomus_empty.jpg',
      thumbnail: '/uploads/matkakertomus_empty.jpg',
    }
  ];

  console.log("TÄÄLLÄ: ", images)


  Modal.setAppElement('#root');
  useEffect(() => {
    axios.get("http://localhost:3004/api/matkattarinalle" +`/${loginContextId}`).then((response) => {
      setMatkat(response.data);
      //Tämä hakee aiemmin tehdyt matkat 
    })
  }, [])
  useEffect(() => {
    axios.get("http://localhost:3004/api/matkakohteet").then((response) => {
      setMatkakohteet(response.data);
      // tämä UseEffect hakee kaikki taulussa olevat matkakohteet ID sekä nimi
    })
  }, [])
  useEffect(() => {
    //TODO tänne tarvii id:n

    axios.get("http://localhost:3004/api/matkat/" + id).then((response) => {
      setTarinat(response.data)
    });

  }, []);

  useEffect(() => {
    axios.get("http://localhost:3004/api/matkat/otsikko/" + id).then((response) => {
      setOtsikko2(response.data)
    });

  }, []);

  useEffect(() => {

    axios.get("http://localhost:3004/api/matkat/kuvat/" + id).then((response) => {
      setKuvat(response.data)
    });


  }, []);
  useEffect(() => {
    axios.get("http://localhost:3004" + `/getmatka/${id}`, {
      //tästä kohtaa puuttuu idmatka
    })
      .then(function (response) {
        setMatkanTiedot(response.data);

        response.data.map((val) => {

          setAlkupvm(val.alkupvm);
          setLoppupvm(val.loppupvm)
          setMatkanNimi(val.nimi)
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
  useEffect(() => {
    axios.get("http://localhost:3004" + `/gettarina/${idtarina}`, {

    })
      .then(function (response) {
        setTarinanTiedot(response.data);


        response.data.map((val) => {

          settarinanpvm(val.pvm);
          setMatkaKohde(val.idmatkakohde)
          setkertomus(val.teksti)
          setTarinanMatka(val.idmatka)
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [idtarina]);
  const options = matkat.map((item) =>
    <option key={item.idmatka} value={item.idmatka}>{item.luomispvm} | {item.nimi}</option>
  );
  const options2 = matkakohteet.map((item) =>
    <option key={item.idmatkakohde} value={item.idmatkakohde}>{item.maa}, {item.paikkakunta}: {item.kohdenimi}</option>
  );
  const PoistaMatkaClicked = (props) => {
    setIdmatka(props);
    console.log(id, "tässä on matkaid");
    if (window.confirm("Haluatko varmasti poistaa valitsemasi matkan?")) {
      axios.delete("http://localhost:3004" + `/api/deletematka/${id}`,).then((response) => {
      })
      alert("Poistit matkan onnistuneesti!")
      navigate("/matkat");
    }
  }
  const MuokkaaMatkaClicked = (props) => {
    setmodalmatka(true)
    setMuokkaa(true);
    //console.log(" estetty oli ", disable);
    setIdmatka(props);

  }
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
      axios.put("http://localhost:3004" + `/UpdateMatka/${id}`, { nimi: MatkanNimi, alkupvm: alkupvm, loppupvm: loppupvm, yksityinen: yksityinen }).then((response) => {

        setMatkanNimi("");
        setAlkupvm("");
        setLoppupvm("");
        setIdmatka("");
        
        setmodalmatka(false);
        window.location.reload(false);
      })
    }


  }
  const HandleCancel = () => {
    setmodalmatka(false);
  }
  let subtitle;
  const [modal, setOpenmodal] = useState(false);
  function afterOpenModal() {
  }
  const MuokkaaClicked = (props) => {
    setOpenmodal(true)
    setMuokkaa(true);
    //console.log(" estetty oli ", disable);
    setidtarina(props);

  }
  const MuokkaaTarina = () => {

    const formData = new FormData();

    formData.append("pvm", Tarinanpvm);
    formData.append("teksti", kertomus);
    formData.append("idmatkakohde", matkakohde);
    formData.append("idmatka", tarinanMatka);

    if (file != undefined) {
      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i]);

        console.log(formData.get('file'));
      }
    }
    axios.put("http://localhost:3004" + `/Updatetarina/${idtarina}`, formData).then((response) => {

      setMatkaKohde(0);
      settarinanpvm("");
      setTarinanMatka(0);
      setkertomus("");

      setOpenmodal(false);
      window.location.reload(false);
    })
  }
  const PoistaTarinaClicked = (props) => {
    setidtarina(props);
    console.log(idtarina, "tässä on tarinaid");
    if (window.confirm("Haluatko varmasti poistaa valitsemasi tarinan?")) {
      axios.delete("http://localhost:3004" + `/api/deletetarina/${props}`,).then((response) => {

      })
      alert("Poistit tarinasi onnistuneesti!")
      setidtarina("");
      navigate("/matkat");

    }
  }



  const HandleCanceltarina = () => {
    setOpenmodal(false);
  }
  const otsikko = otsikko2.map((matka) => (

    <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
      <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
        <div className="u-layout">
          <div className="u-layout-row">
            <div className="u-container-style u-layout-cell u-right-cell u-size-60 u-size-xs-60 u-layout-cell-1">
              <div className="u-border-2 u-border-palette-5-light-3 u-container-layout u-container-layout-1">
                <NavLink to="/matkat"><a className="u-border-none u-btn u-button-style u-palette-2-base u-text-white u-btn-1">TAKAISIN</a></NavLink>{/*<span className="u-file-icon u-icon u-text-white"><img src={image_arrow} alt=""/><NavLink to="/matkat">TAKAISIN</NavLink></span></a>*/}
                <p className="u-align-center u-text u-text-1">Päivämäärä: {matka.alkupvm} - {matka.loppupvm}</p>
                <p className="u-align-center u-text u-text-2">{matka.etunimi} {matka.sukunimi} - {matka.nimimerkki}</p>
                <div>
                  {(() => {
                    if (loginContextId == matka.idmatkaaja) {
                      return (
                        <div>

                          <a className="u-border-none u-btn u-button-style u-palette-2-base u-text-white u-btn-2" onClick={() => MuokkaaMatkaClicked(matka.idmatka)}>MUOKKAA MATKAA</a>
                          <a style={{ marginTop: '7px', padding: '12px 38px' }} className="u-border-none u-btn u-button-style u-palette-2-base u-text-white u-btn-2" onClick={() => PoistaMatkaClicked(matka.idmatka)}>POISTA MATKA</a>
                          <a style={{ marginTop: '7px', padding: '12px 43px' }} className="u-border-none u-btn u-button-style u-palette-2-base u-text-white u-btn-2"><NavLink to="/matkat/add">LISÄÄ TARINA</NavLink></a>

                        </div>
                      )
                    } else {
                      return (
                        <div></div>
                      )
                    }
                  })()}
                </div>
                <h2 className="u-align-left u-text u-text-default u-text-palette-5-dark-3 u-text-3">{matka.nimi}</h2>




              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const taulukko = []
  const kuva1 = kuvat.map((kuva) => {
    taulukko.push({
      key: kuva.idtarina,
      original: `/uploads/${kuva.kuva}`,
      thumbnail: `/uploads/${kuva.kuva}`
    })
  });



  const GotoPicture = (e) => { // kuvan lisäys
    const [esikatselu] = e.target.files;
    setEsikatselu(URL.createObjectURL(esikatselu));
    setFile(e.target.files);

  };

  //TODO custom poista nappi kuvalle
  const _renderCustomControls = () => {
    //onClick={this._customAction.bind(this)}
    return <a href='add.png' className='image-gallery-custom-action' />
  }

  const tarina = tarinat.map((tarina) => {

    //mapataan kuvat oikeaan idtarinaan
    let kuvat = [];
    for (let i = 0; i < taulukko.length; i++) {
      if (taulukko[i].key == tarina.idtarina) {
        kuvat.push(
          taulukko[i]
        )
      }
    }

    return <section className="zebra u-clearfix u-section-6">
      <div className="u-clearfix u-sheet u-sheet-1">
        <div className="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div className="u-layout">
            <div className="u-layout-row">
              <div className="u-container-style u-layout-cell u-left-cell u-size-30 u-size-xs-60 u-layout-cell-1">
                <div className="u-container-layout u-container-layout-1">
                  <h2 className="u-align-center u-text u-text-default u-text-1">{tarina.maa}, {tarina.kohdenimi}</h2>
                  <p className="u-align-left u-text u-text-2" style={{ textAlign: 'left' }}>{tarina.paikkakunta}</p>
                  <p className="u-align-left u-text u-text-3" style={{ minHeight: '200px' }}>{tarina.teksti}</p>
                  <p className="u-align-left u-text u-text-4"> Julkaistu: {tarina.pvm}</p>
                  <div>
                    {(() => {
                      if (loginContextId == tarina.idmatkaaja) {
                        return (
                          <div>
                            <a className="nappi" onClick={() => MuokkaaClicked(tarina.idtarina)}>MUOKKAA</a>
                            <a className="nappi-poista" onClick={() => PoistaTarinaClicked(tarina.idtarina)}>X</a>


                          </div>
                        )
                      } else {
                        return (
                          <div></div>
                        )
                      }
                    })()}
                  </div>

                </div>
              </div>

              <div className="u-align-center u-container-style u-image u-right-cell u-size-30 u-size-xs-60 u-image-1">
              {/*<div class="u-align-center u-container-style u-image u-layout-cell u-right-cell u-size-30 u-size-xs-60 u-image-1" src="" data-image-width="1280" data-image-height="820">
                <div class="u-container-layout u-valign-middle u-container-layout-2" src=""></div>
                  </div>*/}
                <div style={{ marginTop: '15px' }}><ImageGallery showThumbnails={true} showPlayButton={true} showNav={false} items={kuvat.length <= 0 ?  images : kuvat} renderCustomControls={_renderCustomControls} /></div>
                <div className="u-container-layout u-valign-middle u-container-layout-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  });
  //console.log(tarina)
  return (
    <div>
      <section className="u-align-center u-clearfix u-section-5">
        {otsikko}
      </section>
      {(() => {
        if (tarina.length == 0) {
          return (
            <div>

              <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                  <div className="u-layout">
                    <div className="u-layout-row">
                      <div style={{ marginBottom: 600, marginTop: 50 }} className="u-container-style u-layout-cell u-right-cell u-size-60 u-size-xs-60 u-layout-cell-1">

                        <NavLink to="/matkat"><a className="u-border-none u-btn u-button-style u-palette-2-base u-text-white u-btn-1">TAKAISIN</a></NavLink>{/*<span className="u-file-icon u-icon u-text-white"><img src={image_arrow} alt=""/><NavLink to="/matkat">TAKAISIN</NavLink></span></a>*/}

                        <h2 className="u-align-left u-text u-text-default u-text-palette-5-dark-3 u-text-3">Tälle matkalle ei ole lisätty tarinaa</h2>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )
        } else {
          return (
            tarina
          )
        }
      })()}
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
            margin: '-80px 606px',
            height: '745px'
          }
        }}
        isOpen={modal}
        onAfterOpen={afterOpenModal}
        contentLabel="Example Modal">
        <h2 className="u-text u-text-default u-text-1" ref={(_subtitle) => (subtitle = _subtitle)}>MUOKKAA TARINAA</h2>
        <div></div>
        <form >
          <div className="u-form-group u-form-select u-form-group-5">
            <label className="u-label">Valitse matka</label>
            <div className="u-form-select-wrapper">
              <select style={{marginBottom: '7px'}} value={tarinanMatka} onChange={(e) => setTarinanMatka(e.target.value)} name="select" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-3">
                <option value="0">Valitse...</option>
                {options}
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" version="1" className="u-caret"><path fill="currentColor" d="M4 8L0 4h8z"></path></svg>
            </div>
          </div>
          <div className="u-form-group u-form-group-6">
            <label className="u-label">Matkakohde</label>
            <select style={{marginBottom: '7px'}} onChange={(e) => setMatkaKohde(e.target.value)} value={matkakohde} name="select" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-3">
              <option value="0">Valitse...</option>
              {options2}
            </select>              </div>

          <div className="u-form-group u-form-group-6">
            <label className="u-label">Ajankohta</label>
            <input style={{marginBottom: '7px'}} onChange={(e) => settarinanpvm(e.target.value)} value={Tarinanpvm} type="date" name="date-1" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white" required="" />
          </div>
          <div className="u-form-group u-form-message">
            <label className="u-label">Tarina</label>
            <textarea style={{ height: '173px', resize: 'none' }} placeholder="Kirjoita tarinasi.." rows="4" value={kertomus} cols="50" onChange={(e) => setkertomus(e.target.value)} id="message-9c56" name="message" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-7" required="" maxLength="500"></textarea>
            <p style={{ fontSize: "12px", marginLeft: "2px", marginTop: "3px", opacity: "0.7" }}>Merkkejä jäljellä: {500 - kertomus.length} </p>
          </div>


        </form >

        <form action="#">
          <label style={{marginTop: '10px', marginTop: '5px'}} className="u-label">Lisää kuvia</label>
        <input style={{marginBottom: '20px',marginTop: '5px', marginLeft: '-30px'}} multiple onChange={GotoPicture} type="file" accept="image/*" className="u-border-palette-2-base u-btn u-btn-round u-button-style u-hover-palette-2-base u-none u-radius-5 u-text-hover-white u-text-palette-2-base u-btn-3"></input>
        </form>

        <input type="button" style={{ width: '100%' }} value={muokkaa == true ? "TALLENNA" : "MUOKKAA"} onClick={() => MuokkaaTarina()} class={muokkaa == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>
        <input type="button" style={{ width: '100%', marginTop: '-10px', marginBottom: '0px' }} value="POISTU TALLENTAMATTA" onClick={() => HandleCanceltarina()} class={muokkaa == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>

      </Modal>
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
            margin: '-80px 606px',
            height: '500px'
          }
        }}
        isOpen={modalmatka}
        onAfterOpen={afterOpenModal}
        contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>MUOKKAA MATKAA</h2>
        <div></div>
        <form >
          <div className="u-form-group u-form-group-6">
            <label htmlFor="text-83ce" className="u-label">Matkan otsikko</label>
            <input style={{ marginBottom: '10px', marginTop: '5px' }} type="text" value={MatkanNimi} onChange={(e) => setMatkanNimi(e.target.value)} id="text-83ce" name="text" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white u-input-4" maxLength="45" />
          </div>
          <div className="u-form-date u-form-group u-form-group-1">
            <label htmlFor="date-b464" className="u-label">Alkupäivämäärä</label>
            <input style={{ marginBottom: '10px', marginTop: '5px' }} type="date" value={alkupvm} onChange={(e) => setAlkupvm(e.target.value)} id="date-b464" name="date" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white" required="" />
          </div>
          <div className="u-form-date u-form-group u-form-group-2">
            <label htmlFor="date-4d96" className="u-label">Loppumispäivämäärä</label>
            <input style={{ marginBottom: '20px', marginTop: '5px' }} type="date" value={loppupvm} onChange={(e) => setLoppupvm(e.target.value)} id="date-4d96" name="date-1" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-radius-5 u-white" required="" />
          </div>
          <div className="u-form-checkbox u-form-group u-form-group-3">
            <input type="checkbox" onChange={(e) => setYksityinen(e.target.value)} id="checkbox-fca3" name="checkbox" />
            <label htmlFor="checkbox-fca3" className="u-label"> Yksityinen matka<br />
            </label>
          </div>
        </form >

        <input type="button" style={{ width: '100%' }} value={muokkaa == true ? "TALLENNA MUUTOKSET" : "MUOKKAA"} onClick={() => Muokkaamatka()} class={muokkaa == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>
        <input type="button" style={{ width: '100%', marginTop: '-10px', marginBottom: '0px' }} value="PERUUTA" onClick={() => HandleCancel()} class={muokkaa == true ? "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1 omamargin" : "u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-5 u-btn-1"}></input>

      </Modal>
    </div>

  );
}

export default MatkatTarina;