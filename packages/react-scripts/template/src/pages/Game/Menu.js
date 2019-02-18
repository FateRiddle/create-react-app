import React from 'react';
import { Button } from 'antd';
import { Link } from '@reach/router';

function Menu({ load }) {
  return (
    <div className="mb3 flex justify-end">
      <Button type="primary" className="mr2">
        <Link to="form/new">+</Link>
      </Button>
      <Button onClick={load}>刷新</Button>
    </div>
  );
}

export default Menu;
