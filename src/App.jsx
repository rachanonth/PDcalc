import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Calculator from './Calculator';
import Calculatorplus from './Calcplus';
import Emerdrug from './EmergencyDrugCalculator';
import Emoji from './Emoji';
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
    path: "emo",
    element: (
      <div>
        {<Emoji />}
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