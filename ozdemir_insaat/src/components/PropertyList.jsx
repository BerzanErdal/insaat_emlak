import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import PropertyCard from './PropertyCard';
import FilterBar from './FilterBar';
import './PropertyList.css';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propertiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertiesData);
      setFilteredProperties(propertiesData);
      setLoading(false);
    } catch (error) {
      console.error('İlanlar yüklenirken hata:', error);
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    let filtered = [...properties];

    if (filters.city) {
      filtered = filtered.filter(p => p.city === filters.city);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
    }

    if (filters.rooms) {
      filtered = filtered.filter(p => p.rooms === Number(filters.rooms));
    }

    setFilteredProperties(filtered);
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="property-list-container">
      <FilterBar onFilter={handleFilter} />
      <div className="property-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p className="no-results">İlan bulunamadı</p>
        )}
      </div>
    </div>
  );
}

export default PropertyList;
