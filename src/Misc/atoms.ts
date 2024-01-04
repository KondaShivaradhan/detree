import { atom } from "jotai";
import { TreeNode } from "../Utils/Tree/Tree";

export const TreeAtom = atom<TreeNode | null>(null);
