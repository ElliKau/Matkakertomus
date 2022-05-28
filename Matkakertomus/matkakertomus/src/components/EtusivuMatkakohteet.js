import React from "react";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import { useEffect, useState } from "react";

const EtusivuMatkakohteet = () => {

  const [matkakohteet, setMatkakohteet] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3004/api/matkakohteet/tiedot").then((response) => {
      setMatkakohteet(response.data)
    });
  }, []);

  const taulukko = []
  const kuva1 = matkakohteet.map((matkakohde) => {
    console.log("kuvat", matkakohde);
    taulukko.push({
      original: `/uploads/${matkakohde.kuva}`,
      thumbnail: `/uploads/${matkakohde.kuva}`,
      description: `${matkakohde.maa}, ${matkakohde.paikkakunta} - ${matkakohde.kohdenimi}: ${matkakohde.kuvausteksti}`
    }
    )
  });

    return (
      <section style={{backgroundColor: '#292d33', width:'100%'}} className="u-align-center u-clearfix u-section-2">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <h1 style={{fontFamily: 'Roboto,sans-serif', fontSize: 'xxx-large', marginTop: '55px', marginBottom: '-5px'}}>Käyttäjiemme lisäämiä matkakohteita</h1>
          <h8 style={{color: 'white', marginTop: '5px'}}>Alta näet käyttäjiemme lisäämiä upeita matkakohteita.</h8>
          <div className="u-expanded-width u-list u-list-1">

            <ImageGallery showThumbnails={true} showPlayButton={false} showNav={true} autoPlay={true} items={taulukko} />

          </div>
        </div>
      </section>
    );
  }

  export default EtusivuMatkakohteet;