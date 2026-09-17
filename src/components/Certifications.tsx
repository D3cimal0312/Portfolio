
import Title from "./common/Title"
import { CertCard } from "./CertCard"
import { featuredCerts } from "../data/Certi"

export default function Certifications() {
  return (
    <div className="text-white py-12 bg-surface/10 border-b-2 border-lux
      px-4 sm:px-6 md:px-24
    "  id="certifications">
      <Title heading="Certifications" sub_heading="Credentials" />

      <div
        className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3
        border border-lux/50"
      >
        {featuredCerts.map((cert, i) => (
          <CertCard key={i} index={i} {...cert}  />
        ))}
      </div>


      <p className="mt-6 font-mono text-xl uppercase text-lux">
        {featuredCerts.length} credentials &mdash; 2026
      </p>
    </div>
  )
}