import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { TreeAtom } from "../Misc/atoms";
import { TreeNode } from "../Utils/Tree/Tree";

interface EditableTextProps {
  initialText: string;
  root: TreeNode;
  node: TreeNode;
}

const EditableHeading: React.FC<EditableTextProps> = ({
  initialText,
  node,
  root,
}) => {
  const [treeA, setAtom] = useAtom(TreeAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const resetAtom = () => {
    root?.updateHeading(node.id, text);
    console.log(treeA);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      resetAtom();
    }
  };
  useEffect(() => {}, [text]);
  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setIsEditing(false);
            resetAtom();
          }}
          autoFocus
        />
      ) : (
        <span className="font-bold">{text}</span>
      )}
    </div>
  );
};

export default EditableHeading;
