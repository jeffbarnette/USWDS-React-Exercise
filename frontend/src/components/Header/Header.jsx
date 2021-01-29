import React from 'react'
import { useSelector } from 'react-redux'

import closeIcon from 'uswds/dist/img/close.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import NavItem from '../NavItem/NavItem'


function HeaderComp() {
  const pathname = useSelector((state) => state.router.location.pathname)

  return (
    <>
      <div className="usa-overlay" />
      <header className="usa-header usa-header--extended">
        <div className="usa-navbar">
          <div className="usa-logo" id="extended-logo">
            <em className="usa-logo__text">
              <a href="/" title="Home" aria-label="Home">
                TANF Data Portal
              </a>
            </em>
          </div>
          <button type="button" className="usa-menu-btn">
            Menu
          </button>
        </div>
        <nav aria-label="Primary navigation" className="usa-nav">
          <div className="usa-nav__inner">
            <button type="button" className="usa-nav__close">
              <img src={closeIcon} alt="close" />
            </button>
            <ul className="usa-nav__primary usa-accordion">
              <NavItem pathname={pathname} tabTitle="Welcome" href="/" />
            </ul>
            <div className="usa-nav__secondary">
              <ul className="usa-nav__secondary-links">
                <li
                  className={`display-block usa-nav__secondary-item`}
                >
                  <a href="/">
                    <FontAwesomeIcon
                      className="margin-right-1"
                      icon={faUserCircle}
                    />
                    user@testsite.com
                  </a>
                </li>
                <li className="usa-nav__secondary-item">
                  <a className="sign-out-link" href="/">
                    <FontAwesomeIcon
                      className="margin-right-1"
                      icon={faSignOutAlt}
                    />
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default HeaderComp
