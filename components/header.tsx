import Image from 'next/image'
import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/anunciar', label: 'Anuncie seu Imóvel' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export function Header() {
  return (
    <header className="border-b border-borda-dourada bg-header text-header-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-2 sm:px-6 md:flex-row md:justify-between md:py-2">
        <Link href="/" aria-label="Sena Corretor de Imóveis — página inicial" className="shrink-0">
          <Image
            src="/logos/logo-sena-fundo-escuro.png"
            alt="Sena Corretor de Imóveis"
            width={1024}
            height={1024}
            priority
            className="h-28 w-auto md:h-40"
          />
        </Link>
        <nav aria-label="Navegação principal" className="w-full md:w-auto">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-sans text-xs font-medium uppercase tracking-[0.14em] md:gap-x-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center transition-colors duration-rapida hover:text-dourado-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
