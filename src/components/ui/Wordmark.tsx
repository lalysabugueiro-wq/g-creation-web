// El nombre como logo: "G-creati" + "ON" encendido (la G de Guille y el ON de
// "encendido", según la propia marca). No hay archivo de logo todavía.
// `mono`: sobre fondo naranja (Sport) el "ON" no puede ir en naranja, así que
// se marca con un subrayado grueso en el color del texto.
export default function Wordmark({ className = "", mono = false }: { className?: string; mono?: boolean }) {
  return (
    <span className={`poster whitespace-nowrap normal-case ${className}`} aria-label="G-creatiON">
      G-creati
      <span className={mono ? "underline decoration-[0.08em] underline-offset-[0.08em]" : "text-accent"}>ON</span>
    </span>
  );
}
