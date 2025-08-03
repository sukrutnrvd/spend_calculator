# 💰 Harcama Hesaplayıcı

Kişilerin harcamalarını girerek kimin kime ne kadar para vermesi gerektiğini hesaplayan modern web uygulaması.

## 🎯 Proje Amacı

Bu uygulama, grup harcamalarını adil bir şekilde bölüştürmek için geliştirilmiştir. Kullanıcılar:

- Kişi ekleyebilir (ad, IBAN, harcama miktarı)
- IBAN'ları kolayca kopyalayabilir
- Otomatik hesaplama yapabilir
- Kimin kime ne kadar para vermesi gerektiğini görebilir

## ✨ Özellikler

### 🧑‍💼 Kişi Yönetimi

- Kişi ekleme (ad, IBAN, harcama miktarı)
- Kişi silme
- IBAN kopyalama özelliği
- Kişi listesi görüntüleme

### 🧮 Hesaplama Sistemi

- Frontend'de çalışan gelişmiş algoritma
- Minimum transfer sayısı ile optimal çözüm
- Otomatik ortalama hesaplama
- Gerçek zamanlı sonuçlar

### 🎨 Kullanıcı Arayüzü

- Modern ve responsive tasarım
- Smooth animasyonlar (Framer Motion)
- Türkçe arayüz
- Kullanıcı dostu deneyim

### 📊 Sonuç Gösterimi

- Toplam harcama
- Kişi başı ortalama
- Transfer listesi
- Görsel transfer yönlendirmeleri

## 🛠️ Kullanılan Teknolojiler

- [Next.js 15](https://nextjs.org/docs/getting-started) - React framework
- [HeroUI v2](https://heroui.com/) - Modern UI bileşenleri
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği
- [Framer Motion](https://www.framer.com/motion/) - Animasyonlar
- [React](https://reactjs.org/) - UI kütüphanesi

## 🚀 Kurulum ve Kullanım

### Gereksinimler

- Node.js 18+
- npm, yarn, pnpm veya bun

### Kurulum

1. Projeyi klonlayın:

```bash
git clone <repository-url>
cd spend_calculator
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### Kullanım

1. **Kişi Ekleme**: Sol taraftaki formu kullanarak kişi ekleyin

   - Ad soyad girin
   - IBAN bilgisini ekleyin
   - Harcama miktarını girin

2. **Hesaplama**: En az 2 kişi ekledikten sonra "Hesapla" butonuna basın

3. **Sonuçları Görüntüleme**: Sağ tarafta hesaplama sonuçları görüntülenecek

4. **IBAN Kopyalama**: Kişi listesindeki 📋 butonuna tıklayarak IBAN'ı kopyalayın

## 📁 Proje Yapısı

```
spend_calculator/
├── app/                    # Next.js app router
│   ├── page.tsx           # Ana sayfa
│   ├── layout.tsx         # Layout bileşeni
│   └── providers.tsx      # Context providers
├── components/            # React bileşenleri
│   ├── PersonForm.tsx     # Kişi ekleme formu
│   ├── PersonList.tsx     # Kişi listesi
│   └── CalculationResults.tsx # Hesaplama sonuçları
├── utils/                # Utility fonksiyonları
│   └── expenseCalculator.ts # Hesaplama algoritması
├── types/                # TypeScript tip tanımları
│   └── index.ts          # Proje tipleri
└── styles/               # CSS stilleri
    └── globals.css       # Global stiller
```

## 🧮 Hesaplama Algoritması

Uygulama, grup harcamalarını adil bir şekilde bölüştürmek için gelişmiş bir algoritma kullanır:

1. **Toplam Harcama Hesaplama**: Tüm kişilerin harcamalarının toplamı
2. **Ortalama Hesaplama**: Toplam harcama / kişi sayısı
3. **Bakiye Hesaplama**: Her kişinin harcaması - ortalama
4. **Transfer Optimizasyonu**: Minimum transfer sayısı ile optimal çözüm

### Algoritma Özellikleri:

- ✅ Minimum transfer sayısı
- ✅ Adil bölüştürme
- ✅ Gerçek zamanlı hesaplama
- ✅ Frontend'de çalışır (backend gerektirmez)

## 🎨 Animasyonlar

Uygulama Framer Motion kullanarak smooth animasyonlar içerir:

- Form giriş animasyonları
- Kişi listesi slide-in/out efektleri
- Hesaplama sonuçları staggered animasyonları
- Buton hover ve tap efektleri

## 📱 Responsive Tasarım

- ✅ Mobil uyumlu
- ✅ Tablet uyumlu
- ✅ Desktop uyumlu
- ✅ Modern UI/UX

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Bu proje, grup harcamalarını kolayca hesaplamak için geliştirilmiştir. Herhangi bir sorunuz varsa issue açabilirsiniz.
