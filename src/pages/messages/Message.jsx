import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
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
  onlyPageParams,
  formatWithFiles,
} from '@/utils/common/object_util';
import {
  getMessageList,
  getMessageDetail,
  deleteMessage,
  updateMessage,
  addMessage,
} from '@/api/pages/message';

const MessageList = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const msgTypeEnum = {
    text: { text: '文本', status: 'Default' },
    image: { text: '图片', status: 'Success' },
    video: { text: '视频', status: 'Success' },
    audio: { text: '音频', status: 'Processing' },
    other: { text: '其它', status: 'Error' },
  };

  const msgStatusEnum = {
    read: { text: '已读', status: 'Success' },
    unread: { text: '未读', status: 'Error' },
  };

  const columns = [
    {
      title: t('message.id'),
      dataIndex: 'id',
      key: 'id',
      valueType: 'digit',
      hideInTable: true,
      hideInForm: true,
      copyable: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message.client_msg_id'),
      dataIndex: 'client_msg_id',
      key: 'client_msg_id',
      valueType: 'text',
      width: 120,
    },
    {
      title: t('message.session_primary_id'),
      dataIndex: 'session_primary_id',
      key: 'session_primary_id',
      copyable: true,
      valueType: 'text',
      width: 120,
    },
    {
      title: t('message.sender_id'),
      dataIndex: 'sender_id',
      key: 'sender_id',
      valueType: 'text',
      width: 120,
    },
    {
      title: t('message.sender_ip'),
      dataIndex: 'sender_ip',
      key: 'sender_ip',
      valueType: 'text',
      width: 120,
      copyable: true,
    },
    {
      title: t('message.content'),
      dataIndex: 'content',
      key: 'content',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: t('message.msg_type'),
      dataIndex: 'msg_type',
      key: 'msg_type',
      valueType: 'select',
      width: 120,
      filters: true,
      onFilter: true,
      valueEnum: msgTypeEnum,
    },
    {
      title: t('message.create_time'),
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message.update_time'),
      dataIndex: 'update_time',
      key: 'update_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message.create_by'),
      dataIndex: 'create_by',
      key: 'create_by',
      valueType: 'digit',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message.update_by'),
      dataIndex: 'update_by',
      key: 'update_by',
      valueType: 'digit',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message.delete_time'),
      dataIndex: 'delete_time',
      key: 'delete_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message.msg_secret'),
      dataIndex: 'msg_secret',
      key: 'msg_secret',
      valueType: 'text',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
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
            title={t('table.edit', { name: t('message.table_name') })}
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
            title={t('table.delete', { name: t('message.table_name') })}
          >
            <Popconfirm
              title={t('table.delete', { name: t('message.table_name') })}
              description={t('table.delete_tips', {
                name: t('message.table_name'),
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
      const initRes = await getMessageList(params);
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
      console.error('Error fetching Message list:', error);
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
    const delRes = await deleteMessage(id);
    if (delRes?.code === 0) {
      return delRes?.data;
    }
    throw delRes?.data;
  };

  // 批量删除逻辑
  const batchDeleteData = async (ids) => {
    try {
      await Promise.all(ids.map((id) => deleteData(id)));
      message.success(t('table.delete_success'));
    } catch (error) {
      console.error('Error deleting Message:', error);
      message.error(t('table.delete_error'));
    } finally {
      tableRef.current.reload();
    }
  };

  // 编辑逻辑
  const onSubmit = async (_form) => {
    try {
      const form = formatWithFiles(_form);
      if (currentRow?.id && form) {
        const updateRes = await updateMessage(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await addMessage(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating or adding Message:', error);
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await getMessageDetail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      console.error('Error fetching Message detail:', error);
      message.error(
        t('table.get_details_error', { name: t('message.table_name') }),
      );
    }
  };

  const tableRef = useRef();
  const formRef = useRef();
  const isReset = useRef(false);

  return (
    <>
      <ProTable
        actionRef={tableRef}
        cardBordered
        scroll={{ x: 1300 }}
        columns={columns}
        rowSelection={true}
        request={async (params = {}) => {
          const newParams = isReset.current
            ? onlyPageParams(params)
            : removeEmptyValues(params);
          setSearchParams(newParams);
          isReset.current = false;
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
        onReset={() => (isReset.current = true)}
        valueEnum={{
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
                    name: t('message.table_name'),
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
              {t('table.add', { name: t('message.table_name') })}
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
            ? t('table.edit', { name: t('message.table_name') })
            : t('table.add', { name: t('message.table_name') })
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
          name="client_msg_id"
          label={t('message.client_msg_id')}
          placeholder={t('table.please_enter', {
            name: t('message.client_msg_id'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('message.client_msg_id'),
              }),
            },
          ]}
        />
        <ProFormText
          name="session_primary_id"
          label={t('message.session_primary_id')}
          placeholder={t('table.please_enter', {
            name: t('message.session_primary_id'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('message.session_primary_id'),
              }),
            },
          ]}
        />
        <ProFormText
          name="sender_id"
          label={t('message.sender_id')}
          placeholder={t('table.please_enter', {
            name: t('message.sender_id'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('message.sender_id'),
              }),
            },
          ]}
        />
        <ProFormText
          name="sender_ip"
          label={t('message.sender_ip')}
          placeholder={t('table.please_enter', {
            name: t('message.sender_ip'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('message.sender_ip'),
              }),
            },
          ]}
        />
        <ProFormTextArea
          name="content"
          label={t('message.content')}
          placeholder={t('table.please_enter', {
            name: t('message.content'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('message.content'),
              }),
            },
          ]}
        />
        <ProFormSelect
          name="msg_type"
          label={t('message.msg_type')}
          placeholder={t('table.please_select', {
            name: t('message.msg_type'),
          })}
          width="xl"
          valueEnum={msgTypeEnum}
          rules={[
            {
              required: false,
              message: t('table.please_select', {
                name: t('message.msg_type'),
              }),
            },
          ]}
        />
      </ModalForm>
      {/* 详情弹窗： */}
      <ModalForm
        key={currentRow?.id + 'view'}
        labelWidth="auto"
        disabled
        title={t('table.details', { name: t('message.table_name') })}
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

export default MessageList;
