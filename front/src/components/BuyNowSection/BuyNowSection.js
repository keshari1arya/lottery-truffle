import React from 'react';
import PropTypes from 'prop-types';
import './BuyNowSection.css';

const BuyNowSection = () => (
  <section class="cta section">
    <div class="container-sm">
      <div class="cta-inner section-inner">
        <div class="cta-header text-center">
          <h2 class="section-title mt-0">Get it and Switch</h2>
          <p class="section-paragraph">Lorem ipsum is common placeholder text used to demonstrate the graphic
            elements of a document or visual presentation.</p>
          <div class="cta-cta">
            <a class="button button-primary" href="#">Buy it now</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

BuyNowSection.propTypes = {};

BuyNowSection.defaultProps = {};

export default BuyNowSection;
