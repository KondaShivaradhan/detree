import React, { memo, useContext } from "react";
import { TreeNode } from "../Utils/Tree/Tree";
import { EditableText } from "./editable";
import EditableHeading from "./editHead";
import { MyContext } from "../App";

interface EditableTextProps {
  node: TreeNode;
  root: TreeNode;
}

const Node: React.FC<EditableTextProps> = ({ node, root }) => {
  const context = useContext(MyContext);
  return (
    <div
      className={`border-${true ? "red" : "white"}-600 border-2 p-2 rounded-xl`}
      onClick={() => {
        console.log("clicked this " + node.id);
      }}
    >
      <div className="">
        <EditableHeading node={node} root={root} initialText={node.heading} />
        {node.id}
      </div>
      <hr />
      <div>
        <EditableText initialText={node.values[0]} />
      </div>
      <div>
        <button
          onClick={() => {
            context?.addChild(node);
          }}
          className="p-4 bg-green-400"
        >
          Add Child
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            context?.removeNode(node);
          }}
          className="p-4 bg-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default memo(Node);
