# Docker Setup

This document explains how to run the application using Docker.

## Prerequisites

- Docker (with Docker Compose V2)

## Development Environment

### Starting the Application

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

### Environment Variables

Development environment variables are set in `docker-compose.yml`:

```yaml
environment:
  - DATABASE_URL=postgresql://postgres:postgres@db:5432/myapp
  - AUTH_SECRET=your-secret-key
  - NODE_ENV=development
```

### Volumes

Development setup includes the following volumes:
- `.:/app`: Source code mounting for hot reload
- `/app/node_modules`: Named volume for node_modules
- `postgres_data`: Persistent database storage

## Production Environment

### Starting the Application

```bash
# Create .env file with production values
cp .env.example .env

# Start all services
docker compose -f docker-compose.prod.yml up -d

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Stop all services
docker compose -f docker-compose.prod.yml down
```

### Environment Variables

Production environment requires the following variables in `.env`:

```env
AUTH_SECRET=your-production-secret
DB_PASSWORD=your-database-password
```

### Security Considerations

1. Never commit `.env` file
2. Use strong passwords in production
3. Change default database credentials
4. Regularly update base images
5. Use specific version tags for images

## Docker Configuration Files

### Dockerfile

Multi-stage build process:

1. `base`: Base image with Bun runtime
2. `deps`: Dependencies installation
3. `development`: Development environment
4. `builder`: Production build
5. `production`: Production runtime

### docker-compose.yml

Development configuration with:
- Hot reload
- Exposed ports
- Development environment
- PostgreSQL database

### docker-compose.prod.yml

Production configuration with:
- Optimized build
- Environment variables
- Automatic restart
- Persistent storage

## Database Management

### Backup

```bash
# Backup database
docker exec -t db pg_dump -U postgres myapp > backup.sql

# Restore database
docker exec -i db psql -U postgres myapp < backup.sql
```

### Database Migrations

```bash
# Run migrations
docker compose exec app bun run migrate

# Generate migration
docker compose exec app bun run generate
```

## Troubleshooting

### Common Issues

1. Port conflicts:
   ```bash
   # Change port mapping in docker-compose.yml
   ports:
     - "3001:3000"  # Maps container port 3000 to host port 3001
   ```

2. Permission issues:
   ```bash
   # Fix ownership
   sudo chown -R $USER:$USER .
   ```

3. Database connection issues:
   ```bash
   # Check database logs
   docker compose logs db
   
   # Connect to database
   docker compose exec db psql -U postgres myapp
   ```

4. "docker-compose command not found" error:
   ```bash
   # Use new Docker Compose V2 syntax without hyphen
   docker compose [command]  # Instead of docker-compose [command]
   ```

### Useful Commands

```bash
# List containers
docker ps

# Container shell access
docker compose exec app sh

# View container logs
docker compose logs -f [service_name]

# Rebuild containers
docker compose up -d --build

# Remove all containers and volumes
docker compose down -v
```

### Docker Compose V2 vs V1

Docker Compose V2 is now integrated into Docker CLI and uses a different command syntax:
- Old (V1): `docker-compose`
- New (V2): `docker compose`

If you need to use V1 syntax, you can install it separately:
```bash
# macOS
brew install docker-compose

# Linux
sudo apt-get install docker-compose
``` 