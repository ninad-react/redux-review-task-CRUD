import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserDetails from './pages/UserDetails';
import AddUser from './pages/AddUser';
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/add-user',
    element: <AddUser />
  },
  {
    path: '/edit-user/:userId',
    element: <AddUser />
  },
  {
    path:'/user-details',
    element: <UserDetails />
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);


