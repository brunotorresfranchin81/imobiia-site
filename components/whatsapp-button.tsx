const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP!

export function WhatsAppButton({ message }: { message?: string }) {
  const href = message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sucesso)] text-branco shadow-lg transition-transform duration-rapida ease-out-custom hover:scale-105"
    >
      <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.353.615 4.646 1.784 6.667L2.667 29.333l6.83-1.752a13.27 13.27 0 0 0 6.507 1.686h.006c7.363 0 13.333-5.97 13.333-13.333S23.367 2.667 16.004 2.667Zm0 24.4a11.03 11.03 0 0 1-5.62-1.537l-.403-.24-4.053 1.04 1.08-3.947-.263-.407a11.02 11.02 0 0 1-1.7-5.876c0-6.107 4.97-11.077 11.063-11.077 2.957 0 5.737 1.153 7.83 3.247a10.99 10.99 0 0 1 3.24 7.833c0 6.107-4.973 11.077-11.074 11.077v-.11Zm6.07-8.294c-.333-.167-1.966-.97-2.27-1.08-.304-.11-.526-.167-.747.167-.22.333-.856 1.08-1.05 1.303-.193.223-.386.25-.72.083-.333-.167-1.406-.518-2.678-1.652-.99-.883-1.66-1.976-1.853-2.31-.194-.333-.02-.514.146-.68.15-.15.334-.39.5-.583.167-.194.223-.334.334-.557.11-.223.055-.417-.028-.583-.083-.167-.746-1.797-1.023-2.46-.27-.647-.543-.56-.746-.57l-.636-.012c-.223 0-.583.083-.888.417-.304.333-1.163 1.137-1.163 2.77 0 1.634 1.19 3.213 1.356 3.434.166.223 2.343 3.577 5.677 5.017.793.343 1.412.548 1.894.702.795.253 1.518.217 2.09.132.638-.095 1.966-.804 2.243-1.58.278-.777.278-1.443.194-1.58-.083-.14-.305-.223-.638-.39Z" />
      </svg>
    </a>
  )
}
