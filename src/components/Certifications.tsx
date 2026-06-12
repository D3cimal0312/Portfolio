
import Title from "./common/Title"
import { CertCard } from "./CertCard"

const featuredCerts = [
  {
    issuer: "Cisco / NetAcad",
    title: "Intro to Cybersecurity",
    sub: "Network Security · Fundamentals",
    link:"/certs/intro_to_cyber_sec.pdf" ,
    verified: true,
  },
  {
    issuer: "HackerRank",
    title: "SQL Basic · Intermediate · Advanced",
    sub: "Database · Query Optimization",
    link: "https://www.hackerrank.com/certificates/c6f92ba739d0",
    verified: true,
  },
  {
    issuer: "HackerRank",
    title: "React (Basic)",
    sub: "Frontend · Component Architecture",
    link: "https://www.hackerrank.com/certificates/c6f92ba739d0",
    verified: true,
  },
  {
    issuer: "Udemy",
    title: "The Complete Full-Stack Web Development Bootcamp",
    sub: "Angela Yu · Full Stack",
    link: "https://www.udemy.com/certificate/UC-fff2559b-935f-4f18-8819-3b500d2ad5b1/",
    verified: true,
  },
  {
    issuer: "Claude / Anthropic",
    title: "Claude 101",
    sub: "AI · Prompt Engineering",
    link: "https://verify.skilljar.com/c/6wktybgptmwq",
    verified: true,
  },
    {
    issuer: "Claude / Anthropic",
    title: "AI Fluency: Framework & Foundations",
    sub: "AI · Prompt Engineering",
    link: "https://verify.skilljar.com/c/scvg82kuuns7",
    verified: true,
  },
    {
    issuer: "Coursera / Packt ",
    title: "Introduction to Python and Basic Selenium Setup",
    sub: "Python · Selenium",
    link: "https://coursera.org/share/f1a5f4dcbc01f95b72060c56c83c1674",
    verified: true,
  },
]

const participationCerts = [
  { label: "Code for Progress",
    link: "/certs/participation/code_for_progress.png",
  },
  { label: "TEDx Participation",
    link: "/certs/participation/tedx.pdf",
  },
]

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