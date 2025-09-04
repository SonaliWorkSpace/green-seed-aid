import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import React from 'react'

const root = createRoot(document.getElementById("root")!)
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
