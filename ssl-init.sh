#!/bin/bash
# Einmalig nach DNS-Propagation ausführen
# Voraussetzung: Port 80 muss frei sein (kein Nginx laufend)
set -e

DOMAINS="-d ai.wojtek-gorecki.de -d ai-stage.wojtek-gorecki.de -d wojtek-gorecki.de -d www.wojtek-gorecki.de"
EMAIL="wojtek@gorecki.de"

echo "=== SSL-Zertifikate holen (Let's Encrypt) ==="

docker run --rm -p 80:80 \
  -v /srv/nginx/ssl:/etc/letsencrypt \
  certbot/certbot certonly --standalone \
  $DOMAINS --email $EMAIL --agree-tos --no-eff-email --expand

# Symlinks für Nginx (relativ, damit sie im Container auflösbar sind)
cd /srv/nginx/ssl
ln -sf live/ai.wojtek-gorecki.de/fullchain.pem fullchain.pem
ln -sf live/ai.wojtek-gorecki.de/privkey.pem   privkey.pem

# Auto-Renewal (wöchentlich montags 03:00)
(crontab -l 2>/dev/null; echo "0 3 * * 1 docker run --rm -p 80:80 -v /srv/nginx/ssl:/etc/letsencrypt certbot/certbot renew --standalone && docker restart nginx") | crontab -

echo "=== SSL eingerichtet ==="
