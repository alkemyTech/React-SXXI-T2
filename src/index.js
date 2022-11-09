import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import 'antd/dist/antd.min.css';
import './Sass/main.scss';
library.add(faNewspaper)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
