import { useState } from "react";

const prettifyUrl = (url?: string) => {
  if (!url) return "";
  try {
    const u = new URL(url);
    return `${u.hostname}${u.pathname}`.replace(/\/$/, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
};

interface CopyToClipboardProps {
  text: string;
  children?: React.ReactNode;
  urlTrim?: boolean;
  className?: string;
}

const CopyToClipboard = ({
  text,
  children,
  urlTrim = false,
  className = "",
}: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const display = urlTrim && children == null ? prettifyUrl(text) : children;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`cursor-pointer ${className}`}
    >
      {copied ? "Copied!" : display}
    </button>
  );
};

export default CopyToClipboard;