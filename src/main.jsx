import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./app/store.js";
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './constants/components/ErrorBoundery.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
