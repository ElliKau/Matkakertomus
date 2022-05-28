import React from "react";

const EtusivuVideo = () => {
    return (
      <section className="u-clearfix u-palette-5-dark-3 u-section-11" id="sec-c312">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-align-left u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-1">
                  <div className="u-container-layout u-container-layout-1">
                    <div className="u-align-left u-expanded u-video u-video-contain">
                      <div className="embed-responsive embed-responsive-1">
                        <iframe style={{position: 'absolute', top: '0', left: '0',width: '100%', height: '100%'}} className="embed-responsive-item" src="https://www.youtube.com/embed/qghnGpkzkl4?mute=0&amp;showinfo=0&amp;controls=0&amp;start=0" frameBorder="0" allowFullScreen=""></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="u-align-left u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                  <div className="u-container-layout u-container-layout-2">
                    <div className="u-align-left u-expanded u-video u-video-contain">
                      <div className="embed-responsive embed-responsive-2">
                        <iframe style={{position: 'absolute', top: '0', left: '0',width: '100%', height: '100%'}} className="embed-responsive-item" src="https://www.youtube.com/embed/L5JORXmV_A0?mute=0&amp;showinfo=0&amp;controls=0&amp;start=0" frameBorder="0" allowFullScreen=""></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default EtusivuVideo;