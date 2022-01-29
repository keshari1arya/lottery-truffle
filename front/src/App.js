import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import Lottery from "./contracts/Lottery.json"
import { ethers } from 'ethers';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BuyNowSection from './components/BuyNowSection/BuyNowSection';
import LotteryService from "./services/service";

function App() {
  const lotteryAddress = "0xB27daA9623FE17AfF846fDD74afaC820B6b65Ab4";
  const [currentAccount, setCurrentAccount] = useState(null);
  const [buttonText, setButtonText] = useState("Connect Wallet");
  const [banalce, setBalance] = useState(0);
  const eth = window.ethereum;

  const checkAccountConnected = () => {
    if (eth) {
      setButtonText("Buy a Ticket");
    }
  }

  const connectWalletHandler = () => {
    if (eth) {
      try {
        const accounts = eth.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        setButtonText("Buy a Ticket");
      } catch (error) {
        console.error(error);
      }
    }
  }

  const getBalance = async () => {
    setBalance(await LotteryService.getBalance());
  }

  const purchaseTicket = async () => {
    if (currentAccount) {
      setButtonText("Purchase Ticket");
    } else {
      try {
        connectWalletHandler();
        var transaction = LotteryService.purchaseTicket()
        getBalance();
        console.log(transaction);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const spinTheWheel = async () => {
    if (currentAccount) {
      setButtonText("Spin the Wheel");
    } else {
      try {
        connectWalletHandler();
        LotteryService.spinTheWheel();
        getBalance();
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    checkAccountConnected();
    getBalance();
  })

  return (
    <div>
      <Header />
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1 className="hero-title mt-0">
                Fight for Hunger
              </h1>
              <p className="hero-paragraph">
                Balance: {banalce} Wei
              </p>
              <div className="hero-cta">
                <a className="button button-primary" href="#" onClick={purchaseTicket}>
                  {buttonText}
                </a>
                <a className="button button-primary" href="#" onClick={spinTheWheel}>
                  Spin the Wheel
                </a>
                <div className="lights-toggle">
                  <input id="lights-toggle" type="checkbox" name="lights-toggle" className="switch" checked="checked" />
                  <label for="lights-toggle" className="text-xs"><span>Turn me <span
                    className="label-text">dark</span></span></label>
                </div>
              </div>
            </div>
            <div className="hero-media">
              <div className="header-illustration">
                <img className="header-illustration-image asset-light" src="dist/images/header-illustration-light.svg"
                  alt="Header illustration" />
                <img className="header-illustration-image asset-dark" src="dist/images/header-illustration-dark.svg"
                  alt="Header illustration" />
              </div>
              <div className="hero-media-illustration">
                <img className="hero-media-illustration-image asset-light"
                  src="dist/images/hero-media-illustration-light.svg" alt="Hero media illustration" />
                <img className="hero-media-illustration-image asset-dark" src="dist/images/hero-media-illustration-dark.svg"
                  alt="Hero media illustration" />
              </div>
              <div className="hero-media-container">
                <img className="hero-media-image asset-light" src="dist/images/hero-media-light.svg" alt="Hero media" />
                <img className="hero-media-image asset-dark" src="dist/images/hero-media-dark.svg" alt="Hero media" />
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
