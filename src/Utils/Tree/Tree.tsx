
import React from 'react';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

const convertToTreeItems = (node: TreeNode): React.ReactNode => (
  <TreeItem key={node.id} nodeId={node.id.toString()} label={node.heading}>
    {node.childs.map((child) => convertToTreeItems(child))}
  </TreeItem>
);

const TreeComponent: React.FC = () => {
  const root = new TreeNode(['Root Value'], 'Root Heading');
  const childNode1 = new TreeNode(['Child Value 1'], 'Child Heading 1');
  const childNode2 = new TreeNode(['Child Value 2'], 'Child Heading 2');

  root.insertChild(childNode1);
  root.insertChild(childNode2);
  childNode1.insertChild(new TreeNode(['Grandchild Value 1'], 'Grandchild Heading 1'));
  childNode1.insertChild(new TreeNode(['Grandchild Value 2'], 'Grandchild Heading 2'));

  return (
    <div>
      <TreeView
        aria-label="tree"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {convertToTreeItems(root)}
      </TreeView>
      {JSON.stringify(root)}
    </div>
  );
};
const convertToTreeDiv = (node: TreeNode,level: number = 0): React.ReactNode => {
  console.log('came hre');
  
  return (
    <div key={node.id} style={{ marginLeft: `${level * 20}px` }} className='m-4 flex flex-row flex-nowrap gap-3'>
    <p>{node.id}</p>
    {node.childs.map((child) => convertToTreeDiv(child, level + 1))}
  </div>
  )
};
export const TreeComponent2: React.FC = () => {
  const root = new TreeNode(['Root Value'], 'Root Heading');
  const childNode1 = new TreeNode(['Child Value 1'], 'Child Heading 1');
  const childNode2 = new TreeNode(['Child Value 2'], 'Child Heading 2');

  root.insertChild(childNode1);
  root.insertChild(childNode2);
  childNode1.insertChild(new TreeNode(['Grandchild Value 1'], 'Grandchild Heading 1'));
  childNode1.insertChild(new TreeNode(['Grandchild Value 2'], 'Grandchild Heading 2'));

  return (
    <div>
      <div>
        {convertToTreeDiv(root)}
      </div>
      <div>
        {JSON.stringify(root)}
      </div>
    </div>
  );
};
export default TreeComponent;

