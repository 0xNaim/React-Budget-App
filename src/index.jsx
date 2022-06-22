import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { BudgetsProveder } from './contexts/BudgetContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BudgetsProveder>
      <App />
    </BudgetsProveder>
  </React.StrictMode>
);
