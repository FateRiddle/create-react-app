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
    title: '资源名称',
    key: 'name',
    placeholder: '填入资源名称',
  },
  {
    title: '资源类型',
    key: 'type',
    placeholder: '例如“领券”',
  },
  {
    title: '玩法活动',
    key: 'content',
    placeholder: '必选',
  },
];

const TITLE = '内容';

const COLUMNS = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '资源名称',
    dataIndex: 'name',
  },
  {
    title: '资源类型',
    dataIndex: 'type',
  },
  {
    title: '玩法活动',
    dataIndex: 'content',
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
  },
];

// 此处开始无需变化  --------------------------------------
function Content({ data, load, location, loading }) {
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
        <ContentForm path="form/:id" formData={formData} title={TITLE} />
        <NotFound default />
      </Router>
    </div>
  );
}
// 到此无需变化  ------------------------------------------------

// 状态传递
export default connect(
  ({ content, loading }) => ({
    // 表格数据
    data: content,
    // 是否在加载
    loading: loading.models.content,
  }),
  {
    // 加载表格数据
    load: () => ({ type: 'content/fetch' }),
  }
)(Content);

const ContentForm = connect(
  null,
  {
    // 新增和修改表格
    add: () => ({ type: 'content/add' }),
    edit: () => ({ type: 'content/edit' }),
  }
)(Form);
