import React, { CSSProperties } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import logoStyles from './Logo.module.scss'

export type LogoProps = {
  style?: CSSProperties
  className?: string
  href: string
  title?: string
  inverse?: boolean
}

export const Logo: React.FC<LogoProps> = ({
  style,
  className,
  href,
  title,
  inverse,
}) => {
  const router = useRouter()
  const currentPath = router.asPath

  return (
    <section className={className}>
      <Link href={href}> 
        <button className={logoStyles.logo__button} aria-label={title} onClick={currentPath === href ? () => router.reload() : undefined}>
          <svg
            viewBox="0 0 214.434 39.948"
            className={`${logoStyles.logo ?? ''} ${className ?? ''} ${inverse ? logoStyles.inverse : ''}`}
            style={style}
          >
            <g transform="translate(-216 -93.469)">
              <title>{title}</title>
              <path className={logoStyles.logo__path} d="M5213.979,1675.306c0-11.246,8.8-17.351,17.479-17.351s17.478,6.1,17.478,17.351-8.8,17.35-17.478,17.35S5213.979,1686.551,5213.979,1675.306Zm27.889,0c0-6.876-4.949-10.86-10.41-10.86s-10.475,3.984-10.475,10.86,5.012,10.86,10.475,10.86S5241.869,1682.182,5241.869,1675.306Z" transform="translate(-4941.559 -1559.322)" />
              <path className={logoStyles.logo__path} d="M5307.67,1672.477v19.536h-7.134v-19.149c0-5.4-2.633-8.483-7.069-8.483-4.562,0-7.456,3.084-7.456,8.483v19.149h-7.131v-19.149c0-5.4-2.633-8.483-7.069-8.483-4.562,0-7.518,3.084-7.518,8.483v19.149h-7.069V1658.6h7.069v4.756a10.869,10.869,0,0,1,9.9-5.4,10.7,10.7,0,0,1,10.152,6.1c1.8-3.277,5.461-6.1,11.182-6.1C5302.528,1657.955,5307.67,1662.389,5307.67,1672.477Z" transform="translate(-4945.297 -1559.322)" />
              <path className={logoStyles.logo__path} d="M5317.11,1658.658h7.067v33.416h-7.067Z" transform="translate(-4950.473 -1559.383)" />
              <path className={logoStyles.logo__path} d="M5349.777,1674.981l11.825-16.323h-8.1l-7.951,10.958-7.728-10.958h-8.1l11.946,16.136-.13.174.01.013-12.853,17.093h8.29l8.674-11.888,8.675,11.888h8.289Z" transform="translate(-4951.473 -1559.383)" />
              <g transform="translate(256.512 93.469)">
                <path className={logoStyles.logo__path} d="M5210.443,1663.828v-5.719H5203.7V1652.3h-7.134v31.125c0,5.976,3.6,8.483,8.674,8.483,1.8,0,3.985-.322,5.2-1.35v-5.591a9.05,9.05,0,0,1-3.084.579c-2.634,0-3.661-1.479-3.661-3.407v-18.315Z" transform="translate(-5196.564 -1652.303)" />
              </g>
              <g transform="translate(216 98.633)">
                <path className={logoStyles.logo__path} d="M5180.108,1658.6v2.585a18.319,18.319,0,0,0-10.411-3.227c-8.674,0-17.478,6.1-17.478,17.351s8.8,17.35,17.478,17.35a18.314,18.314,0,0,0,10.411-3.227v2.584h7.068V1658.6Zm-10.411,27.568c-5.461,0-10.473-3.984-10.473-10.86s5.012-10.86,10.473-10.86,10.411,3.984,10.411,10.86S5175.16,1686.165,5169.7,1686.165Z" transform="translate(-5152.219 -1657.955)" />
              </g>
              <g transform="translate(416.029 119.68) rotate(-3)">
                <path className={`${logoStyles.logo__path} ${logoStyles['logo__path--blue']}`} d="M10.162,13.274a7.031,7.031,0,0,0,1.429-1.03A7.318,7.318,0,0,0,13.7,7.311C13.618,4.6,12.542,1.756,9.929.614A7.99,7.99,0,0,0,3.64.676,6.521,6.521,0,0,0,0,6.245,7.414,7.414,0,0,0,.811,9.768a9.308,9.308,0,0,0,.7,1.166A7.92,7.92,0,0,0,10.162,13.274Z" transform="translate(0 0)" />
              </g>
            </g>
          </svg>
        </button>
      </Link>
    </section>
  )
}
