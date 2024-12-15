docker build -t my-postgres .

docker run -d --name postgres-container -p 5432:5432 my-postgres

# PostgreSQL Yapılandırma Rehberi

Bu rehber, PostgreSQL veritabanı bağlantısını yapılandırma ve test etme sürecini adım adım anlatır.

## PostgreSQL Servis Kontrolü

### macOS
```bash
# PostgreSQL durumunu kontrol et
brew services list

# PostgreSQL servisini başlat
brew services start postgresql
```

### Linux
```bash
# PostgreSQL durumunu kontrol et
sudo systemctl status postgresql

# PostgreSQL servisini başlat
sudo systemctl start postgresql
```

## Veritabanı Bilgilerini Alma

1. PostgreSQL CLI'a bağlanın:
```bash
# macOS/Linux
psql postgres

# Windows
psql -U postgres
```

2. Mevcut kullanıcıları ve veritabanlarını görüntüleyin:
```sql
-- Kullanıcıları listele
\du

-- Veritabanlarını listele
\l
```

3. Yeni bir kullanıcı ve veritabanı oluşturun:
```sql
-- Yeni kullanıcı oluştur
CREATE USER myuser WITH PASSWORD 'mypassword';

-- Yeni veritabanı oluştur
CREATE DATABASE mydb;

-- Kullanıcıya yetkileri ver
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

4. Bağlantıyı test edin:
```sql
-- Yeni veritabanına bağlan
\c mydb

-- Test sorgusu çalıştır
SELECT NOW();
```

## Environment Variables Yapılandırması

`.env` dosyasında DATABASE_URL'i aşağıdaki formatta ayarlayın:

```env
DATABASE_URL=postgres://myuser:mypassword@localhost:5432/mydb
```

Format açıklaması:
- `myuser`: Oluşturduğunuz PostgreSQL kullanıcı adı
- `mypassword`: Kullanıcı şifresi
- `localhost`: Veritabanı sunucusu (yerel geliştirme için)
- `5432`: PostgreSQL varsayılan portu
- `mydb`: Oluşturduğunuz veritabanı adı

## Bağlantı Testi

1. Migration'ları çalıştırın:
```bash
bun run db:migrate
```

2. Uygulamayı başlatın:
```bash
bun run dev
```

3. Drizzle Studio ile veritabanını görüntüleyin:
```bash
bun run db:studio
```

## Sorun Giderme

### Bağlantı Reddedilirse:
1. PostgreSQL servisinin çalıştığından emin olun
2. Port numarasını kontrol edin (varsayılan: 5432)
3. Kullanıcı yetkilerini kontrol edin
4. Şifrenin doğru olduğundan emin olun

### Yetki Hatası Alırsanız:
```sql
-- Kullanıcı yetkilerini kontrol et
\du myuser

-- Gerekirse ek yetkiler ver
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;
```

### Veritabanı Bulunamazsa:
```sql
-- Veritabanlarını listele
\l

-- Veritabanını yeniden oluştur
CREATE DATABASE mydb;
```

## Faydalı Komutlar

### Bağlantı Bilgilerini Görüntüleme:
```sql
-- Mevcut bağlantı bilgilerini göster
\conninfo

-- PostgreSQL versiyonunu göster
SELECT version();
```

### Kullanıcı Yönetimi:
```sql
-- Şifre değiştirme
ALTER USER myuser WITH PASSWORD 'yeni_şifre';

-- Kullanıcı silme
DROP USER myuser;
```

### Veritabanı Yönetimi:
```sql
-- Veritabanı silme
DROP DATABASE mydb;

-- Veritabanını yeniden oluşturma
CREATE DATABASE mydb OWNER myuser;
```

## Güvenlik Notları

1. Güçlü şifreler kullanın
2. Production ortamında varsayılan kullanıcı adı/şifre kullanmayın
3. Minimum gerekli yetkileri verin
4. Bağlantı bilgilerini güvenli şekilde saklayın
5. `.env` dosyasını asla git'e commit etmeyin