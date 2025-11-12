import {
  ProTable,
  ModalForm,
  ProForm,
  ProFormText,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Button, Tooltip, Popconfirm, App } from 'antd';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  FileSearchOutlined,
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  removeEmptyValues,
  searchParamsToObject,
} from '@/utils/common/object_util';
import {
  getNewslist,
  getNewsDetail,
  deleteNews,
  updateNews,
  addNews,
} from '@/api/pages/table';
import RichText from '@/components/common/RichText';
import HTMLContainer from '@/components/common/HTMLContainer';

const NewsList = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      copyable: true,
      hideInTable: true,
      search: false,
    },
    {
      title: t('news.keyword'),
      dataIndex: 'keyword',
      key: 'keyword',
      hideInDescriptions: true,
      hideInTable: true,
    },
    {
      title: t('news.title'),
      dataIndex: 'title',
      key: 'title',
      search: false,
    },
    {
      title: t('news.content'),
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      search: false,
      render: (_, record) => (
        <HTMLContainer content={record?.content} maxHeight="80px" />
      ),
    },

    {
      title: t('news.created_at'),
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: t('news.updated_at'),
      dataIndex: 'updated_at',
      key: 'updated_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: t('table.action'),
      valueType: 'option',
      width: 120,
      hideInDescriptions: true,
      fixed: 'right',
      render: (_, record) => {
        if (typeof record !== 'object') {
          return [];
        }
        return [
          <Tooltip key="view" title={t('table.view_details')}>
            <Button
              type="primary"
              shape="circle"
              icon={<FileSearchOutlined />}
              onClick={async () => {
                await getDataDetail(record?.id);
                setViewModalVisible(true);
              }}
            />
          </Tooltip>,
          <Tooltip
            key="edit"
            title={t('table.edit', { name: t('news.table_name') })}
          >
            <Button
              shape="circle"
              variant="solid"
              color="blue"
              icon={<FormOutlined />}
              onClick={() => {
                setCurrentRow(record);
                setHandleModalVisible(true);
              }}
            />
          </Tooltip>,
          <Tooltip
            key="delete"
            title={t('table.delete', { name: t('news.table_name') })}
          >
            <Popconfirm
              title={t('table.delete', { name: t('news.table_name') })}
              description={t('table.delete_tips', {
                name: t('news.table_name'),
              })}
              onConfirm={() => {
                batchDeleteData([record?.id]);
              }}
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>,
        ];
      },
    },
  ];

  // 初始化数据
  const dataInit = async (params) => {
    try {
      const initRes = await getNewslist(params);
      if (initRes?.code !== 0) {
        return {};
      }
      const { data } = initRes;
      return {
        data: data?.list || [],
        total: data?.total || 0,
        success: true,
      };
    } catch (error) {
      console.log('error:', error);
      return {};
    }
  };

  const [handleModalVisible, setHandleModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState({});

  // 新建逻辑
  const addData = async () => {
    setHandleModalVisible(true);
    setCurrentRow({});
  };

  // 删除逻辑
  const deleteData = async (id) => {
    try {
      const delRes = await deleteNews(id);
      if (delRes?.code === 0) {
        return delRes?.data;
      }
      throw delRes?.data;
    } catch (error) {
      console.error('删除失败:', error);
      throw error;
    }
  };

  // 批量删除逻辑
  const batchDeleteData = async (ids) => {
    try {
      await Promise.all(ids.map((id) => deleteData(id)));
      message.success(t('table.delete_success'));
    } catch (error) {
      console.error(error);
      message.error(t('table.delete_error'));
    } finally {
      tableRef.current.reload();
    }
  };

  // 编辑逻辑
  const onSubmit = async (form) => {
    try {
      if (currentRow?.id && form) {
        const updateRes = await updateNews(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await addNews(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await getNewsDetail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tableRef = useRef();
  const formRef = useRef();

  return (
    <>
      <ProTable
        actionRef={tableRef}
        cardBordered
        columns={columns}
        rowSelection={true}
        request={async (params = {}) => {
          const newParams = removeEmptyValues(params);
          setSearchParams(newParams);
          return await dataInit(newParams);
        }}
        form={{
          initialValues: searchParamsToObject(searchParams),
          syncToInitialValues: false,
        }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: true,
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
        toolBarRender={(action, { selectedRowKeys }) => [
          selectedRowKeys?.length > 0 ? (
            <Button
              key="batchDelete"
              danger
              onClick={() => {
                modal.confirm({
                  title: t('table.batch_delete'),
                  content: t('table.batch_delete_tips', {
                    name: t('news.table_name'),
                  }),
                  onOk: () => {
                    batchDeleteData(selectedRowKeys);
                  },
                });
              }}
            >
              {t('table.batch_delete')}
            </Button>
          ) : (
            <Button
              key="add"
              variant="outlined"
              color="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                addData();
              }}
            >
              {t('table.add', { name: t('news.table_name') })}
            </Button>
          ),
        ]}
      />
      {/* 新增/编辑弹窗： */}
      <ModalForm
        key={currentRow?.id + 'handle'}
        formRef={formRef}
        labelWidth="auto"
        title={
          currentRow?.id
            ? t('table.edit', { name: t('news.table_name') })
            : t('table.add', { name: t('news.table_name') })
        }
        open={handleModalVisible}
        onOpenChange={(visible) => {
          setHandleModalVisible(visible);
          if (!visible) {
            setCurrentRow({});
            formRef.current?.resetFields();
          }
        }}
        initialValues={currentRow}
        onFinish={async (values) => {
          return await onSubmit(values);
        }}
      >
        <ProFormText
          name="title"
          label="公告标题"
          placeholder="请输入公告标题"
          width="xl"
          rules={[{ required: true, message: '请输入标题' }]}
        />
        <ProForm.Item
          name="content"
          label="公告内容"
          rules={[{ required: true, message: '请输入正文内容' }]}
        >
          <RichText
            height="400px"
            value={currentRow?.content}
            onChange={(content, delta, source) => {
              if (source === 'user') {
                setCurrentRow({ ...currentRow, content });
                formRef.current?.setFieldsValue({ content });
              }
            }}
          />
        </ProForm.Item>
      </ModalForm>
      {/* 详情弹窗： */}
      <ModalForm
        key={currentRow?.id + 'view'}
        labelWidth="auto"
        disabled
        title={t('table.details', { name: t('news.table_name') })}
        open={viewModalVisible}
        onOpenChange={(visible) => {
          setViewModalVisible(visible);
          if (!visible) {
            setCurrentRow({});
          }
        }}
        submitter={false}
      >
        <ProDescriptions
          column={1}
          dataSource={currentRow}
          emptyText={'-'}
          columns={columns}
        ></ProDescriptions>
      </ModalForm>
    </>
  );
};

export default NewsList;
