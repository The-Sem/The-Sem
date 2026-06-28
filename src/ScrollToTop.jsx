import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls the window to the top whenever the route path changes.
 * Drop this inside <BrowserRouter> (or <HashRouter>) once, in App.jsx,
 * and it silently handles all navigation throughout the site.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash anchor (e.g. #contact) let the browser
    // handle that scroll naturally. Otherwise always go to top.
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
