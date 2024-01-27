import { nanoid } from "nanoid";

export class TreeNode {
  id: string;
  hasChild: boolean;
  heading: string;
  values: string;
  childs: TreeNode[];

  constructor(val: string, head: string, id: number) {
    this.id = nanoid(4);
    this.hasChild = false;
    this.values = val;
    this.heading = head;
    this.childs = [];
  }
  getNextNodeID() {
    return this.getTreeLength() + 1;
  }
  getID() {
    return this.id;
  }

  updateNodeById(targetId: string, newValues: string) {
    if (this.id == targetId) {
      this.values = newValues;
      return true;
    }

    for (const child of this.childs) {
      if (child.updateNodeById(targetId, newValues)) {
        return true;
      }
    }

    return false;
  }
  getTreeLength(): number {
    let length = 1; // Start with the current node
    for (const child of this.childs) {
      length += child.getTreeLength(); // Recursively count the length of each child subtree
    }
    return length;
  }
  private findNodeById(targetId: string): TreeNode | null {
    if (this.id === targetId) {
      return this;
    }

    for (const child of this.childs) {
      const foundNode = child.findNodeById(targetId);
      if (foundNode) {
        return foundNode;
      }
    }
    return null;
  }
  findParentNodeById(
    targetId: string,
    parent: TreeNode | null = null
  ): TreeNode | null {
    if (this.id === targetId) {
      return parent;
    }

    for (const child of this.childs) {
      const result = child.findParentNodeById(targetId, this);
      if (result !== null) {
        return result;
      }
    }

    return null;
  }
  traverse() {
    console.log(this);
  }
  addChildById(targetId: string, newChild: TreeNode) {
    const targetNode = this.findNodeById(targetId);
    if (targetNode) {
      targetNode.childs.push(newChild);
      targetNode.hasChild = true;
      console.log(targetNode);

      // Ensure hasChild is set to true
    } else {
      console.error(`Node with ID ${targetId} not found.`);
      console.log(this);
    }
  }
  removeNodeById(targetId: string): void {
    console.log(`checking ${this.id} with ${targetId}`);
    // find parent
    let parent = this.findParentNodeById(targetId);
    console.log(parent);
    // remove the node to be deleted from the childs of the parent.
    if (parent) {
      parent.childs = parent.childs.filter((child) => child.id !== targetId);
    }
    console.log(parent);

    // const indexToRemove = this.childs.findIndex(
    //   (child) => child.id === targetId
    // );

    // if (indexToRemove !== -1) {
    //   this.childs.splice(indexToRemove, 1);

    //   if (this.childs.length === 0) {
    //     this.hasChild = false;
    //   }
    // } else {
    //   console.log(`Node with id ${targetId} not found.`);
    // }
  }

  updateHeading(targetId: string, newHead: string) {
    if (this.id === targetId) {
      this.heading = newHead;
      return true;
    }

    for (const child of this.childs) {
      if (child.updateHeading(targetId, newHead)) {
        return true;
      }
    }

    return false;
  }
}
