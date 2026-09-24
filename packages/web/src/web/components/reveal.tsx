import type { ReactNode } from "react";

/**
 * Entrada escalonada das seções.
 *
 * A animação roda no carregamento (CSS puro, `animation-fill-mode: both`) em vez
 * de depender de scroll: assim o conteúdo nunca fica invisível — nem em captura
 * de página inteira, nem para quem chega com a página rolada. O atraso é
 * limitado para a última seção já estar no lugar pouco depois do load.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  return (
    <Tag className={`rise ${className ?? ""}`} style={{ animationDelay: `${Math.min(delay, 420)}ms` }}>
      {children}
    </Tag>
  );
}
