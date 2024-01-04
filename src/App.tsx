import { useState } from 'react';
import './App.css'
import  { TreeComponent2, TreeNode } from './Utils/Tree/Tree';
const App: React.FC = () => {
  const [tree] = useState<TreeNode>(
    new TreeNode(['Root Value'], 'Root Heading')
  );

  // Inserting child nodes
  const childNode1 = new TreeNode(['Child Value 1'], 'Child Heading 1');
  const childNode2 = new TreeNode(['Child Value 2'], 'Child Heading 2');

  tree.insertChild(childNode1);
  tree.insertChild(childNode2);

  // Inserting values to a node
  childNode1.insertValue('New Value for Child 1');

  return <>
    <TreeComponent2></TreeComponent2>
  </>;
};

export default App
