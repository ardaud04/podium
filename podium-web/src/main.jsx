import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// base styles first, so component stylesheets can override them
import './styles/global.css';
import './styles/app.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
