import React from "react";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { AVATAR_URL } from "../../common/constant";
import "./index.less";

const name = "GarlicGo Learn React";
const prefix = "cp-layout";

export default function Layout({ children }) {
  const location = useLocation();
  console.log("location", location, location.pathname === "/");

  return (
    <div>
      {location.pathname === "/" ? (
        <div
          className={classnames(`${prefix}-header`, `${prefix}-header-home`)}
        >
          <img src={AVATAR_URL} alt={name} />
          <h1>{name}</h1>
        </div>
      ) : (
        <div
          className={classnames(
            `${prefix}-header`,
            `${prefix}-header-component`
          )}
        >
          {/* <Link href="/">
            <img src={AVATAR_URL} alt={name} />
          </Link>
          <Link href="/">
            <h2>{name}</h2>
          </Link> */}
        </div>
      )}

      <div>{children}</div>
      {location.pathname !== "/" && (
        <div>
          <Link to="/" className={`${prefix}-back`}>
            <div>← Back to home</div>
          </Link>
        </div>
      )}
    </div>
  );
}