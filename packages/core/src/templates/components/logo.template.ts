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
  sm: 'h-6 w-auto',
  md: 'h-8 w-auto',
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

  // Custom Latvians of Darwin logo
  const logoSvg = `
    <svg class="${sizeClass} ${className}" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
      <g transform="translate(200, 90)" text-anchor="middle">
        <text x="0" y="-30" font-size="48" font-weight="700" fill="${variant === 'white' ? '#ffffff' : variant === 'dark' ? '#1f2937' : 'currentColor'}" letter-spacing="2">Latvians Of</text>
        <line x1="-80" y1="5" x2="80" y2="5" stroke="${variant === 'white' ? '#ffffff' : variant === 'dark' ? '#1f2937' : 'currentColor'}" stroke-width="2" opacity="0.3"></line>
        <text x="0" y="50" font-size="48" font-weight="700" fill="${variant === 'white' ? '#ffffff' : variant === 'dark' ? '#1f2937' : 'currentColor'}" letter-spacing="2">Darwin</text>
      </g>
    </svg>
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