
import Title from "./common/Title"
import { CertCard } from "./CertCard"
import { featuredCerts,participationCerts } from "../data/Certi"

export default function Certifications() {
  return (
    <div className="text-white px-12 py-12 bg-black/10 border-b-2 border-lux"  id="certifications">
      <Title heading="Certifications" sub_heading="Credentials" />

      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ border: "1px solid rgba(200,245,0,0.15)" }}
      >
        {featuredCerts.map((cert, i) => (
          <CertCard key={i} index={i} {...cert}  />
        ))}
      </div>

     <div className="flex gap-3 flex-wrap mt-6">
        {participationCerts.map(({ label, link }) => (
          <a href={link}
            target="_blank"
            rel="noopener noreferrer"
            key={label}
          >
            <div
              className="font-mono text-lg tracking-[0.2em] uppercase text-white/40 px-4 py-2
                border-[0.5px] border-lux/40 hover:border-lux hover:text-white
                transition-all duration-150"
            >
              {label}
            </div>
          </a>
        ))}
</div>
      <p className="mt-6 font-mono text-xl uppercase text-lux">
        {featuredCerts.length + participationCerts.length} credentials &mdash; 2026
      </p>
    </div>
  )
}