import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {Login} from './containers/Login';
import GlobalStyle  from 'styled-components';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Login/>
    < GlobalStyle />
    <ToastContainer/>
  </StrictMode>,
)
