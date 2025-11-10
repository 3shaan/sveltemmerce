
#!/bin/sh
set -e

# Extract host and port from DATABASE_URL
DB_HOST=$(echo $DATABASE_URL | sed -E 's#postgres://[^:]+:[^@]+@([^:]+):([0-9]+)/.*#\1#')
DB_PORT=$(echo $DATABASE_URL | sed -E 's#postgres://[^:]+:[^@]+@([^:]+):([0-9]+)/.*#\2#')

echo "Waiting for Postgres at $DB_HOST:$DB_PORT..."

# Wait until the port is open
while ! nc -z $DB_HOST $DB_PORT; do
  echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "Postgres is up - running migrations"
pnpm db:migrate

echo "Starting the API"
pnpm dev --filter=api
