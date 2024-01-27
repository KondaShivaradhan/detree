import React, { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  initialText: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const replaceWithEmojis = (input: string) => {
    const linesWithN: string[] = [];
    const linesWithP: string[] = [];
    const unknownLines: string[] = [];
    const replacements: { [key: string]: string } = { "/n": "❌", "/p": "✅" };
    if (input.length == 0) {
      unknownLines.push("Add points here ✍ ");
      return { linesWithN, linesWithP, unknownLines };
    }
    const replacedString = Object.entries(replacements).reduce(
      (acc, [key, value]) => acc.replace(new RegExp(key, "g"), value),
      input
    );

    const lines = replacedString.split("\n");
    lines.forEach((line) => {
      if (line.includes("❌")) {
        linesWithN.push(line);
      } else if (line.includes("✅")) {
        linesWithP.push(line);
      } else {
        unknownLines.push("🤷 " + line);
      }
    });

    return { linesWithN, linesWithP, unknownLines };
  };
  const { linesWithN, linesWithP, unknownLines } = replaceWithEmojis(text);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setIsEditing(false);
    }
  };

  return (
    <div onClick={() => setIsEditing(true)} className="p-2 max-w-sm text-text">
      {isEditing ? (
        <textarea
          style={{ height: 200 }}
          className="min-w-fit bg-transparent p-3 text-center focus:outline-accent focus:outline-1"
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <div>
          <div>
            {/* <h3>Lines with ✔️ (check emoji):</h3> */}
            {linesWithP.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div>
            {/* <h3>Lines with ❌ (negative emoji):</h3> */}
            {linesWithN.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div>
            {/* <h3>Lines with ❌ (negative emoji):</h3> */}
            {unknownLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
