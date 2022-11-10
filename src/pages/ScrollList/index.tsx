import { useDebounceFn, useInfiniteScroll, useMemoizedFn, useMount, useUnmount } from 'ahooks';
import React, { useRef } from 'react';
import { getDataList } from './api';
import './index.less';

const prefix = 'page-scroll-list';

const Item: React.FC<{ val: string }> = ({ val }) => {
  return (
    <div className={`${prefix}-item`}>
      <div>{val}</div>
    </div>
  );
};

const ScrollList = () => {
  const scrollWatcherRef = useRef(null);

  const { data, loading, loadingMore, loadMore } = useInfiniteScroll(
    (currentData) => getDataList(currentData?.nextId),
    {
      manual: true,
    },
  );

  const handleScroll = useMemoizedFn(() => {
    const { height: screenHeight } = window.screen;
    if (!scrollWatcherRef.current) {
      return;
    }
    const { bottom = 0 } = (scrollWatcherRef.current as any).getBoundingClientRect();
    const farFromListBottomToScreenTop = bottom - screenHeight;
    if (farFromListBottomToScreenTop < 0) {
      loadMore();
    }
  });

  const { run: runScroll } = useDebounceFn(handleScroll, {
    wait: 200,
  });

  useMount(() => {
    window.addEventListener('scroll', runScroll);
    loadMore();
  });

  useUnmount(() => {
    window.removeEventListener('scroll', runScroll);
  });

  return (
    <div className={prefix} onScroll={handleScroll}>
      <h1>ScrollList</h1>
      <div onScroll={handleScroll}>
        {loading ? (
          <div>loading</div>
        ) : (
          data?.list?.map(({ id, content }) => (
            <Item key={id} val={content} />
          ))
        )}
        <div ref={scrollWatcherRef} />
        <div style={{ margin: '10px 0 10px 0' }}>
          {loadingMore ? 'Loading more...' : 'No more'}
        </div>
      </div>
    </div>
  );
};

export default ScrollList;
