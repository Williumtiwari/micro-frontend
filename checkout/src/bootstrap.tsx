import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Checkout from './Checkout';
import SharedCartProvider from 'container/SharedCartProvider';

const mount = (el: Element) => {
  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <SharedCartProvider>
          <Checkout />
        </SharedCartProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount }; 