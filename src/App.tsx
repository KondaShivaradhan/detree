import React, {
  createContext,
  FC,
  useCallback,
  useReducer,
  useState,
} from "react";
import { TreeNode } from "./Utils/Tree/Tree";
import Node from "./components/node";

interface ContextProps {
  tree: TreeNode | null;
  setTree: React.Dispatch<React.SetStateAction<TreeNode>>;
  addChild: (node: TreeNode) => void;
  removeNode: (id: TreeNode) => void;
}
export const MyContext = createContext<ContextProps | undefined>(undefined);
export const createNewNode = () => {
  const currentTime = new Date().getTime();
  const node = new TreeNode(["New Node"], "New Heading", currentTime % 10000);
  return node;
};
const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return useCallback(() => forceUpdate(), []);
};

const App: FC = () => {
  const forceUpdate = useForceUpdate();
  const root = new TreeNode(["Root Value"], "Root Heading", 1);
  const [tree, setTree] = useState<TreeNode>(root);
  const addChild = useCallback((node: TreeNode) => {
    root.addChildById(node.id, createNewNode());
    forceUpdate();
  }, []);
  const removeNode = useCallback((node: TreeNode) => {
    root.removeNodeById(node.id);
    forceUpdate();
  }, []);

  const convertToTreeDiv = (
    node: TreeNode,
    level: number = 0
  ): React.ReactNode => {
    console.log(level);
    return (
      <div key={node.id} style={{}} className="m-5 w-max">
        <Node root={tree || createNewNode()} node={node} />
        <div className="p-4 flex flex-row justify-between ">
          {node.childs.map((child) => convertToTreeDiv(child, level + 1))}
        </div>
      </div>
    );
  };

  return (
    <MyContext.Provider value={{ tree, setTree, addChild, removeNode }}>
      <div className="w-max m-auto">
        <div>{tree && convertToTreeDiv(tree)}</div>
      </div>
    </MyContext.Provider>
  );
};

export default App;
