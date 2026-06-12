import Title from "./common/Title";
import MessageInfo from "./MessageInfo";
import MessageMail from "./MessageMail";

export default function Contact() {
  return (
    <div
      className="bg-black text-white px-12 py-16 border-b-2 border-lux"
      id="contact"
    >
      <Title heading="Contact" sub_heading="Get in Touch" />

      <div
        className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-0"
        style={{ border: "1px solid rgba(200,245,0,0.15)" }}
      >
        <MessageInfo />
        <MessageMail />
      </div>
    </div>
  );
}