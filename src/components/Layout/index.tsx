import React from 'react';
import classnames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AVATAR_URL } from '../../common/constant';
import './index.less';

const name = 'GarlicGo Learn React';
const prefix = 'cp-layout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className={prefix}>
      {location.pathname === '/' ? (
        <div
          className={classnames(`${prefix}-header`, `${prefix}-header-home`)}
        >
          <img src={AVATAR_URL} alt={name} />
          <h1 className={`${prefix}-header-name`}>{name}</h1>
        </div>
      ) : (
        <div
          className={classnames(
            `${prefix}-header`,
            `${prefix}-header-component`,
          )}
        >
          <Link to="/">
            <img src={AVATAR_URL} alt={name} />
          </Link>
          <Link className={`${prefix}-header-name-page`} to="/">
            <h2 className={`${prefix}-header-name`}>{name}</h2>
          </Link>
        </div>
      )}

      <div className={classnames({
        [`${prefix}-children-layout-home`]: location.pathname === '/',
        [`${prefix}-children-layout-page`]: location.pathname !== '/',
      })}>
        {children}
        {location.pathname !== '/' && (
          <div className={`${prefix}-back`}>
            <Link to="/" className={`${prefix}-back-text`}>
              <div>← Back to home</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
