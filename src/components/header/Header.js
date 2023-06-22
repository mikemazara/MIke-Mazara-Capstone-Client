import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <h1>Poke-Mechs</h1>
      </div>
      <div className="header__search">
        <input type="select" placeholder="Search" />
      </div>
    </header>
  );
};

export default Header;
