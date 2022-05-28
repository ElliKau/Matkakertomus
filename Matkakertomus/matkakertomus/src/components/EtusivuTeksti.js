import React from "react";
import image_user from '../user.png';
import image_add from '../add.png';
import image_compass from '../compass.png';

const EtusivuTeksti = () => {
    return (
      <section className="u-align-center u-clearfix u-section-2">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-expanded-width u-list u-list-1">
            <div className="u-repeater u-repeater-1">
              <div className="u-align-center u-border-2 u-border-palette-5-light-3 u-container-style u-list-item u-repeater-item u-white u-list-item-1">
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1"><span className="u-file-icon u-icon u-text-palette-2-base u-icon-1"><img src={image_compass} alt=""/></span>
                  <h3 className="u-text u-text-1">Seikkaile</h3>
                  <p className="u-text u-text-2">Lue käyttäjiemme uskomattomia matkatarinoita ympäri maailmaa. Ihastu mitä uskomattomiin kuviin!</p>
                </div>
              </div>
              <div className="u-align-center u-border-2 u-border-palette-5-light-3 u-container-style u-list-item u-repeater-item u-white u-list-item-2">
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2"><span className="u-file-icon u-icon u-icon-rectangle u-text-palette-2-base u-icon-2"><img src={image_add} alt=""/></span>
                  <h3 className="u-text u-text-3">Jaa tarinasi</h3>
                  <p className="u-text u-text-4">Luo oma matkasi ja jaa tarinasi muille! Voit myös luoda omia yksityisiä matkoja.</p>
                </div>
              </div>
              <div className="u-align-center u-border-2 u-border-palette-5-light-3 u-container-style u-list-item u-repeater-item u-white u-list-item-3">
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3"><span className="u-file-icon u-icon u-text-palette-2-base u-icon-3"><img src={image_user} alt=""/></span>
                  <h3 className="u-text u-text-5">Rekisteröidy</h3>
                  <p className="u-text u-text-6">Liity mukaan seikkailuun ja rekisteröidy jo tänään. Tilin luominen on ilmaista!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default EtusivuTeksti;