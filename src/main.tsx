import './i18n'
import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './router/config'

// Entrada SSG: o vite-react-ssg trata da renderização (StaticRouter no build,
// hidratação no cliente). A página "/" é pré-renderizada para HTML estático.
export const createRoot = ViteReactSSG(
  { routes, basename: __BASE_PATH__ },
)
