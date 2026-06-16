# 🎵 revo667 Website - Splash Screen & Music System

Geliştirilmiş bir splash screen ve müzik yönetim sistemi ile modernize edilmiş portfolio/bio sitesi.

## ✨ Özellikler

### 🎬 Splash Screen

- **Typing Animation**: Sitede açıldığında "revo667" yazısı animasyonlu olarak yazılır
- **Müzik Seçimi**: Splash screen'de site açılmadan önce müzik seçebilme
- **Gradient Text**: Modern gradient ve glow efektleri ile geliştirilmiş başlık
- **Background Orbs**: Hareket eden gradient küreleri ile dinamik arka plan
- **Smooth Transitions**: Sayfadan sayfaya geçişte smooth fade-out animasyonları
- **"Tikla → Aç" Metni**: Kullanıcı yönlendirmesi ve puls animasyonları

### 🎚️ Müzik Yönetim Sistemi

- **Müzik Seçimi**: Splash screen'de ve site içinde müzik seçebilme
- **Tercih Kaydı**: Kullanıcının seçtiği müzik localStorage'da kaydedilir
- **Otomatik Yükleme**: Site açıldığında kaydedilen müzik otomatik seçili olur
- **Volume Control**: Ses seviyesi kontrolü (0-100%)
- **Expand/Collapse Panel**: Müzik çaları gizle/göster butonları
- **Now Playing Indicator**: Şu an çalınan müzik göstergesi
- **Play/Pause Toggle**: Müzik çalma/durdurma kontrolü

## 🚀 Nasıl Kullanılır?

### Site Açılışı

1. Site açıldığında splash screen görünür
2. "revo667" yazısı typewriter efektiyle yazılır
3. Müzik seçici paneli açılır
4. İstediğiniz müzik seçin ve önizleme yapın
5. **Herhangi bir yere tıklayın** → Müzik çalarak ana sitede açılır

### Müzik Çalar (Ana Site)

- Sağ alt köşede düzenlenebilir müzik çalar
- Müzik listesinden seçim yapabilirsiniz
- Ses seviyesini ayarlayabilirsiniz
- Paneli gizleyebilir ve tekrar açabilirsiniz

## 📁 Dosya Yapısı

```
src/
├── components/
│   ├── SplashScreen.tsx          # Splash screen bileşeni
│   ├── SoundManager.tsx          # Müzik yönetim bileşeni
│   └── ... (diğer bileşenler)
├── hooks/
│   └── useMusicPreference.ts    # Müzik tercihi hook'u (localStorage)
├── constants/
│   └── sounds.ts                 # Müzik listesi tanımlaması
├── styles.css                    # CSS ve animasyonlar
└── routes/
    ├── __root.tsx                # Root layout
    └── index.tsx                 # Ana sayfa
```

## 🎨 Özelleştirme

### Müzik Listesi Ekleme

`src/constants/sounds.ts` dosyasında yeni müzikler ekleyebilirsiniz:

```typescript
export const SOUNDS: Sound[] = [
  { id: "kalbim", name: "Kalbim", url: "/kalbim.mp3" },
  // Yeni müzik ekle:
  // { id: "yeni", name: "Yeni Müzik", url: "/path/to/music.mp3" },
];
```

### Renkler ve Stiller

`src/styles.css` dosyasında animasyon sürelerini ve renklerini değiştirebilirsiniz:

```css
/* Splash screen başlığının rengini değiştir */
.splash-title {
  background: linear-gradient(135deg, #a78bfa 0%, #a855f7 50%, #ec4869 100%);
}

/* Animasyon süresi */
@keyframes glowPulse {
  /* ... */
}
```

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler

- **React 19**: Modern React hooks ve bileşenler
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: İkon kütüphanesi
- **TanStack Router**: Routing sistemi

### Hook'lar

- `useMusicPreference()`: Müzik tercihini localStorage'da saklayan hook

### Animasyonlar

- **Typing Effect**: Character by character yazı yazma
- **Fade Out**: Splash screen kapanırken
- **Glow Pulse**: Başlık ve düğmelerde parlama
- **Slide In**: Panel açılırken kayma
- **Bounce**: Noktalarda sıçrama

## 📱 Responsive Design

- Mobil cihazlarda splash screen başlığı otomatik boyut ayarlanır
- Müzik çalar paneli tüm ekran boyutlarında uyumlu
- Touch-friendly butonlar ve kontroller

## 🎯 Gelecek Geliştirmeler

- [ ] Çalma listesi oluşturma
- [ ] Müzik ilerleme göstergesi
- [ ] Ses görselleştirmesi (equalizer)
- [ ] Favori müzikler
- [ ] Müzik arama ve filtreleme

## 📝 Notlar

- Müzik dosyaları `public/` klasöründe tutulur
- localStorage tarayıcı tarafından yönetilir
- Müzik autoplay tarayıcı politikaları nedeniyle kullanıcı etkileşimi gerekebilir

## 🤝 Katkılar

Geliştirmelere açığız! İssue ve pull request'leriniz beklenmektedir.

---

**Yapım Tarihi**: 2026-06-16  
**Sürüm**: 1.0.0  
**Yazar**: revo667
