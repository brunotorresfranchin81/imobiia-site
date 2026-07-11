import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-preto text-branco">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Image
            src="/logos/logo-sena-fundo-escuro.png"
            alt="Sena Corretor de Imóveis"
            width={160}
            height={160}
            className="h-14 w-auto"
          />
          <p className="mt-3 font-sans text-sm text-cinza-400">CRECI 067.623</p>
        </div>
        <nav aria-label="Links institucionais">
          <ul className="flex flex-col gap-2 font-sans text-sm text-cinza-400 sm:items-end">
            <li>
              <Link href="/imoveis" className="transition-colors duration-rapida hover:text-dourado-600">
                Imóveis
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="transition-colors duration-rapida hover:text-dourado-600">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contato" className="transition-colors duration-rapida hover:text-dourado-600">
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-cinza-600/40 px-4 py-4 text-center font-sans text-xs text-cinza-400 sm:px-6">
        © {new Date().getFullYear()} Sena Corretor de Imóveis. Todos os direitos reservados.
      </div>
    </footer>
  )
}
