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
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-5 sm:px-6">
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
