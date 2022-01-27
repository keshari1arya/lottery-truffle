import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

function Header() {
  return (
    <header class="site-header">
      <div class="container">
        <div class="site-header-inner">
          <div class="brand header-brand">
            <h1 class="m-0">
              <a href="#">
                <img class="header-logo-image asset-light" src="dist/images/logo-light.svg" alt="Logo" />
                <img class="header-logo-image asset-dark" src="dist/images/logo-dark.svg" alt="Logo" />
              </a>
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
};

// Header.propTypes = {};

// Header.defaultProps = {};

export default Header;
