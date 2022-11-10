/* eslint-disable react/no-unknown-property */
import React from 'react';
import RotateBox from './components/RotateBox';
import './index.less';

const prefix = 'page-three-js';

const ThreeJS = () => {
  return (
    <div className={prefix}>
      <div className={`${prefix}-item-title`}>
        <h2>Rotate Box</h2>
        <div>@react-three/fiber Readme Demo</div>
      </div>
      <div className={`${prefix}-item-container`}>
        <RotateBox />
      </div>
    </div>
  );
};

export default ThreeJS;
