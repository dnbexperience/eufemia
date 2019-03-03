import React from 'react'
import './reset.css'
import './dnb.css'

const LegacyMenu = () => {
  return (
    <div id="menuLoggedIn" style={{ cursor: 'pointer' }}>
      <ul>
        <li style={{ cursor: 'pointer' }}>
          <a href="/" aria-controls="gomitc4r">
            Konto
          </a>
          <div
            className="menuSection"
            id="gomitc4r"
            style={{ left: ' 0px', right: '-50px' }}
          >
            <span
              className="parentArrowPointer"
              style={{ marginLeft: '597px' }}
            >
              &nbsp;
            </span>
            <div>
              <div className="mainMenuContentWrapperTop">
                <div className="mainMenuContentWrapperBottom clearfix">
                  <dl className="firstColumn">
                    <dt>
                      <a id="gomitcgz" href="/" title="Kontoinformasjon">
                        Kontoinformasjon
                      </a>
                    </dt>
                    <dd>
                      <a
                        id="gomitch9"
                        href="/"
                        title="Ny kontoinformasjon"
                      >
                        Ny kontoinformasjon
                      </a>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default LegacyMenu
