import birdMon from "../../assets/images/birdmon.png";
import "./Footer.scss";

function Footer() {
  return (
    <header className="footer">
      <div className="footer__logo">
        <img src={birdMon} alt="logo" className="footer__logo-image" />
      </div>
      <div className="footer__title">
        <h1>Poke-Mechs</h1>
      </div>
    </header>
  );
}

export default Footer;
