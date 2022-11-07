import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
library.add(faNewspaper)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
