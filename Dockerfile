# PostgreSQL'in resmi imajını kullanıyoruz
FROM postgres:latest

# Ortam değişkenlerini tanımlayarak varsayılan ayarları yapıyoruz
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase
