import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;



function Field({
  label, name, value, placeholder, onChange, type = "text",
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-sm sm:text-base md:text-xl tracking-[0.15em] sm:tracking-[0.22em] uppercase text-lux">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent font-mono text-sm sm:text-base md:text-lg tracking-wide
          text-white placeholder:text-white/20 outline-none px-3 sm:px-4 py-2.5 sm:py-3
          transition-colors duration-200 "
            style={{ border: "0.5px solid #c8f500" }}

        onFocus={(e) => (e.target.style.borderColor = "rgba(200,245,0,0.6)")}
        onBlur={(e)  => (e.target.style.borderColor = "rgba(200,245,0,0.45)")}
      />
    </div>
  );
}

export default function MessageMail() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          time:       new Date().toLocaleString(),
        },
        PUBLIC_KEY,
      );
      setSent(true);
    } catch(err) {
        console.error("EmailJS error:", err); 
      setError("Something went wrong. Try emailing me directly on anuj.bajracharya0312@gmail.com ");
    } finally {
      setLoading(false);
   
    setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", subject: "", message: "" });
    },10000);
    }
  };

  if (sent) {
    return (
      <div className="p-6 sm:p-8 md:p-10 h-full flex flex-col items-center justify-center gap-4 text-center">
        <span className="font-mono text-base sm:text-lg md:text-xl tracking-[0.15em] sm:tracking-[0.25em] uppercase text-lux/50">
          ◆ Message received
        </span>
        <p className="font-mono text-lg sm:text-xl md:text-2xl font-black uppercase text-white leading-tight">
          I'll be in
          <br />
          <span className="text-lux">touch soon.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name"  name="name"  value={form.name}  placeholder="Your name"      onChange={onChange} />
          <Field label="Email" name="email" value={form.email} placeholder="your@email.com" onChange={onChange} type="email" />
        </div>

        <Field
          label="Subject"
          name="subject"
          value={form.subject}
          placeholder="Project / opportunity / hello"
          onChange={onChange}
        />

        <div className="flex flex-col gap-2">
          <label className="font-mono text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.22em] uppercase text-lux">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="Tell me what you're building..."
            rows={6}
            className="w-full bg-transparent font-mono text-sm sm:text-base md:text-lg tracking-wide
              text-white placeholder:text-white/20 resize-none outline-none px-3 sm:px-4 py-2.5 sm:py-3
              transition-colors duration-200"
            style={{ border: "0.5px solid #c8f500" }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(200,245,0,0.6)")}
            onBlur={(e)  => (e.target.style.borderColor = "rgba(200,245,0,0.45)")}
          />
        </div>

        {error && (
          <p className="font-mono text-sm sm:text-base md:text-lg tracking-wide text-red-400/80">{error}</p>
        )}

        <button
          ref={btnRef}
          type="submit"
          disabled={loading}
          className="mt-2 w-full font-mono text-sm sm:text-base md:text-xl tracking-[0.2em] sm:tracking-[0.35em] md:tracking-[0.5em] uppercase
            border border-lux font-bold py-3 sm:py-3.5 md:py-4 text-black hover:text-lux bg-lux
            hover:bg-black transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send message ↗"}
        </button>
      </form>
    </div>
  );
}