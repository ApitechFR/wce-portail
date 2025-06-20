import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa';
import { Link } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';

startReactDsfr({
  defaultColorScheme: 'system',
  Link,
});

// Only in TypeScript projects
declare module '@codegouvfr/react-dsfr/spa' {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const authMode = import.meta.env.VITE_AUTH_MODE;

// preparing the jsx to render
let AppWithAuth: JSX.Element;

if (authMode === 'keycloak') {
  const keycloak = new Keycloak({
    url: import.meta.env.VITE_OIDC_URL,
    realm: import.meta.env.VITE_OIDC_REALM,
    clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
  });

  AppWithAuth = (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
} else {
  AppWithAuth = (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

// render app based on auth mode
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(AppWithAuth);