export const MetaFileTypeMap: Record<string, string> = {
  image: "image/*",
  file: "*",
};

interface selectFileProps {
  accept?: string;
  multiple?: boolean;
  onFileSelect: (files: File[]) => void;
}

export const selectFile = (props: selectFileProps) => {
  const { accept = "", multiple = false, onFileSelect } = props;
  const input = document.createElement("input");
  input.type = "file";
  input.accept = accept;
  input.multiple = multiple;
  input.onchange = () => {
    if (input.files) {
      onFileSelect(Array.from(input.files));
    }
  };
  input.click();
};

type selectFilePromiseProps = Omit<selectFileProps, "onFileSelect">;

export const selectFileSync = (props: selectFilePromiseProps) => {
  return new Promise<File[]>((resolve) => {
    selectFile({ ...props, onFileSelect: resolve });
  });
};

