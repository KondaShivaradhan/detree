import "./App.css";
import { TreeNode } from "./Utils/Tree/Tree";
import { memo, useState } from "react";
const App: React.FC = () => {
  const [selected, setselected] = useState<number | null>();

  const root = new TreeNode(["Root Value"], "Root Heading");
  const childNode1 = new TreeNode(["Child Value 1"], "Child Heading 1");
  const childNode2 = new TreeNode(["Child Value 2"], "Child Heading 2");
  const childNode3 = new TreeNode(
    ["GrandChild Value 3"],
    "GrandChild Heading 3"
  );

  root.insertChild(childNode1);
  root.insertChild(childNode2);
  childNode1.insertChild(
    new TreeNode(["Grandchild Value 1"], "Grandchild Heading 1")
  );
  childNode1.insertChild(
    new TreeNode(["Grandchild Value 2"], "Grandchild Heading 2")
  );
  childNode2.insertChild(childNode3);

  const convertToTreeDiv = (
    node: TreeNode,
    level: number = 0
  ): React.ReactNode => {
    console.log(level);
    return (
      <div key={node.id} style={{}} className="m-5 w-max">
        <div
          className="border-red-600 border-2 p-2 rounded-xl"
          onClick={() => {
            console.log("clicked this " + node.id);
            setselected(node.id);
          }}
        >
          <p className="">
            {node.heading} - {node.id}
          </p>
          <hr />
          <div>
            {node.values.map((v, i) => (
              <p key={i}>{v}</p>
            ))}
          </div>
        </div>
        <div className="p-4 flex flex-row justify-between ">
          {node.childs.map((child) => convertToTreeDiv(child, level + 1))}
        </div>
      </div>
    );
  };
  return (
    <div className="w-max m-auto">
      <div>{convertToTreeDiv(root)}</div>
      <input
        type="text"
        className="p-2 rounded-xl border-2 border-red-200"
        placeholder="type where to "
      />
      <button
        className="mx-4"
        onClick={() => {
          console.log("asdfa");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default memo(App);
