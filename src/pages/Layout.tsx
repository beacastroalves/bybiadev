import { Outlet } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

// Layout raiz do site: fornece a instância i18n e renderiza a rota ativa.
// Usado pelo vite-react-ssg (SSG) — o Outlet recebe Home ou NotFound.
export default function Layout() {
  return (
    <I18nextProvider i18n={i18n}>
      <Outlet />
    </I18nextProvider>
  );
}
