# Recipe Tarif Projesi

Bu proje, kullanıcıların yemek tarifleri oluşturabileceği, silebileceği ve tarif detaylarını görüntüleyebileceği bir Fullstack uygulamadır. Backend tarafında Express.js, frontend tarafında ise React.js kullanılarak geliştirilmiştir.

## Proje Özellikleri

- **Tarif Oluşturma**: Kullanıcılar yeni tarifler ekleyebilir.
- **Tarif Silme**: Kullanıcılar mevcut tarifleri silebilir.
- **Tarif Detayları**: Kullanıcılar tariflerin detaylarını görüntüleyebilir.
- **Dinamik Sayfalama**: Farklı tarifleri gezinmek için.
- **Bildirimler**: İşlem sonrası kullanıcıya geri bildirim sağlar.

---

## Kullanılan Teknolojiler

### Backend

- **express**: Backend sunucusu için kullanıldı.
- **nodemon**: Geliştirme sırasında sunucuyu otomatik yeniden başlatmak için kullanıldı.
- **cors**: API taleplerine gelen cross-origin isteklerini yönetmek için kullanıldı.

### Frontend

- **react-router-dom**: Sayfalama ve yönlendirme işlemleri için kullanıldı.
- **axios**: API isteklerini kolayca yönetmek için kullanıldı.
- **tailwind**: Uygulamanın hızlı ve şık bir şekilde tasarlanmasını sağladı.
- **react-select**: Tarif oluşturma ve düzenleme formlarında seçme alanları için kullanıldı.
- **react-icons**: Uygulamada görselliği artırmak için ikonlar eklendi.
- **react-toastify**: Kullanıcı işlemleri sonrası bildirimler göstermek için kullanıldı.
- **usedebounce**: API isteklerini azaltmak için debounce fonksiyonelliği sağladı.

---

## Kurulum

### Backend

1. Proje dizinine gidin ve gerekli paketleri yükleyin:
   ```bash
   cd api
   npm install
   ```
2. Sunucuyu başlatın:
   ```bash
   npm start
   ```

### Frontend

1. Proje dizinine gidin ve gerekli paketleri yükleyin:
   ```bash
   cd client
   npm install
   ```
2. Uygulamayı çalıştırın:
   ```bash
   npm run dev
   ```

---

## Geliştirici Notları

Bu proje, Fullstack geliştirme deneyimi kazanmak ve farklı teknolojileri bir arada kullanmayı öğrenmek amacıyla geliştirilmiştir. Herhangi bir öneriniz veya sorunuz olursa iletişime geçmekten çekinmeyin!
