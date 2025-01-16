import { ExtensionInterface } from "@/types-d";
import { create } from "zustand";

interface ExtensionState {
  extensionList: ExtensionInterface[];
  setExtensionList: (state: ExtensionInterface[]) => void;
}

const extensionStore = create<ExtensionState>((set) => ({
  extensionList: [],
  setExtensionList: (state: ExtensionInterface[]) =>
    set({ extensionList: state }),
}));

export default extensionStore;
