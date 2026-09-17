import Title from "./common/Title";
import MessageInfo from "./MessageInfo";
import MessageMail from "./MessageMail";


export default function Contact() {
  return (
    <div
      className="bg-surface text-white 
         px-4 sm:px-6 md:px-24
       py-16 border-b-2 border-lux"
      id="contact"
    >
      <Title heading="Contact" sub_heading="Get in Touch" />

      <div
        className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-0
        border border-lux/50"
        data-aos="fade-up"
      >
        <MessageInfo />
        <MessageMail />
      </div>
    </div>
  );
}