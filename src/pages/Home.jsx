import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Özdemir İnşaat</h1>
          <p>Hayalinizdeki eve bir adım daha yakınsınız</p>
          <Link to="/properties" className="cta-button">
            <span>İlanları İncele</span>
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Neden Biz?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">🏠</div>
              <h3>Geniş Portföy</h3>
              <p>Birçok farklı lokasyonda çeşitli daire seçenekleri</p>
            </div>
            <div className="feature-card">
              <div className="icon">✅</div>
              <h3>Güvenilir</h3>
              <p>Yılların deneyimi ve müşteri memnuniyeti</p>
            </div>
            <div className="feature-card">
              <div className="icon">💰</div>
              <h3>Uygun Fiyat</h3>
              <p>Bütçenize uygun en iyi seçenekler</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
