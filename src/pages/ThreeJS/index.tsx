/* eslint-disable react/no-unknown-property */
import classNames from "classnames";
import React from "react";
import { Tag, Space } from "@douyinfe/semi-ui";
import RotateBox from "./components/RotateBox";
import TwoDimPlane from "./components/TwoDimPlane";
import ThreeDimPlane from "./components/ThreeDimPlane";
import ThreeDimMove from "./components/ThreeDimMove";
import ThreeDimPlaneLock from "./components/ThreeDimPlaneLock";
import "./index.less";

const prefix = "page-three-js";

interface ShowItemProps {
  title: string;
  description?: string;
  newLineDescription?: {
    tag: string;
    text: string;
  };
  element: React.ReactNode;
  hasBorder?: boolean;
}

const ShowItem: React.FC<ShowItemProps> = ({
  title,
  description,
  newLineDescription,
  element,
  hasBorder = true,
}) => {
  return (
    <>
      <div className={`${prefix}-item-title`}>
        <h2 className={`${prefix}-item-title-h`}>{title}</h2>
        <div>{description}</div>
      </div>
      {newLineDescription && (
        <div className={`${prefix}-item-new-line-des`}>
          <Space>
            {newLineDescription.tag && newLineDescription.tag !== "" && (
              <Tag color="blue" type="ghost">{newLineDescription.tag}</Tag>
            )}
            {newLineDescription.text}
          </Space>
        </div>
      )}
      <div
        className={classNames({
          [`${prefix}-item-container`]: hasBorder,
        })}
      >
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
        newLineDescription={{
          tag: "快捷键提示",
          text: "双指缩放(或鼠标滚轮)拖动画布、双指(或鼠标右键)拖动拖动画布",
        }}
        element={<ThreeDimPlaneLock />}
        hasBorder={false}
      />
      <ShowItem
        title="3D Camera 下的 2D 平面"
        newLineDescription={{
          tag: "快捷键提示",
          text: "单指(或鼠标左键)拖动旋转镜头、双指缩放(或鼠标滚轮)拖动画布、双指(或鼠标右键)拖动拖动画布",
        }}
        element={<TwoDimPlane />}
      />
      <ShowItem
        title="3D Camera 下的 3D 物体"
        newLineDescription={{
          tag: "快捷键提示",
          text: "单指(或鼠标左键)拖动旋转镜头、双指缩放(或鼠标滚轮)拖动画布、双指(或鼠标右键)拖动拖动画布",
        }}
        element={<ThreeDimPlane />}
      />
      <ShowItem
        title="物体运动"
        newLineDescription={{
          tag: "快捷键提示",
          text: "单指(或鼠标左键)拖动旋转镜头、双指缩放(或鼠标滚轮)拖动画布、双指(或鼠标右键)拖动拖动画布",
        }}
        element={<ThreeDimMove />}
        hasBorder={false}
      />
    </div>
  );
};

export default ThreeJS;
