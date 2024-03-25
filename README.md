# Installation

## STRIPE

- Se README.md i le-backend repo.

## Google reCAPTCHA

- Gå till [Google reCAPTCHA](https://www.google.com/recaptcha/) webbplatsen och logga in med ditt Google-konto.
- Klicka på "Admin Console" i det övre högra hörnet.
- Klicka på "+"-knappen för att skapa en ny webbplats.
- Fyll i formuläret:
  - "Label": Skriv in ett namn som hjälper dig att identifiera vilken webbplats denna reCAPTCHA är för.
  - "reCAPTCHA type": Välj typen av reCAPTCHA du vill använda. För de flesta webbplatser är "reCAPTCHA v2" eller "reCAPTCHA v3" lämpliga.
  - "Domains": Skriv in domänen för din webbplats. Om du testar lokalt, kan du lämna detta fält tomt.
- Klicka på "Submit".
- Du kommer nu att få två nycklar: en "Site Key" och en "Secret Key". "Site Key" används i din offentliga frontend-kod, och "Secret Key" används på din server.
- Lägg till dessa nycklar i din `.env`-fil:

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

```

```
