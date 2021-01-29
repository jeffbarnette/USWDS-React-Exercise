import React from 'react'
import PropTypes from 'prop-types'


function NavItem({ pathname, tabTitle, href }) {
  return (
    <li className="usa-nav__primary-item">
      <a
        href={href}
        key={tabTitle}
        id={tabTitle.toLowerCase()}
        className={`usa-nav__link ${
          pathname.includes(href) ? 'usa-current' : ''
        }`}
      >
        <span>{tabTitle}</span>
      </a>
    </li>
  )
}

NavItem.propTypes = {
  pathname: PropTypes.string.isRequired,
  tabTitle: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default NavItem
