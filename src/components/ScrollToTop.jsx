import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Instantly scrolls the window to the top, temporarily disabling CSS
 * smooth-scroll behavior (see `html { scroll-behavior: smooth }` in
 * index.css) so the jump is immediate instead of a slow animated scroll.
 * Exported so any page with its own internal "steps" or "tabs" (e.g.
 * CraftCocktail's 4-step quiz) can reuse the exact same top-scroll
 * behavior on state changes that don't trigger a route change.
 */
export function scrollToTopInstant() {
  const root = document.documentElement
  const previousScrollBehavior = root.style.scrollBehavior

  root.style.scrollBehavior = 'auto'

  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  root.style.scrollBehavior = previousScrollBehavior
}

/**
 * Scrolls the window to the top whenever the route path changes.
 * Drop this inside <BrowserRouter> (or <HashRouter>) once, in App.jsx,
 * and it silently handles all navigation throughout the site.
 *
 * Uses useLayoutEffect (fires before paint) rather than useEffect, so the
 * jump happens before the new page is visually shown — this avoids any
 * flash of the old scroll position.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    // If there's a hash anchor (e.g. #contact) let the browser handle
    // that scroll naturally instead of forcing it to the very top.
    if (hash) return

    scrollToTopInstant()
  }, [pathname, hash])

  return null
}
