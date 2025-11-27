import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { toast } from 'react-toastify';
import ConfirmModal from '../ConfirmModal';
import PropertyForm from './PropertyForm';
import MessagesList from './MessagesList';
import './AdminPanel.css';

function AdminPanel() {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('properties'); // 'properties' veya 'messages'
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const querySnapshot = await getDocs(collection(db, 'properties'));
    const propertiesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProperties(propertiesData);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'properties', deleteId));
      toast.success('🗑️ İlan başarıyla silindi!');
      fetchProperties();
    } catch (error) {
      console.error('Silme hatası:', error);
      toast.error('❌ İlan silinirken hata oluştu.');
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProperty(null);
    fetchProperties();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  return (
    <div className="admin-panel">
      <ConfirmModal
        isOpen={showConfirm}
        title="🗑️ İlanı Sil"
        message="Bu ilanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      
      <div className="admin-header">
        <h1>Admin Paneli</h1>
        <div className="admin-actions">
          {activeTab === 'properties' && (
            <button onClick={() => setShowForm(true)} className="add-btn">
              + Yeni İlan Ekle
            </button>
          )}
          <button onClick={handleLogout} className="logout-btn">
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Sekmeler */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          🏠 İlanlar
        </button>
        <button 
          className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          📬 Mesajlar
        </button>
      </div>

      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={handleFormClose}
        />
      )}

      {/* İçerik */}
      {activeTab === 'properties' ? (
        <div className="properties-table">
        <table>
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Şehir</th>
              <th>Fiyat</th>
              <th>Oda</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.city}</td>
                <td>{property.price.toLocaleString('tr-TR')} ₺</td>
                <td>{property.rooms}+1</td>
                <td>
                  <button onClick={() => handleEdit(property)} className="edit-btn">
                    Düzenle
                  </button>
                  <button onClick={() => handleDelete(property.id)} className="delete-btn">
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <MessagesList />
      )}
    </div>
  );
}

export default AdminPanel;
