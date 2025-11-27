import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';
import ConfirmModal from '../ConfirmModal';
import './MessagesList.css';

function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
      setLoading(false);
    } catch (error) {
      console.error('Mesajlar yüklenirken hata:', error);
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, 'messages', id), {
        status: 'read'
      });
      toast.success('✓ Mesaj okundu olarak işaretlendi!', {
        autoClose: 2000,
      });
      fetchMessages();
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      toast.error('❌ Güncelleme hatası!');
    }
  };

  const deleteMessage = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'messages', deleteId));
      toast.success('🗑️ Mesaj başarıyla silindi!', {
        autoClose: 2000,
      });
      fetchMessages();
    } catch (error) {
      console.error('Silme hatası:', error);
      toast.error('❌ Silme hatası!');
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Tarih yok';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('tr-TR');
  };

  if (loading) {
    return <div className="loading">Mesajlar yükleniyor...</div>;
  }

  return (
    <div className="messages-list">
      <ConfirmModal
        isOpen={showConfirm}
        title="🗑️ Mesajı Sil"
        message="Bu mesajı silmek istediğinizden emin misiniz?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      
      <h2>📬 Gelen Mesajlar ({messages.length})</h2>
      
      {messages.length === 0 ? (
        <div className="no-messages">
          <p>📭 Henüz mesaj yok</p>
        </div>
      ) : (
        <div className="messages-grid">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message-card ${message.status === 'unread' ? 'unread' : ''}`}
            >
              <div className="message-header">
                <div className="message-info">
                  <h3>{message.name}</h3>
                  <span className="message-date">{formatDate(message.createdAt)}</span>
                </div>
                {message.status === 'unread' && (
                  <span className="unread-badge">Yeni</span>
                )}
              </div>
              
              <div className="message-contact">
                <p>📧 {message.email}</p>
                <p>📞 {message.phone}</p>
              </div>
              
              <div className="message-content">
                <p>{message.message}</p>
              </div>
              
              <div className="message-actions">
                {message.status === 'unread' && (
                  <button 
                    onClick={() => markAsRead(message.id)}
                    className="read-btn"
                  >
                    ✓ Okundu İşaretle
                  </button>
                )}
                <button 
                  onClick={() => deleteMessage(message.id)}
                  className="delete-btn"
                >
                  🗑️ Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessagesList;
