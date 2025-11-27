import { useState } from 'react';
import './FilterBar.css';

function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    rooms: ''
  });

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="filter-bar">
      <select name="city" value={filters.city} onChange={handleChange}>
        <option value="">Tüm Şehirler</option>
        <option value="İstanbul">İstanbul</option>
        <option value="Ankara">Ankara</option>
        <option value="İzmir">İzmir</option>
        <option value="Antalya">Antalya</option>
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Min Fiyat"
        value={filters.minPrice}
        onChange={handleChange}
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max Fiyat"
        value={filters.maxPrice}
        onChange={handleChange}
      />

      <select name="rooms" value={filters.rooms} onChange={handleChange}>
        <option value="">Oda Sayısı</option>
        <option value="1">1+1</option>
        <option value="2">2+1</option>
        <option value="3">3+1</option>
        <option value="4">4+1</option>
      </select>
    </div>
  );
}

export default FilterBar;
