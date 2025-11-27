import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/ozdemir_insaat_favicon.png" alt="Özdemir İnşaat Logo" className="logo-icon" />
          <h1>Özdemir İnşaat</h1>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Ana Sayfa</Link></li>
          <li><Link to="/properties">İlanlar</Link></li>
          <li><Link to="/services">Hizmetler</Link></li>
          <li><Link to="/contact">İletişim</Link></li>
          <li><Link to="/admin" className="admin-link">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
