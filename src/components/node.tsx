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
  const isRoot = node.id === root.id;
  return (
    <div
      className={` flex flex-col align-middle justify-center content-center `}
      onClick={() => {
        console.log("clicked this " + node.id);
      }}
    >
      <div
        className={` ${
          isRoot ? "font-bold" : ""
        } hover:bg-gray-200 cursor-pointer w-fit self-center border-${
          true ? "red" : "white"
        }-600 border-2 p-2 rounded-xl`}
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
            className="p-2 bg-green-400"
          >
            Add Child
          </button>

          <button
            onClick={() => {
              context?.removeNode(node);
            }}
            className="p-2 bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default memo(Node);
