import React from 'react';
import { Table } from 'antd';
import { Link } from '@reach/router';

const actionField = {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <div className="pointer">
      <Link to={'form/' + record.id}>编辑</Link>
    </div>
  ),
};

function GameTable({ data, loading = false, columns }) {
  const _columns = [...columns, actionField];
  return (
    <Table
      rowKey={r => r.id}
      loading={loading}
      boardered
      columns={_columns}
      dataSource={data}
    />
  );
}

export default GameTable;
