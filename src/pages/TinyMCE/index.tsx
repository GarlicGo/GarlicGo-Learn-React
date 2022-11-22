/* eslint-disable camelcase */
import React, { useRef } from "react";
import {} from "file-selector";
import { Editor as EditorComponent } from "@tinymce/tinymce-react";
import { useMemoizedFn } from "ahooks";
import { Editor } from "tinymce";
import { Button } from "@douyinfe/semi-ui";
import {
  MetaFileTypeMap,
  selectFileSync,
} from "../../common/file";
import { devLog } from "../../common/devLog";

const TinyMCE = () => {
  const editorRef = useRef<Editor | null>(null);
  const log = useMemoizedFn(() => {
    if (editorRef.current) {
      devLog(editorRef.current.getContent());
    }
  });
  return (
    <div>
      <h1>富文本系列 TinyMCE</h1>
      <Button onClick={log}>输出编辑器内容</Button>
      <div
        style={{
          margin: "20px 0",
        }}
      >
        <EditorComponent
          apiKey="ig0ljr4km30royiqu92hfb4cdgbddxduwvj089b8el7flei6"
          onInit={(_, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            // menubar: false,
            language: "zh-Hans",
            language_url: "/langs/zh-Hans.js",
            directionality: "ltr",
            menubar: "file edit view insert format tools table help",
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "importcss",
              "autosave",
              "save",
              "directionality",
            ],
            toolbar:
              "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | " +
              "alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor " +
              "backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile " +
              "image media template link anchor codesample | upfile table",
            image_caption: true,
            toolbar_mode: "sliding",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            letterspacing: "0px 2px 4px 6px 24px",
            file_picker_callback: async (callback, _, meta) => {
              const [file] = await selectFileSync({
                accept: MetaFileTypeMap[meta.filetype],
                multiple: false,
              });
              const uri = URL.createObjectURL(file);
              callback(uri, { title: file.name });
            },
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(TinyMCE);
