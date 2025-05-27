import ReactDOM from 'react-dom/client';
import Cart from './Cart';

const mount = (el: Element) => {
  const root = ReactDOM.createRoot(el);
  root.render(<Cart />);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_cart-dev-root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount }; 