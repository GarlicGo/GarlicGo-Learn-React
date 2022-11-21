import React from "react";
import cookie from "cookie";
import { Button, Form, Space } from "@douyinfe/semi-ui";
import { useMemoizedFn } from "ahooks";
import { devLog } from "../../common/devLog";

interface KeyVal {
  key: string;
  val?: string;
}

interface KeyValueInputProps {
  type: "Cookie" | "LocalStorage" | "SessionStorage";
  onSubmit?: (values: KeyVal) => void;
}

const KeyValueInput: React.FC<KeyValueInputProps> = ({ type, onSubmit }) => {
  const [key, setKey] = React.useState("");
  return (
    <Form onSubmit={onSubmit}>
      <Space>
        <Form.Input
          field="key"
          onChange={(k) => {
            setKey(k);
          }}
          placeholder="请输入key"
          rules={[{ required: true, message: "key不能为空" }]}
        />
        <Form.Input field="val" placeholder="请输入value" />
        <Button style={{ marginTop: 25 }} htmlType="submit">
          设置{type}
        </Button>
        {type === "Cookie" && (
          <Button
            style={{ marginTop: 25 }}
            onClick={() => {
              document.cookie = `${key}=;expires=${new Date(0).toUTCString()}`;
            }}
          >
            删除Cookie
          </Button>
        )}
        {type === "Cookie" && (
          <Button
            style={{ marginTop: 25 }}
            onClick={() => {
              for (const cookieKey in cookie.parse(document.cookie)) {
                document.cookie = `${cookieKey}=;expires=${new Date(
                  0,
                ).toUTCString()}`;
              }
            }}
          >
            清空Cookie
          </Button>
        )}
        {type === "Cookie" && (
          <Button
            style={{ marginTop: 25 }}
            onClick={() => {
              devLog(cookie.parse(document.cookie));
            }}
          >
            获取Cookie
          </Button>
        )}
      </Space>
    </Form>
  );
};

const ClientStorage = () => {
  const handleCookieSubmit = useMemoizedFn((values: KeyVal) => {
    document.cookie = cookie.serialize(values.key, values.val || "");
  });

  const handleLocalStorageSubmit = useMemoizedFn((values: KeyVal) => {
    localStorage.setItem(values.key || "", values.val || "");
  });

  const handleSessionStorageSubmit = useMemoizedFn((values: KeyVal) => {
    sessionStorage.setItem(values.key || "", values.val || "");
  });

  return (
    <div>
      <h1>客户端存储</h1>
      <KeyValueInput type="Cookie" onSubmit={handleCookieSubmit} />
      <KeyValueInput type="LocalStorage" onSubmit={handleLocalStorageSubmit} />
      <KeyValueInput
        type="SessionStorage"
        onSubmit={handleSessionStorageSubmit}
      />
      <div>IndexedDB... 后续补充</div>
    </div>
  );
};

export default React.memo(ClientStorage);
