/**
 * 根据图片url转为png文件对象
 * @param url
 * @param imageName
 * @returns {Promise<unknown>}
 */
export function getImageFileFromUrl(url: string, imageName: string) {
  return new Promise((resolve, reject) => {
    let blob = null;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "image/png");
    xhr.responseType = "blob";
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response;
      const imgFile = new File([blob], imageName, { type: "image/png" });
      // 返回结果
      resolve(imgFile);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    // 发送
    xhr.send();
  });
}

export function fileToBuffer(file: File, cb: any) {
  const fr = new FileReader();
  const filename = file.name;
  fr.readAsArrayBuffer(file);
  fr.addEventListener(
    "loadend",
    (e) => {
      cb(e?.target?.result, filename);
    },
    false,
  );
}
