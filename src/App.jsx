import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Calculatorplus from './Calcplus';
import Emerdrug from './EmergencyDrugCalculator';
import Calcpack from './Calcpack';
import Info from './Info';
import Navigation from './Navigation';
import './style.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="app-container">
        <Calculatorplus />
        <Navigation />
      </div>
    ),
  },
  {
    path: "calcpack",
    element: (
      <div className="app-container">
        <Calcpack />
        <Navigation />
      </div>
    ),
  },
  {
    path: "emerdrug",
    element: (
      <div className="app-container">
        <Emerdrug />
        <Navigation />
      </div>
    ),
  },
  {
    path: "info",
    element: (
      <div className="app-container">
        <Info />
        <Navigation />
      </div>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;