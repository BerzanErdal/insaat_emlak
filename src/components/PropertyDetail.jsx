import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import './PropertyDetail.css';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const docRef = doc(db, 'properties', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProperty({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    } catch (error) {
      console.error('İlan yüklenirken hata:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (!property) return <div className="not-found">İlan bulunamadı</div>;

  return (
    <div className="property-detail">
      <div className="image-gallery">
        <img 
          src={property.images?.[currentImage] || '/placeholder.jpg'} 
          alt={property.title}
          className="main-image"
        />
        {property.images && property.images.length > 1 && (
          <div className="thumbnail-list">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${property.title} ${index + 1}`}
                className={currentImage === index ? 'active' : ''}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="property-details-content">
        <h1>{property.title}</h1>
        <p className="location">📍 {property.city}</p>
        <p className="price">{property.price.toLocaleString('tr-TR')} ₺</p>
        
        <div className="specs">
          <div className="spec-item">
            <span className="spec-label">Oda Sayısı:</span>
            <span>{property.rooms}+1</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Alan:</span>
            <span>{property.area} m²</span>
          </div>
        </div>

        <div className="description">
          <h2>Açıklama</h2>
          <p>{property.description}</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
