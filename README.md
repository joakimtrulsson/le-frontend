# Installation

## Konfigurera miljövariabler

- Skapa en .env-fil med nedanstående variabler och ange dina egna värden.
- Starta LE-Backend(Se README.md tillhörande det repot)

```

VITE_API_URL="http://localhost:3000/api/graphql"
VITE_API_EMAIL_URL="http://localhost:3000/api/email"
VITE_API_VERIFY_TOKEN="http://localhost:3000/api/verify-token"

# Stripe
VITE_CHECKOUT_URL="http://localhost:3000/api/checkout-session"
VITE_CHECKOUT_TOKEN=""

# reCAPTCHA
VITE_APP_SITE_KEY=""
VITE_SITE_SECRET=""

```

## Starta Appen

- Använd följande kommando för att installera och starta:

```
npm install
npm run dev

```
