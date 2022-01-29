import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header-inner">
          <div className="brand header-brand">
            <h1 className="m-0">
              <a href="#">
                <img className="header-logo-image asset-light" src="dist/images/logo-light.svg" alt="Logo" />
                <img className="header-logo-image asset-dark" src="dist/images/logo-dark.svg" alt="Logo" />
              </a>
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
