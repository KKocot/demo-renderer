"use client";

import Editor from "@/components/editor";
import Renderer from "@/components/renderer";
import { useState, useEffect } from "react";

const Content = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/test-post.md")
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading default content:", error));
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Markdown Editor
          </h3>
          <Editor value={content} onChange={(e) => setContent(e)} />
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Rendered Content
          </h3>
          <div className="overflow-y-auto md:h-[calc(100vh-200px)]  border-2 border-border">
            <Renderer content={content} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Content;
