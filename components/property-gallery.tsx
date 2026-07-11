'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { PropertyImage } from '@/lib/properties'

export function PropertyGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const mainIndexDefault = Math.max(
    images.findIndex((img) => img.is_main),
    0
  )
  const [activeIndex, setActiveIndex] = useState(mainIndexDefault)
  const [isLightboxOpen, setLightboxOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const activeImage = images[activeIndex]

  const closeLightbox = () => {
    setLightboxOpen(false)
    triggerRef.current?.focus()
  }

  const showPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)
  const showNext = () => setActiveIndex((i) => (i + 1) % images.length)

  useEffect(() => {
    if (!isLightboxOpen) return
    dialogRef.current?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        showPrev()
      } else if (e.key === 'ArrowRight') {
        showNext()
      } else if (e.key === 'Tab') {
        const container = dialogRef.current
        if (!container) return
        const focusable = container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLightboxOpen])

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-cinza-100 font-sans text-sm text-texto-suave">
        Sem fotos disponíveis
      </div>
    )
  }

  return (
    <div>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-cinza-100"
      >
        {isLoading && <div className="absolute inset-0 animate-pulse bg-cinza-100" />}
        <Image
          key={activeImage.id}
          src={activeImage.url}
          alt={title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          onLoad={() => setIsLoading(false)}
          priority
        />
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => {
                setIsLoading(true)
                setActiveIndex(index)
              }}
              aria-label={`Ver foto ${index + 1}`}
              aria-current={index === activeIndex}
              className={`relative h-16 w-20 flex-none overflow-hidden rounded-md border-2 ${
                index === activeIndex ? 'border-acao' : 'border-transparent'
              }`}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de fotos: ${title}`}
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-preto/90 p-4"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Fechar galeria"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-branco/10 text-branco hover:bg-branco/20"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={showPrev}
              aria-label="Foto anterior"
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-branco/10 text-branco hover:bg-branco/20"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
          )}

          <div className="relative h-full max-h-[80vh] w-full max-w-4xl">
            <Image key={activeImage.id} src={activeImage.url} alt={title} fill sizes="100vw" className="object-contain" />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={showNext}
              aria-label="Próxima foto"
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-branco/10 text-branco hover:bg-branco/20"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
