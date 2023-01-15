import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes'


ReactDOM.render(
  <React.Suspense>

    <Routes />
    
  </React.Suspense>,
  document.getElementById('root')
);


/*
  <React.StrictMode>

    <Routes />
    
  </React.StrictMode>,
  document.getElementById('root')
);

*/