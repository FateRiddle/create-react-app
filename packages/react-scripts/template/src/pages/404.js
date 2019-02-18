import React from 'react';
import { Link } from '@reach/router';
import { Button } from 'antd';

function NotFound() {
  return (
    <div
      style={{ minHeight: 360 }}
      className="bg-white flex flex-column items-center justify-center"
    >
      <div className="mb4">404 Not Found</div>
      <Link to="/game">
        <Button type="primary">返回</Button>
      </Link>
    </div>
  );
}

export default NotFound;
