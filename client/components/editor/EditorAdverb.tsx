import React from "react";

import { EditorTranslations } from "../translations";
import { EditorWord } from "./EditorWord";
import { EditorSave } from "./EditorSave";

export const EditorAdverb = () => {
  return (
    <div>
      <EditorWord placeholder="adverb" />
      <EditorTranslations />
      <EditorSave />
    </div>
  );
};
