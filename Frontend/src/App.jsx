import React, { useState, useEffect } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import axios from "axios";
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css";

import "./App.css";


function App() {
  const [code, setCode] = useState(`const hello = "Hello World console";
    const greet = (name) => {
      return \`Hello \${name}\`;
    };`);
    const [review , setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    prism.highlightAll();
  });

  async function handleCodeReview() {
    setIsLoading(true); // Start loading
  
    try {
      const response = await axios.post("http://localhost:3000/api/v1/ai/get-review", {
        code,
      });
  
      setReview(response.data.result);
    } catch (error) {
      console.error("Error:", error);
      setReview("An error occurred during code review.");
    } finally {
      setIsLoading(false); // End loading
    }
  }
  

  



  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor: "#282a36",
                borderRadius: "3px",
                fontSize: 16,
              }}
            />
          </div>
          <div role="button" onClick={handleCodeReview} className="review">Code Review</div>
        </div>

        <div className="right">
  <div className="markdown">
    {isLoading ? (
      <div className="loading">Analyzing your code...</div>
    ) : (
      <Markdown rehypePlugins={[rehypeHighlight]}>
        {review}
      </Markdown>
    )}
  </div>
</div>


      </main>
    </>
  );
}

export default App;
