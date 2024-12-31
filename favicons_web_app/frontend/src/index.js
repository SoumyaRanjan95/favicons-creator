import React from 'react';
import {createRoot} from "react-dom/client"
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';


import App from './App';
import Home from './components/Home';
import Converter from './components/Converter';
import Generator from './components/Generator';
import Logos from './components/Logos';

const root = createRoot(document.getElementById('root'));



const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/favicon-converter/",
        element: <Converter/>
      },
      {
        path:"/favicon-generator/",
        element: <Generator/>
      },
      {
        path:"/logos/",
        element: <Logos/>
      },
      {
        path:"/emojis/",
        element: <p className='text-green-600 bg-black p-15'>This is a emojis tag</p>
      },

    ],
  },
])


root.render(
    <RouterProvider router={router}/>
);

