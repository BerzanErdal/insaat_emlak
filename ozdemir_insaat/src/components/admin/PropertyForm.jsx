import { useState } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { uploadToCloudinary } from '../../config/cloudinary';
import { toast } from 'react-toastify';
import './PropertyForm.css';

function PropertyForm({ property, onClose }) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    city: property?.city || '',
    price: property?.price || '',
    rooms: property?.rooms || '',
    area: property?.area || '',
    description: property?.description || ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState(property?.images || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Yeni resimleri mevcut resimlere ekle
    setImages(prevImages => [...prevImages, ...files]);
    
    // Yeni önizlemeler oluştur ve mevcut önizlemelere ekle
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    
    // Input'u temizle (aynı dosyayı tekrar seçebilmek için)
    e.target.value = '';
  };

  const removeExistingImage = (index) => {
    setExistingImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const imageUrls = [];
    for (const image of images) {
      const url = await uploadToCloudinary(image);
      imageUrls.push(url);
    }
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [...existingImages];
      
      if (images.length > 0) {
        const newImageUrls = await uploadImages();
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const propertyData = {
        ...formData,
        price: Number(formData.price),
        rooms: Number(formData.rooms),
        area: Number(formData.area),
        images: imageUrls,
        updatedAt: new Date()
      };

      if (property) {
        await updateDoc(doc(db, 'properties', property.id), propertyData);
      } else {
        await addDoc(collection(db, 'properties'), {
          ...propertyData,
          createdAt: new Date()
        });
      }

      toast.success(property ? '✅ İlan başarıyla güncellendi!' : '✅ İlan başarıyla eklendi!', {
        position: "top-center",
      });
      onClose();
    } catch (error) {
      console.error('Kayıt hatası:', error);
      toast.error('❌ İşlem sırasında hata oluştu. Lütfen tekrar deneyin.', {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-form-overlay">
      <div className="property-form">
        <h2>{property ? 'İlan Düzenle' : 'Yeni İlan Ekle'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Başlık"
            value={formData.title}
            onChange={handleChange}
            required
          />
          
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Şehir Seçin</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Antalya">Antalya</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Fiyat (₺)"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="rooms"
            placeholder="Oda Sayısı"
            value={formData.rooms}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="area"
            placeholder="Alan (m²)"
            value={formData.area}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Açıklama"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />

          {/* Mevcut Resimler */}
          {existingImages.length > 0 && (
            <div className="existing-images">
              <label>Mevcut Resimler:</label>
              <div className="image-preview-grid">
                {existingImages.map((img, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={img} alt={`Mevcut ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeExistingImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yeni Resimler */}
          <div className="file-input-wrapper">
            <label htmlFor="file-input" className="file-input-label">
              📷 Resim Seç (Birden fazla seçilebilir)
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Yeni Resim Önizlemeleri */}
          {imagePreviews.length > 0 && (
            <div className="new-images">
              <label>Yeni Resimler:</label>
              <div className="image-preview-grid">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={preview} alt={`Yeni ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeNewImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button type="button" onClick={onClose}>
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyForm;
