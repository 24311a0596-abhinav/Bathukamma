# Bathukamma Studio
1. Copy `.env.example` to `.env` and paste the EXACT apiKey from Firebase console > Project settings.
2. Firebase console > Build > Firestore Database > Create database.
3. Firestore > Rules > paste, then Publish:

   rules_version = '2';
   service cloud.firestore { match /databases/{d}/documents { match /rooms/{c} { allow read, write: if true; } } }

4. `npm install` then `npm run dev`. The home screen shows "Live sync connected" when everything works.
