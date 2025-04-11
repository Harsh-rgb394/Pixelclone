import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    <StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH_AUTH_DOMAIN}
        clientId={import.meta.env.VITE_AUTH_AUTH_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>
    </StrictMode>
  </BrowserRouter>

)
// Hello Mam.
// My Name is Harshvardhan Singh  came across your walk-in hiring post for the Junior Associate Full Stack Developer (MERN) role at Kainskep Solutions on April 12th.

// Although I’m a fresher, I’ve worked extensively with the MERN stack and have built several projects, some of which I’ve also deployed live. Since the required skills and tech stack match my experience, I wanted to ask if I’m eligible to attend the walk-in drive.

// Looking forward to your response. Thank you!