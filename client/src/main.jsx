import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './styles/global.css';
import { store } from './redux/store.js';
import {Provider} from 'react-redux';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <App />
   </AuthProvider>
    </Provider>
  </StrictMode>,
)
