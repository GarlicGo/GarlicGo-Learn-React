import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Button, Input, Notification, Space } from '@douyinfe/semi-ui';
import { useMemoizedFn } from 'ahooks';
import { getFileExtension } from '../../common/utils';

const FileSaver = () => {
  const [url, setUrl] = React.useState('');
  const [progress, setProgress] = React.useState(0);

  const handleDownload = useMemoizedFn(() => {
    if (!url) {
      Notification.warning({
        title: '请输入下载地址',
        position: 'top',
      });
      return;
    }

    saveAs(url);
  });

  const handleDownloadBigFile = useMemoizedFn(() => {
    if (!url) {
      Notification.warning({
        title: '请输入下载地址',
        position: 'top',
      });
      return;
    }
    axios({
      url,
      responseType: 'blob',
      method: 'GET',
      onDownloadProgress: (progressEvent) => {
        if (!progressEvent || !progressEvent.total) {
          return;
        }
        const percentComplete = progressEvent.loaded / progressEvent.total;
        setProgress(percentComplete * 100);
      },
    })
      .then((res) => {
        const blob = new Blob([res.data]);
        // 创建 url 并指向 blob
        const blobUrl = window.URL.createObjectURL(blob);
        saveAs(blobUrl, `下载文件${Date.now()}.${getFileExtension(url)}`);
      })
      .catch((err) => {
        Notification.error({
          title: '下载出错',
          position: err.message,
        });
      });
  });

  const handleDownBlobFile = useMemoizedFn(() => {
    // const url = 'https://xcyy.nwpu.edu.cn/api/admin/list/excel';
    // if (!url) {
    //   Notification.warning({
    //     title: '请输入下载地址',
    //     position: 'top',
    //   });
    //   return;
    // }
    axios({
      url: 'https://xcyy.nwpu.edu.cn/api/admin/list/excel',
      responseType: 'blob',
      method: 'post',
    })
      .then(() => {
        // const blob = new Blob([res.data]);
        // // 创建 url 并指向 blob
        // const blobUrl = window.URL.createObjectURL(blob);
        // saveAs(blobUrl, `下载文件${Date.now()}.${getFileExtension(url)}`);
        // let data = res;
      })
      .catch(() => {
        // console.log('err', err);
      });
  });

  // https://xcyy.nwpu.edu.cn/api/admin/list/excel

  return (
    <div>
      <h1>文件下载</h1>
      <Input
        placeholder="请输入下载地址"
        style={{ marginBottom: 20 }}
        onChange={(text: string) => {
          setUrl(text);
        }}
      />
      <Space spacing="loose">
        <Button onClick={handleDownload}>下载</Button>
        <Button onClick={handleDownloadBigFile}>大文件下载（显示进度）</Button>
        {progress > 0 && <span>下载进度{progress.toFixed(2)}%</span>}
      </Space>
      <div>
        二进制流
        <Button onClick={handleDownBlobFile}>下载</Button>
      </div>
    </div>
  );
};

export default React.memo(FileSaver);
