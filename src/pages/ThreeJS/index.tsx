/* eslint-disable react/no-unknown-property */
import classNames from 'classnames';
import React from 'react';
import RotateBox from './components/RotateBox';
import TwoDimPlane from './components/TwoDimPlane';
import ThreeDimPlane from './components/ThreeDimPlane';
import ThreeDimMove from './components/ThreeDimMove';
import ThreeDimPlaneLock from './components/ThreeDimPlaneLock';
import './index.less';

const prefix = 'page-three-js';

interface ShowItemProps {
  title: string;
  description?: string;
  element: React.ReactNode;
  hasBorder?: boolean;
}

const ShowItem: React.FC<ShowItemProps> = ({
  title,
  description,
  element,
  hasBorder = true,
}) => {
  return (
    <>
      <div className={`${prefix}-item-title`}>
        <h2>{title}</h2>
        <div>{description}</div>
      </div>
      <div className={classNames({
        [`${prefix}-item-container`]: hasBorder,
      })}>
        {element}
      </div>
    </>
  );
};

const ThreeJS = () => {
  return (
    <div className={prefix}>
      <div>
        本节内容技术栈：TypeScript、React、ThreeJS、@react-three/fiber、@react-three/drei。
      </div>
      <ShowItem
        title="Rotate Box"
        // description="@react-three/fiber README Demo"
        element={<RotateBox />}
      />
      <ShowItem
        title="3D Camera 维度锁定下的 2D 平面"
        description="快捷键提示：双指(右键)可以拖动画布"
        element={<ThreeDimPlaneLock />}
      />
      <ShowItem
        title="3D Camera 下的 2D 平面"
        element={<TwoDimPlane />}
      />
      <ShowItem
        title="3D Camera 下的 3D 物体"
        element={<ThreeDimPlane />}
      />
      <ShowItem
        title="物体运动"
        element={<ThreeDimMove />}
        hasBorder={false}
      />
    </div>
  );
};

export default ThreeJS;
