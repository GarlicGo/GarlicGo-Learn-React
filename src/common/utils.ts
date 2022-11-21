export const getFileExtension = (filename: string) => {
  return filename.substring(filename.lastIndexOf('.') + 1);
};
