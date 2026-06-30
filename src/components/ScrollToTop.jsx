import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls the window to the top whenever the route path changes.
 * Drop this inside <BrowserRouter> (or <HashRouter>) once, in App.jsx,
 * and it silently handles all navigation throughout the site.
 *
 * Uses useLayoutEffect (fires before paint) rather than useEffect, so the
 * jump happens before the new page is visually shown — this avoids any
 * flash of the old scroll position. It also temporarily disables CSS
 * smooth-scroll behavior so the jump is instant even if `html { scroll-
 * behavior: smooth }` is set globally (which would otherwise turn this
 * into a slow animated scroll that can look like it "didn't work").
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    // If there's a hash anchor (e.g. #contact) let the browser handle
    // that scroll naturally instead of forcing it to the very top.
    if (hash) return

    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior

    // Force instant scroll regardless of any global smooth-scroll CSS.
    root.style.scrollBehavior = 'auto'

    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    root.style.scrollBehavior = previousScrollBehavior
  }, [pathname, hash])

  return null
}
