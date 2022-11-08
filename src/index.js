import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
library.add(faNewspaper)

ReactDOM.render(
    <React.StrictMode>
  
        <App />
  
    </React.StrictMode>,
    document.getElementById('root')
  );
