import React from "react";
import { useEditor } from "./context/editorContext";
import BlockContainer from "./blockContainer";
import { v4 } from "uuid";

export default function Mapper() {
  const { data, setData, focusNextBlock } = useEditor();

  console.log("data", data);

  return (
    <div className="flex w-full flex-col gap-3">
      {data.map((item, index) => (
        <BlockContainer key={item.id} item={item} index={index} />
      ))}

      <div
        onClick={() => {
          const newBlocks = [...data];
          const id = v4();
          newBlocks.push({
            id,
            type: "paragraph",
            data: {
              text: "",
            },
          });
          setData(newBlocks);
          focusNextBlock(id);
        }}
        className="flex h-16 w-full cursor-text items-center"
      ></div>
    </div>
  );
}
