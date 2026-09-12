export interface LogoData {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'dark'
  showText?: boolean
  showVersion?: boolean
  version?: string
  className?: string
  href?: string // Optional link URL
}

const sizeClasses = {
  sm: 'h-10 w-auto max-w-[14rem] object-contain',
  md: 'h-14 w-auto max-w-[18rem] object-contain',
  lg: 'h-12 w-auto',
  xl: 'h-16 w-auto'
}


export function renderLogo(data: LogoData = {}): string {
  const {
    size = 'md',
    variant = 'default',
    showText = true,
    showVersion = true,
    version,
    className = '',
    href
  } = data

  const sizeClass = sizeClasses[size]

  // Association logo served by the website's public media route.
  const logoSvg = `
    <img class="${sizeClass} ${className}" src="/files/uploads/e9cd9febfcf6d193954bc.png" alt="Latvian Association of Darwin" />
  `

  const versionBadge = showVersion && version ? `
    <span class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
      variant === 'white'
        ? 'bg-white/10 text-white/80 ring-white/20'
        : 'bg-cyan-50 text-cyan-700 ring-cyan-700/10 dark:bg-cyan-500/10 dark:text-cyan-400 dark:ring-cyan-500/20'
    }">
      ${version}
    </span>
  ` : ''

  const logoContent = showText ? `
    <div class="flex items-center gap-2 ${className}">
      ${logoSvg}
      ${versionBadge}
    </div>
  ` : logoSvg

  // Wrap in link if href is provided
  if (href) {
    return `<a href="${href}" class="inline-block hover:opacity-80 transition-opacity">${logoContent}</a>`
  }

  return logoContent
}
