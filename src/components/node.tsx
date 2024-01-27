import React, { memo, useContext } from "react";
import { TreeNode } from "../Utils/Tree/Tree";
import { EditableText } from "./editable";
import EditableHeading from "./editHead";
import { MyContext } from "../App";
import { iconsize } from "../Misc/Constants";
interface EditableTextProps {
  node: TreeNode;
  root: TreeNode;
}

const Node: React.FC<EditableTextProps> = ({ node, root }) => {
  const context = useContext(MyContext);
  const isRoot = node.id === root.id;
  return (
    <div
      className={` flex flex-col align-middle justify-center content-center items-center`}
    >
      <div
        className={` ${
          isRoot ? "font-bold" : ""
        } hover:border-accent transform cursor-pointer w-fit self-center border-secondary border-2 p-2 rounded-xl  flex flex-col align-middle justify-center content-center items-center gap-2`}
      >
        <div className="text-center">
          <EditableHeading node={node} root={root} initialText={node.heading} />
        </div>
        <hr />
        {!isRoot && (
          <div className="m-2">
            <EditableText initialText={node.values} />
          </div>
        )}
        <div className="flex flex-row flex-nowrap justify-center gap-4">
          <button
            title="Add New"
            onClick={() => {
              context?.addChild(node);
            }}
            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          >
            <span className="sr-only"> Add New</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={iconsize}
              height={iconsize}
              viewBox="0 0 24 24"
              className="stroke-green-400 fill-none group-hover:fill-green-800 group-active:stroke-green-200 group-active:fill-green-600 group-active:duration-0 duration-300"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke-width="1.5"
              ></path>
              <path d="M8 12H16" stroke-width="1.5"></path>
              <path d="M12 16V8" stroke-width="1.5"></path>
            </svg>
          </button>

          {true && (
            <button
              title="Add New"
              onClick={() => {
                if (!isRoot) context?.removeNode(node);
                window.location.reload();
              }}
              className="group cursor-pointer outline-none -rotate-45 hover:rotate-45 duration-300"
            >
              <span className="sr-only">Delete Node</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={iconsize}
                height={iconsize}
                viewBox="0 0 24 24"
                className="stroke-red-400 fill-none group-hover:fill-red-800 group-active:stroke-red-200 group-active:fill-red-600 group-active:duration-0 duration-300"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke-width="1.5"
                ></path>
                <path d="M8 12H16" stroke-width="1.5"></path>
                <path d="M12 16V8" stroke-width="1.5"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(Node);
