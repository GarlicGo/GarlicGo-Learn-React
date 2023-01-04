import { Button, Modal } from '@douyinfe/semi-ui';
import { useMemoizedFn } from 'ahooks';
import React from 'react';
import {
  render as reactRender,
} from 'rc-util/lib/React/render';

const Add = () => {
  const handleAdd = useMemoizedFn(() => {
    // console.log('handleAdd');
    const container = document.createDocumentFragment();
    // console.log('container', container);
    reactRender(<Modal title="添加组件" visible={true} />, container);
  });

  return (
    <div>
      <Button onClick={handleAdd}>添加组件</Button>
    </div>
  );
};

export default React.memo(Add);
