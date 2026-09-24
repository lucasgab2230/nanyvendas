/**
 * Banner da maleta.
 *
 * O pedido original era um banner com a foto da maleta aberta com as semijoias.
 * Como as fotos reais ainda não existem, aqui está a arte vetorial que ocupa
 * exatamente o mesmo espaço — com a moldura tracejada marcando onde a foto
 * entra depois. Trocar por <img src="/images/maleta.jpg" /> quando ela chegar.
 */
export function SuitcaseArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 620 470"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="maleta-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a5c1c" />
          <stop offset="40%" stopColor="#ebd79a" />
          <stop offset="72%" stopColor="#c9a24a" />
          <stop offset="100%" stopColor="#8a6a21" />
        </linearGradient>
        <radialGradient id="maleta-glow" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#c9a24a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c9a24a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="maleta-velvet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#221d15" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#100d0a" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      <ellipse cx="310" cy="240" rx="300" ry="200" fill="url(#maleta-glow)" />

      <g stroke="url(#maleta-gold)">
        {/* alça e tampa aberta */}
        <path d="M270 96c12-26 68-26 80 0" />
        <rect x="150" y="96" width="320" height="132" rx="10" fill="url(#maleta-velvet)" />
        <rect x="166" y="112" width="288" height="100" rx="6" opacity="0.4" />
        {/* colares pendurados na tampa */}
        <path d="M214 124c0 46 32 78 74 78" opacity="0.85" />
        <path d="M250 144l12 16-12 30-12-30 12-16Z" opacity="0.85" />
        <path d="M340 122c0 40 26 66 58 66s58-26 58-66" opacity="0.7" />
        <path d="M398 190l-10 16 10 24 10-24-10-16Z" opacity="0.7" />
        <circle cx="312" cy="150" r="9" opacity="0.5" />

        {/* corpo da maleta */}
        <rect x="118" y="228" width="384" height="200" rx="12" fill="url(#maleta-velvet)" />
        <rect x="136" y="246" width="348" height="164" rx="8" opacity="0.35" />

        {/* revestimento dos anéis */}
        <rect x="156" y="330" width="196" height="62" rx="8" />
        <path d="M156 352h196" opacity="0.35" />
        <circle cx="186" cy="352" r="11" />
        <circle cx="226" cy="352" r="11" />
        <circle cx="266" cy="352" r="11" />
        <circle cx="306" cy="352" r="11" />
        <path d="M300 341l6-9 6 9-6 9-6-9Z" opacity="0.8" />

        {/* brincos à direita */}
        <circle cx="396" cy="286" r="17" />
        <circle cx="396" cy="286" r="11" opacity="0.35" />
        <path d="M388 302l8 22 8-22" opacity="0.8" />
        <circle cx="444" cy="300" r="13" />
        <path d="M438 312l6 20 6-20" opacity="0.7" />

        {/* pulseiras */}
        <ellipse cx="252" cy="288" rx="52" ry="26" />
        <ellipse cx="252" cy="288" rx="44" ry="20" opacity="0.35" />
        <path d="M200 288h104" opacity="0.2" />

        {/* fechos */}
        <rect x="196" y="420" width="34" height="14" rx="3" />
        <rect x="390" y="420" width="34" height="14" rx="3" />
        <path d="M196 228v-6M424 228v-6" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Moldura tracejada + etiqueta que marca o espaço da foto real. */
export function PhotoSlotLabel({
  label = "Foto real entra aqui",
  hint,
  className,
}: {
  label?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={`photo-slot pointer-events-none flex flex-col items-center justify-center gap-1 px-4 py-3 text-center ${className ?? ""}`}>
      <span className="font-sans text-[10px] tracking-[0.22em] text-gold/80 uppercase">{label}</span>
      {hint && <span className="font-sans text-[10px] text-muted-foreground">{hint}</span>}
    </div>
  );
}
