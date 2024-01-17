import React, { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  initialText: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle the Enter key to exit editing mode
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent newline on Enter
      setIsEditing(false);
    }
  };

  // // Update the text when exiting editing mode
  // useEffect(() => {
  //   setText(initialText);
  // }, [initialText, isEditing]);

  // // Auto-focus the textarea when entering edit mode
  // useEffect(() => {
  //   if (isEditing && textareaRef.current) {
  //     textareaRef.current.focus();
  //   }
  // }, [isEditing]);

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
