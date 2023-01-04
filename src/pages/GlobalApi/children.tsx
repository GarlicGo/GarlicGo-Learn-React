import { Button } from '@douyinfe/semi-ui';
import { useMemoizedFn } from 'ahooks';
import React from 'react';
import { MoreMenuContext } from '.';

export const Children = () => {
  // const context = useContext(MoreMenuContext);

  const handleClick = useMemoizedFn(() => {
    // console.log('context', context);
  });

  return (
    <MoreMenuContext.Provider value={2}>
      <Button onClick={handleClick}>Children GlobalApi</Button>
    </MoreMenuContext.Provider>
  );
};

