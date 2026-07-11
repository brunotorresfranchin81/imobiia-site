import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export function Header() {
  return (
    <header className="border-b border-borda bg-branco">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" aria-label="Sena Corretor de Imóveis — página inicial" className="shrink-0">
          <span className="font-heading text-[28px] font-bold uppercase tracking-tight text-texto sm:text-[32px]">
            Sena
          </span>
          <span className="ml-2 border-b-4 border-dourado-600 pb-1 font-heading text-[28px] font-bold uppercase tracking-tight text-texto sm:text-[32px]">
            Corretor de Imóveis
          </span>
        </Link>
        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-6 font-sans text-sm font-medium text-texto">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors duration-rapida hover:text-acao">
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
