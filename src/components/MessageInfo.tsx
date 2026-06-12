export default function MessageInfo() {
  return (
    <div
      className="flex flex-col justify-between p-10 border-r"
      style={{ borderColor: "rgba(200,245,0,0.15)" }}
    >
      <div>
        <p className="font-mono  text-sm tracking-[0.25em] uppercase text-lux/50 mb-6 whitespace-nowrap">
          ◆ Available for work
        </p>
        <h2 className="font-mono text-4xl font-black uppercase leading-[1.05] tracking-tight text-white">
          Let's build something
          <br />
          <span className="text-lux"> worth</span>
          <br />
          shipping.
        </h2>
        <p className="mt-8 font-mono text-lg uppercase text-white/30 leading-relaxed  w-full sm:w-full md:max-w-lg">
          Whether it's a full-stack product, a side project, or just a
          conversation — I'm always open to what's next.
        </p>
      </div>

 
    </div>
  );
}