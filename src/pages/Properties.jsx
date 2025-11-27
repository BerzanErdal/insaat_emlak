import PropertyList from '../components/PropertyList';
import './Properties.css';

function Properties() {
  return (
    <div className="properties-page">
      <div className="page-header">
        <h1>Tüm İlanlar</h1>
        <p>Size en uygun daireyi bulun</p>
      </div>
      <PropertyList />
    </div>
  );
}

export default Properties;
