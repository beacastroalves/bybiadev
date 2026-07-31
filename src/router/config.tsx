import type { RouteObject } from "react-router-dom";
import Layout from "../pages/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";

// Rotas em formato compatível com vite-react-ssg (SSG). A rota "/" usa o Layout
// (provider i18n) e tem como filhas a Home (index) e o catch-all 404.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
