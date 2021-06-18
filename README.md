# Gallery App

## Table of Contents

- [Create Firebase Database](#create-firebase-database)
- [Create Character Pages](#create-character-pages)
- [Customizing Appearance](#customizing-appearance)

## Create Firebase Database

This project assumes that you will be using Google's free-tier [Firebase](https://firebase.google.com/) as the database, storage, and authentication for your galleries.

### Set Up Firebase project

1. Sign into Google and navigate to the [Firebase console](https://console.firebase.google.com/)
2. Click 'Add project'
3. Name your project anything you'd like
4. Disable Google Analytics and create project
5. After the project has been created, click on the `</>` icon to add a Web App to the project
6. Give any nickname you'd like to the app and click 'Register app'
7. Copy the code for the Firebase configuration variable. It should look something like the following:
```javascript
  var firebaseConfig = {
    apiKey: "sdflkjIsdkfjghsdflakdfjgH",
    authDomain: "testdomain.firebaseapp.com",
    projectId: "testproj-75c89",
    storageBucket: "testdomain.appspot.com",
    messagingSenderId: "122939339",
    appId: "1:122939339:web:d2394857234958edc3"
  };
```
8. Paste it into [src/firebase/config.js](src/firebase/config.js) after `// Your web app's Firebase configuration` and before `// Initialize Firebase`, replacing the `var firebaseConfig = {};` line

### Set Up Firebase services

The three services you need for this app are Authentication, Firestore Database, and Storage.

#### Authentication

1. Click on 'Authentication' in the sidebar of your project's console
2. Click 'Get started'
3. Click 'Email/Password' under the 'Sign-in method' tab, enable it, and save
  - Do not enable 'Email link (passwordless sign-in)'
4. Click on the Users tab and add your user account
5. This is the account you will use to access upload/edit pages on your website

#### Firestore Database

1. Click on 'Firestore Database' in the sidebar of the console
2. Click 'Get started'
3. Click 'Next'
4. Choose a location for your Firestore data (the default selection is fine!)
5. Click 'Enable'
6. After the Database has been created, click on the 'Rules' tab and replace the default rules with the following:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
    	allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```
7. Click 'Publish'
8. These rules mean anyone can load information from the Database without logging in, but they can only change information if they are logged in

#### Storage

1. Click on 'Storage' in the sidebar of the console
2. Click the 'Rules' tab and replace the default rules with the following:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid != null && resource == null || request.resource == null;
    }
  }
}
```
3. Click 'Publish'
4. These rules mean that anyone can load images from your storage, but they can only upload images if they are logged in. Also, you cannot upload images with the same file names!

## Create Character Pages
Navigatable pages of the app are stored in [/src/pages](src/pages).

To add a new character gallery page, copy the following code into a new .js file in [/src/pages](src/pages) named after the character and replace all instances of "CharacterName" with the character's name:

```javascript
// src/pages/charactername.js

import Character from 'components/character';

export default function CharacterName() {
  return (
    <>
      <Character title='character name' gallery='CharacterNameImages' />
    </>
  )
}
```

Empty character galleries will not show up on the homepage until an image has been added to it. To add an image to a gallery, log in and navigate directly to the gallery page (ex: https://yoursite.neocities.org/charactername).

To add descriptions to your galleries, log in and navigate to the 'edit descriptions' page (ex: https://yoursite.neocities.org/admin/description/edit). The name you input must match the title on the character page exactly.

## Customizing Appearance

To change the colors used in the app, go to [/src/styles/globals.css](src/styles/globals.css) and edit the color codes at the top of the file. You can also change the font used throughout the app here.

```css
:root {
  --body-accent: #ed9998;
  --text: #4e4e4e;
  --title-accent: #fad02c;
  --error: #ff4a4a;
  --gradient-top: rgba(250, 208, 44, .6);
  --gradient-bottom: rgba(225, 85, 84, .6);
  --font: "Noto Sans";
}
```

To change the favicon for the app, replace the default favicon.ico in the [/public](public) directory.
