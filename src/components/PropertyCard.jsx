import { Link } from 'react-router-dom';
import './PropertyCard.css';

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img src={property.images?.[0] || '/placeholder.jpg'} alt={property.title} />
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="location">📍 {property.city}</p>
        <p className="price">{property.price.toLocaleString('tr-TR')} ₺</p>
        <div className="property-details">
          <span>🛏️ {property.rooms} Oda</span>
          <span>📐 {property.area} m²</span>
        </div>
        <Link to={`/property/${property.id}`} className="view-btn">
          Detayları Gör
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
