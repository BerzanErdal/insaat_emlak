import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Firestore'a mesajı kaydet
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: new Date(),
        status: 'unread'
      });

      setSuccess(true);
      toast.success('✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', {
        position: "top-center",
        autoClose: 4000,
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      toast.error('❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>İletişim</h1>
        <p>Bizimle iletişime geçin</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>İletişim Bilgileri</h2>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <h3>Adres</h3>
              <p>Örnek Mahallesi, İnşaat Caddesi No:123<br/>İstanbul, Türkiye</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <h3>Telefon</h3>
              <p>+90 (212) 123 45 67</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>info@ozdemirinşaat.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Mesaj Gönderin</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Adınız Soyadınız"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Adresiniz"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefon Numaranız"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Mesajınız"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? '📤 Gönderiliyor...' : '📨 Gönder'}
            </button>
            {success && (
              <p className="success-message">✅ Mesajınız başarıyla gönderildi!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
