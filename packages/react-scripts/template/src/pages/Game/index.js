import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import Table from './Table';
import NotFound from '../404';
import Form from 'components/Form';
import { Router } from '@reach/router';
import { useForm } from 'service/hooks';

// 1. 表单的schema和title，列表的列名
const SCHEMA = [
  {
    key: 'id',
  },
  {
    title: '活动名称',
    key: 'name',
    placeholder: '填入活动名称',
  },
  {
    title: '活动类型',
    key: 'type',
    required: false,
    placeholder: '例如“酒店”',
  },
];

const TITLE = '活动';

const COLUMNS = [
  {
    title: '活动ID',
    dataIndex: 'id',
  },
  {
    title: '活动名称',
    dataIndex: 'name',
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
  },
];

// 此处开始无需变化  --------------------------------------
function Games({ data, load, location, loading }) {
  // 生成和根据path时时变化formData，自定义hooks
  const formData = useForm(SCHEMA, data, location.pathname);
  // 首次加载
  useEffect(() => {
    load();
  }, []);

  function MainPage() {
    return (
      <>
        <Menu load={load} />
        <Table loading={loading} data={data} columns={COLUMNS} />
      </>
    );
  }

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <Router>
        <MainPage path="/" />
        <GameForm path="form/:id" formData={formData} title={TITLE} />
        <NotFound default />
      </Router>
    </div>
  );
}
// 到此无需变化  ------------------------------------------------

// 状态传递
export default connect(
  ({ games, loading }) => ({
    // 表格数据
    data: games,
    // 是否在加载
    loading: loading.models.games,
  }),
  {
    // 加载表格数据
    load: () => ({ type: 'games/fetch' }),
  }
)(Games);

const GameForm = connect(
  null,
  {
    // 新增和修改表格
    add: () => ({ type: 'games/add' }),
    edit: () => ({ type: 'games/edit' }),
  }
)(Form);
