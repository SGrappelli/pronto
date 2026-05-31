#!/bin/bash
# Run this script on the DigitalOcean server to add HTTP Basic Auth to staging.
# Usage: bash scripts/setup-staging-auth.sh <password>
# Example: bash scripts/setup-staging-auth.sh mySecretPassword123

set -e

if [ -z "$1" ]; then
  echo "Usage: bash scripts/setup-staging-auth.sh <password>"
  exit 1
fi

STAGING_PASSWORD="$1"

echo "=== Installing apache2-utils (for htpasswd) ==="
if ! command -v htpasswd &> /dev/null; then
  sudo apt-get update -q
  sudo apt-get install -y apache2-utils
else
  echo "htpasswd already installed, skipping."
fi

echo "=== Creating /etc/nginx/.htpasswd ==="
sudo htpasswd -cb /etc/nginx/.htpasswd pronto "$STAGING_PASSWORD"
echo "Created /etc/nginx/.htpasswd with user 'pronto'."

echo ""
echo "=== Next step: add these two lines inside the staging server {} block ==="
echo "    in /etc/nginx/sites-enabled/pronto"
echo ""
echo "    auth_basic \"Staging\";"
echo "    auth_basic_user_file /etc/nginx/.htpasswd;"
echo ""
echo "The staging server block is the one that listens for staging.trypronto.app."
echo "Do NOT add these lines to the production block."
echo ""
echo "After editing nginx, run:"
echo "    sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo "=== Done ==="
