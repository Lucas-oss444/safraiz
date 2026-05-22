import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import HomeWrapper from "./components/HomeWrapper";
import Login from "./components/Login";
import Inventario from "./components/Inventario";
import Suporte from "./components/Suporte";
import AprenderWrapper from "./components/AprenderWrapper";
import FigmaMockup from "./components/FigmaMockup";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomeWrapper,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "inventario",
        Component: Inventario,
      },
      {
        path: "suporte",
        Component: Suporte,
      },
      {
        path: "aprender",
        Component: AprenderWrapper,
      },
      {
        path: "mockup",
        Component: FigmaMockup,
      },
    ],
  },
]);
