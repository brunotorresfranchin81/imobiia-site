import Image from 'next/image'

export function WatermarkImage({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-cinza-100">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-media ease-out-custom group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-sans text-sm text-texto-suave">
          Sem foto disponível
        </div>
      )}
      <Image
        src="/logos/logo-sena-marca-dagua.png"
        alt=""
        width={64}
        height={64}
        className="pointer-events-none absolute bottom-2 right-2 h-10 w-10 select-none opacity-30 sm:h-12 sm:w-12"
      />
    </div>
  )
}
