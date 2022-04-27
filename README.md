# gallery-store

```bash
docker run -it \
  -e POSTGRES_USER="root" \
  -e POSTGRES_PASSWORD="root" \
  -e POSTGRES_DB="gallery_store_lakookoo" \
  -v gallery_store_lakookoo_db:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:13
```