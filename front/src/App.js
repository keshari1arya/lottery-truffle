import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BuyNowSection from './components/BuyNowSection/BuyNowSection';

function App() {
  return (
    <div>
      <Header />
      <section class="hero">
        <div class="container">
          <div class="hero-inner">
            <div class="hero-copy">
              <h1 class="hero-title mt-0">
                changed content
              </h1>
              <p class="hero-paragraph">Our landing page template works on all devices, so you only have to set it up
                once, and get beautiful results forever.</p>
              <div class="hero-cta">
                <a class="button button-primary" href="#">Buy it now</a>
                <div class="lights-toggle">
                  <input id="lights-toggle" type="checkbox" name="lights-toggle" class="switch" checked="checked" />
                  <label for="lights-toggle" class="text-xs"><span>Turn me <span
                    class="label-text">dark</span></span></label>
                </div>
              </div>
            </div>
            <div class="hero-media">
              <div class="header-illustration">
                <img class="header-illustration-image asset-light" src="dist/images/header-illustration-light.svg"
                  alt="Header illustration" />
                <img class="header-illustration-image asset-dark" src="dist/images/header-illustration-dark.svg"
                  alt="Header illustration" />
              </div>
              <div class="hero-media-illustration">
                <img class="hero-media-illustration-image asset-light"
                  src="dist/images/hero-media-illustration-light.svg" alt="Hero media illustration" />
                <img class="hero-media-illustration-image asset-dark" src="dist/images/hero-media-illustration-dark.svg"
                  alt="Hero media illustration" />
              </div>
              <div class="hero-media-container">
                <img class="hero-media-image asset-light" src="dist/images/hero-media-light.svg" alt="Hero media" />
                <img class="hero-media-image asset-dark" src="dist/images/hero-media-dark.svg" alt="Hero media" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <BuyNowSection />
      <Footer />
    </div>
  );
}


export default App;
