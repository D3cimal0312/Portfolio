import { useState } from "react";

const CopyToClipboard = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="cursor-pointer">
      {copied ? "Copied!" : children}
    </button>
  );
};

export default CopyToClipboard;