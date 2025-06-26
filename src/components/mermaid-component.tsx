"use client";

import { useEffect, useState } from "react";
import mermaid from "mermaid";

interface MermaidComponentProps {
  children: string;
}

export default function MermaidComponent({ children }: MermaidComponentProps) {
  const [mermaidInitialized, setMermaidInitialized] = useState(false);
  const [svg, setSvg] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const initMermaid = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
        });
        setMermaidInitialized(true);
      } catch (error) {
        console.error("Failed to initialize mermaid:", error);
      }
    };
    initMermaid();
  }, []);

  useEffect(() => {
    if (mermaidInitialized && children) {
      setLoading(true);
      setError("");
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      mermaid
        .render(id, children)
        .then((result) => {
          setSvg(result.svg);
          setLoading(false);
        })
        .catch((error: unknown) => {
          console.error("Mermaid rendering error:", error);
          setError("Failed to render diagram");
          setLoading(false);
        });
    }
  }, [mermaidInitialized, children]);

  if (loading) {
    return (
      <pre className="p-4 rounded">
        <code>{children}</code>
      </pre>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error rendering Mermaid diagram: {error}</p>
        <pre className="mt-2 text-sm">
          <code>{children}</code>
        </pre>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
