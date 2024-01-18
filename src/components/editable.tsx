import React, { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  initialText: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setIsEditing(false);
    }
  };

  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};
