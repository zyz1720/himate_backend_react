import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormDigit,
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
  getMessageReadRecordsList,
  getMessageReadRecordsDetail,
  deleteMessageReadRecords,
  updateMessageReadRecords,
  addMessageReadRecords,
} from '@/api/pages/message_read_records';

const MessageReadRecordsList = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // 枚举值定义

  const columns = [
    {
      title: t('message_read_records.id'),
      dataIndex: 'id',
      key: 'id',
      valueType: 'digit',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message_read_records.user_id'),
      dataIndex: 'user_id',
      key: 'user_id',
      valueType: 'text',
      width: 120,
    },
    {
      title: t('message_read_records.message_id'),
      dataIndex: 'message_id',
      key: 'message_id',
      valueType: 'text',
      width: 120,
    },
    {
      title: t('message_read_records.create_time'),
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message_read_records.update_time'),
      dataIndex: 'update_time',
      key: 'update_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message_read_records.create_by'),
      dataIndex: 'create_by',
      key: 'create_by',
      valueType: 'digit',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message_read_records.update_by'),
      dataIndex: 'update_by',
      key: 'update_by',
      valueType: 'digit',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('message_read_records.delete_time'),
      dataIndex: 'delete_time',
      key: 'delete_time',
      valueType: 'dateTime',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
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
            title={t('table.edit', {
              name: t('message_read_records.table_name'),
            })}
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
            title={t('table.delete', {
              name: t('message_read_records.table_name'),
            })}
          >
            <Popconfirm
              title={t('table.delete', {
                name: t('message_read_records.table_name'),
              })}
              description={t('table.delete_tips', {
                name: t('message_read_records.table_name'),
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
      const initRes = await getMessageReadRecordsList(params);
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
      console.error('Error fetching MessageReadRecords list:', error);
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
    const delRes = await deleteMessageReadRecords(id);
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
      console.error('Error deleting MessageReadRecords:', error);
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
        const updateRes = await updateMessageReadRecords(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await addMessageReadRecords(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating or adding MessageReadRecords:', error);
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await getMessageReadRecordsDetail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      console.error('Error fetching MessageReadRecords detail:', error);
      message.error(
        t('table.get_details_error', {
          name: t('message_read_records.table_name'),
        }),
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
                    name: t('message_read_records.table_name'),
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
              {t('table.add', { name: t('message_read_records.table_name') })}
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
            ? t('table.edit', { name: t('message_read_records.table_name') })
            : t('table.add', { name: t('message_read_records.table_name') })
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
        <ProFormDigit
          name="user_id"
          label={t('message_read_records.user_id')}
          placeholder={t('table.please_enter', {
            name: t('message_read_records.user_id'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('message_read_records.user_id'),
              }),
            },
          ]}
        />
        <ProFormDigit
          name="message_id"
          label={t('message_read_records.message_id')}
          placeholder={t('table.please_enter', {
            name: t('message_read_records.message_id'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('message_read_records.message_id'),
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
        title={t('table.details', {
          name: t('message_read_records.table_name'),
        })}
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

export default MessageReadRecordsList;
