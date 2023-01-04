import { Button } from '@douyinfe/semi-ui';
import { useMemoizedFn } from 'ahooks';
import React, { createContext } from 'react';
import { Children } from './children';

export const MoreMenuContext = createContext<any>(1);

const GlobalApi = () => {
  // const context = useContext(MoreMenuContext);

  const handleClick = useMemoizedFn(() => {
    // console.log('context', context);
  });

  return (
    <MoreMenuContext.Provider value={2}>
      <Button onClick={handleClick}>GlobalApi</Button>
      <Children />
    </MoreMenuContext.Provider>
  );
};

export default React.memo(GlobalApi);
