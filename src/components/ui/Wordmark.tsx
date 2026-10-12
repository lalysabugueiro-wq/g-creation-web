// El nombre como logo: "G-creati" + "ON" encendido (la G de Guille y el ON de
// "encendido", según la propia marca). No hay archivo de logo todavía.
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`poster whitespace-nowrap normal-case ${className}`} aria-label="G-creatiON">
      G-creati<span className="text-accent">ON</span>
    </span>
  );
}
