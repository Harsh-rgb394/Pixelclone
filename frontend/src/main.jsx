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
        domain='dev-npy2j5sxru6o8h6n.us.auth0.com'
        clientId='W9DgQFLZwsqVW129cxY78UncN88ETDBg'
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>
    </StrictMode>
  </BrowserRouter>

)
