import React from "react";
import logo from '../matkakertomus_logo.png';

const Footer = () => {
    return (
      <footer className="u-clearfix u-footer u-palette-5-dark-3"><div className="u-clearfix u-sheet u-sheet-1">
        <div className="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
          <div className="u-gutter-0 u-layout">
            <div className="u-layout-row">
              <div className="u-align-center-sm u-align-center-xs u-align-left-md u-align-left-xl u-container-style u-layout-cell u-left-cell u-size-20 u-size-20-md u-layout-cell-1">
                <div className="u-container-layout u-valign-middle u-container-layout-1">
                  <div data-position="" className="u-position">
                    <div className="u-block">
                      <div className="u-block-container u-clearfix">
                        <h5 className="u-block-header u-text">Tietoa</h5>
                        <div className="u-block-content u-text u-text-2">Sivullamme voit luoda sekä lukea muiden käyttäjien tehtyjä tarinoita matkoistaan.<br></br> Sivu on tehty 2022 Ohjelmistoprojektikurssille Savonian AMK:ssa. </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="u-align-center-sm u-align-right-md u-container-style u-layout-cell u-size-20 u-size-20-md u-layout-cell-2">
                <div className="u-container-layout u-valign-middle u-container-layout-2">
                  <a className="u-image u-logo u-image-1" data-image-width="248" data-image-height="81">
                    <img src={logo} className="u-logo-image u-logo-image-1"/>
                  </a>
                </div>
              </div>
              <div className="u-align-center-sm u-align-center-xs u-align-left-md u-align-right-lg u-align-right-xl u-container-style u-layout-cell u-right-cell u-size-20 u-size-20-md u-layout-cell-3">
                <div className="u-container-layout u-valign-middle u-container-layout-3">
                  <div className="u-social-icons u-spacing-10 u-social-icons-1">
                    <a className="u-social-url" title="facebook" target="_blank"><span className="u-icon u-social-facebook u-social-icon u-icon-1"></span>
                    </a>
                    <a className="u-social-url" title="twitter" target="_blank"><span className="u-icon u-social-icon u-social-twitter u-icon-2"></span>
                    </a>
                    <a className="u-social-url" title="instagram" target="_blank"><span className="u-icon u-social-icon u-social-instagram u-icon-3"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </footer>
    );
  }

export default Footer;