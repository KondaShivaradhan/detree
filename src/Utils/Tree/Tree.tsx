import React, { useState } from "react";

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

// const convertToTreeDiv = (
//   node: TreeNode,
//   level: number = 0
// ): React.ReactNode => {
//   console.log(level);
//   return (
//     <div key={node.id} style={{}} className="m-5 w-max">
//       <div
//         className="border-red-600 border-2 p-2 rounded-xl"
//         onClick={() => {
//           console.log("clicked this " + node.id);
//         }}
//       >
//         <p className="">
//           {node.heading} - {node.id}
//         </p>
//         <hr />
//         <div>
//           {node.values.map((v, i) => (
//             <p key={i}>{v}</p>
//           ))}
//         </div>
//       </div>
//       <div className="p-4 flex flex-row justify-between ">
//         {node.childs.map((child) => convertToTreeDiv(child, level + 1))}
//       </div>
//     </div>
//   );
// };
// export const TreeComponent: React.FC<{ root: TreeNode }> = ({ root }) => {
//   return <div>{convertToTreeDiv(root)}</div>;
// };
