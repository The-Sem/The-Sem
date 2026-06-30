import useInView from '../hooks/useInView'

/**
 * The Sem's signature element: a curling line inspired by a citrus peel
 * twist, used as a section divider. It draws itself in gently on scroll.
 */
export default function CitrusDivider({ flip = false, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={`flex justify-center py-6 sm:py-8 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="120"
        height="32"
        viewBox="0 0 120 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={flip ? 'scale-x-[-1]' : ''}
      >
        <path
          d="M2 16 C 20 4, 36 28, 54 16 S 86 4, 104 16"
          stroke="#9CAE91"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: 'stroke-dashoffset 1.1s ease',
          }}
        />
        <circle
          cx="112"
          cy="16"
          r="3"
          fill="#F4A6B7"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.4s ease 0.9s',
          }}
        />
      </svg>
    </div>
  )
}
