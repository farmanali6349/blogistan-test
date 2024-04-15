import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {Homepage, Authlayout, Loginpage, Registerpage, Posts, Post, Createpostpage, Editpostpage} from "./components/index.js"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: '/login',
        element: (
          <Authlayout authentication={false}>
            {" "}
            <Loginpage />
          </Authlayout>
        )
      },
      {
        path: '/register',
        element: (<Authlayout authentication={false}> <Registerpage /> </Authlayout>)
      },
      {
        path: '/posts',
        element: <Posts />
      },
      {
        path: 'post/:slug',
        element: <Post />
      },
      {
        path: '/create-post',
        element: <Authlayout authentication={true}> <Createpostpage /> </Authlayout>
      },
      {
        path: '/edit-post/:slug',
        element: <Authlayout authentication={true}> <Editpostpage /> </Authlayout>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
