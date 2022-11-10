/* eslint-disable react/no-unknown-property */
import React from 'react';
import RotateBox from './components/RotateBox';
import TestFiber from './components/TestFiber';
import './index.less';

const prefix = 'page-three-js';

interface ShowItemProps {
  title: string;
  description?: string;
  element: React.ReactNode;
}

const ShowItem: React.FC<ShowItemProps> = ({
  title,
  description,
  element,
}) => {
  return (
    <>
      <div className={`${prefix}-item-title`}>
        <h2>{title}</h2>
        <div>{description}</div>
      </div>
      <div className={`${prefix}-item-container`}>
        {element}
      </div>
    </>
  );
};

const ThreeJS = () => {
  return (
    <div className={prefix}>
      <ShowItem title="Fiber Test" element={<TestFiber />} />
      <ShowItem title="Rotate Box" description="@react-three/fiber Readme Demo" element={<RotateBox />} />
    </div>
  );
};

export default ThreeJS;
