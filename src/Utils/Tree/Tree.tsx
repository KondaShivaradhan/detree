import React from "react";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export class TreeNode {
  id: number;
  hasChild: boolean;
  heading: string;
  values: string[];
  private static lastId: number = 0;
  childs: TreeNode[];

  constructor(val: string[], head: string) {
    this.id = TreeNode.getNextId();
    this.hasChild = false;
    this.values = val;
    this.heading = head;
    this.childs = [];
  }

  private static getNextId(): number {
    return ++TreeNode.lastId;
  }

  insertValue(newValue: string) {
    this.values.push(newValue);
  }

  insertChild(newValue: TreeNode) {
    if (!this.hasChild) {
      this.hasChild = true;
    }
    this.childs.push(newValue);
  }
}

const convertToTreeDiv = (
  node: TreeNode,
  level: number = 0
): React.ReactNode => {
  console.log(level);
  return (
    <div key={node.id} style={{}} className="m-5">
      <p>{node.id}</p>
      <div>
        {node.values.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
      </div>
      <div className="flex flex-row justify-evenly">
        {node.childs.map((child) => convertToTreeDiv(child, level + 1))}
      </div>
    </div>
  );
};
export const TreeComponent2: React.FC = () => {
  const root = new TreeNode(["Root Value"], "Root Heading");
  const childNode1 = new TreeNode(["Child Value 1"], "Child Heading 1");
  const childNode2 = new TreeNode(["Child Value 2"], "Child Heading 2");
  const childNode3 = new TreeNode(["Child Value 3"], "Child Heading 3");

  root.insertChild(childNode1);
  root.insertChild(childNode2);
  childNode1.insertChild(
    new TreeNode(["Grandchild Value 1"], "Grandchild Heading 1")
  );
  childNode1.insertChild(
    new TreeNode(["Grandchild Value 2"], "Grandchild Heading 2")
  );
  childNode2.insertChild(childNode3);
  return <div>{convertToTreeDiv(root)}</div>;
};
