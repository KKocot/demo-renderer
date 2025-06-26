"use client";

import { useEffect, useState } from "react";
import mermaid from "mermaid";

interface MermaidComponentProps {
  children: string;
}

export default function MermaidComponent({ children }: MermaidComponentProps) {
  const [mermaidInitialized, setMermaidInitialized] = useState(false);
  const [svg, setSvg] = useState<string>("");
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
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      // Clear previous states
      setError("");
      setSvg("");

      // Clean the content by removing markdown code block wrappers
      let cleanedContent = children.trim();
      const lines = cleanedContent.split("\n");

      // Remove first line if it's ```mermaid or ```
      if (lines[0] && lines[0].trim().match(/^```(?:mermaid)?$/)) {
        lines.shift();
      }

      // Remove last line if it's ```
      if (lines[lines.length - 1] && lines[lines.length - 1].trim() === "```") {
        lines.pop();
      }

      cleanedContent = lines.join("\n").trim();

      if (!cleanedContent) {
        setError("Empty diagram content");
        return;
      }

      mermaid
        .render(id, cleanedContent)
        .then((result) => {
          setSvg(result.svg);
        })
        .catch((error) => {
          console.error("Failed to render mermaid diagram:", error);
          setError("Invalid Mermaid syntax");
        });
    }
  }, [mermaidInitialized, children]);

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded">
        <strong>Mermaid Error:</strong> {error}
      </div>
    );
  }

  return svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : null;
}
