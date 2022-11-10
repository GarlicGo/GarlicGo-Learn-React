import React from 'react';
import { Link } from 'react-router-dom';
import { routers } from '../../router';
import './index.less';

const prefix = 'page-home';

interface GuideItemProps {
  description: string;
  path: string;
  pathName: string;
}

const GuideItem: React.FC<GuideItemProps> = ({
  description,
  path,
  pathName,
}) => {
  return (
    <div>
      {description + ' -> '}
      <Link className={`${prefix}-guide-link`} to={path}>
        <p> {pathName} </p>
      </Link>
    </div>
  );
};

const Home = () => {
  return (
    <div className={prefix}>
      <h1>Home</h1>
      {
        routers.map(({ description, path, pathName }) => (
          <GuideItem
            description={description}
            path={path}
            pathName={pathName}
            key={path}
          />
        ))
      }
    </div>
  );
};

export default Home;
