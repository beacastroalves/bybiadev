import type { RouteObject } from "react-router-dom";
import Layout from "../pages/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";

// Rotas por locale (vite-react-ssg pré-renderiza cada uma em HTML estático):
//   "/"   → PT-PT (mercado primário + x-default)
//   "/br" → PT-BR
//   "/en" → EN
// O Layout de cada rota fixa a língua e emite canonical/hreflang.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout locale="pt-PT" />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/br",
    element: <Layout locale="pt-BR" />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/en",
    element: <Layout locale="en" />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "*",
    element: <Layout locale="pt-PT" />,
    children: [{ index: true, element: <NotFound /> }],
  },
];

export default routes;
