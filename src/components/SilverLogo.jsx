import Image from 'next/image'
import Link from 'next/link'

const LOGO_ASPECT = 1020 / 224

/**
 * @param {{ height?: number, className?: string, priority?: boolean, href?: string | null }} props
 */
export function SilverLogo({ height = 40, className = '', priority = false, href = '/' }) {
  const width = Math.round(height * LOGO_ASPECT)

  const image = (
    <Image
      src="/silver-logo.png"
      alt="UCSB SILVER"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`.trim()}
      style={{ height, width: 'auto', maxWidth: `min(100%, ${width}px)` }}
    />
  )

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-silver/50"
      >
        {image}
      </Link>
    )
  }

  return image
}
