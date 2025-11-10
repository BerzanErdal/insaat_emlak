# Özdemir İnşaat - Emlak Web Sitesi

Emlakjet benzeri, kullanıcıların daireleri görüntüleyebileceği ve adminin yeni daire ekleyip yönetebileceği bir emlak tanıtım web sitesi.

## Teknolojiler

- **React** - UI framework
- **Vite** - Build tool
- **Firebase** - Backend servisleri
  - Authentication (Admin girişi)
  - Firestore (Veritabanı)
- **React Router** - Sayfa yönlendirme

## Özellikler

### Kullanıcı Arayüzü
- ✅ Ana sayfa
- ✅ Daire listeleme ve detay sayfası
- ✅ Filtreleme (şehir, fiyat, oda sayısı)
- ✅ Hizmetler sayfası
- ✅ İletişim sayfası
- ✅ Responsive tasarım (mobil ve tablet uyumlu)

### Admin Paneli
- ✅ Giriş/çıkış (Firebase Authentication)
- ✅ Daire ekleme, düzenleme ve silme
- ✅ Resim yükleme

## Kurulum

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Environment Variables Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını açın ve kendi bilgilerinizle doldurun.

### 3. Firebase Yapılandırması

1. [Firebase Console](https://console.firebase.google.com/) üzerinden yeni bir proje oluşturun
2. Authentication'ı aktifleştirin (Email/Password)
3. Firestore Database oluşturun
4. Web uygulaması ekleyin ve yapılandırma bilgilerini alın
5. Firebase bilgilerini `.env` dosyasına ekleyin:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Cloudinary Yapılandırması

1. [Cloudinary](https://cloudinary.com/users/register_free) üzerinden ücretsiz hesap oluşturun
2. Dashboard'dan **Cloud Name**'inizi alın
3. Settings → Upload → Upload Presets → Add upload preset
   - Preset name: `ozdemir_insaat`
   - Signing Mode: **Unsigned**
4. Cloudinary bilgilerini `.env` dosyasına ekleyin:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=ozdemir_insaat
```

### 5. Admin Kullanıcısı Oluşturma

Firebase Console > Authentication > Users bölümünden manuel olarak bir admin kullanıcısı ekleyin.

### 6. Firestore Kuralları

Firebase Console > Firestore Database > Rules bölümünde aşağıdaki kuralları ekleyin:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /properties/{property} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```



## Geliştirme

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresini açın.

## Build

Production build oluşturmak için:

```bash
npm run build
```

Build dosyaları `dist` klasöründe oluşturulacaktır.

## Kullanım

### Kullanıcı Tarafı
1. Ana sayfadan ilanları görüntüleyin
2. İlanlar sayfasında filtreleme yapın
3. İlan detaylarını inceleyin
4. Hizmetler ve iletişim sayfalarını ziyaret edin

### Admin Tarafı
1. `/admin` sayfasına gidin
2. Firebase'de oluşturduğunuz admin hesabıyla giriş yapın
3. Yeni ilan ekleyin, mevcut ilanları düzenleyin veya silin
4. Resim yükleyin

## Proje Yapısı

```
src/
├── components/
│   ├── Navbar.jsx              # Navigasyon menüsü
│   ├── PropertyCard.jsx        # İlan kartı
│   ├── PropertyList.jsx        # İlan listesi
│   ├── PropertyDetail.jsx      # İlan detay sayfası
│   ├── FilterBar.jsx           # Filtreleme bileşeni
│   └── admin/
│       ├── AdminLogin.jsx      # Admin giriş sayfası
│       ├── AdminPanel.jsx      # Admin panel
│       └── PropertyForm.jsx    # İlan ekleme/düzenleme formu
├── pages/
│   ├── Home.jsx                # Ana sayfa
│   ├── Properties.jsx          # İlanlar sayfası
│   ├── Services.jsx            # Hizmetler sayfası
│   └── Contact.jsx             # İletişim sayfası
├── config/
│   └── firebase.js             # Firebase yapılandırması
├── App.jsx                     # Ana uygulama
└── main.jsx                    # Giriş noktası
```

## Lisans
Bu proje eğitim amaçlıdır.
