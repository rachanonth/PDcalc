import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Calculator from './Calculator';
import Calculatorplus from './Calcplus';
import Emerdrug from './EmergencyDrugCalculator';
import Cguide from './Cguide';
import Calcpack from './Calcpack';
import './style.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        {<Calculator />}
      </div>
    ),
  },
  {
    path: "cguide",
    element: (
      <div>
        {<Cguide />}
      </div>
    ),
  },
  ,
  {
    path: "calcpack",
    element: (
      <div>
        {<Calcpack />}
      </div>
    ),
  },
  ,
  {
    path: "emerdrug",
    element: (
      <div>
        {<Emerdrug />}
      </div>
    ),
  },
  {
    path: "plus",
    element: (
      <div>
        {<Calculatorplus />}
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

export default App;