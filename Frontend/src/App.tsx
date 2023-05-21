import * as React from 'react';
import Login from './view/Login';
import router from './router/router';
import {
    RouterProvider,
} from "react-router-dom";

export default function MyApp() {
  return (
      <div>
          <RouterProvider router={router} />
      </div>
  );
}
