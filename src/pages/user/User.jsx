import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormUploadButton,
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
} from '@/utils/common/object_util';
import {
  getUserlist,
  getUserDetail,
  deleteUser,
  updateUser,
  addUser,
} from '@/api/pages/user';
import { uploadCustomRequest } from '@/utils/common/upload_util';
import { formatWithFiles } from '@/utils/common/object_util';

const UserList = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // 枚举值定义

  const sexEnum = {
    man: { text: '男', status: 'Processing' },
    woman: { text: '女', status: 'Error' },
    unknown: { text: '未知', status: 'Default' },
  };

  const userRoleEnum = {
    default: { text: '普通用户', status: 'Default' },
    admin: { text: '管理员', status: 'Error' },
    vip: { text: '会员', status: 'Success' },
  };

  const userStatusEnum = {
    enable: { text: '启用', status: 'Success' },
    disable: { text: '禁用', status: 'Error' },
  };

  const columns = [
    {
      title: t('user.id'),
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
      title: t('user.user_name'),
      dataIndex: 'user_name',
      key: 'user_name',
      valueType: 'text',
      width: 120,
      copyable: true,
    },
    {
      title: t('user.user_avatar'),
      dataIndex: 'user_avatar',
      key: 'user_avatar',
      valueType: 'avatar',
      hideInSearch: true,
      width: 120,
    },
    {
      title: t('user.sex'),
      dataIndex: 'sex',
      key: 'sex',
      valueType: 'select',
      width: 120,
      filters: true,
      onFilter: true,
      valueEnum: sexEnum,
    },
    {
      title: t('user.birthday'),
      dataIndex: 'birthday',
      key: 'birthday',
      valueType: 'date',
      width: 120,
      sorter: true,
    },
    {
      title: t('user.age'),
      dataIndex: 'age',
      key: 'age',
      valueType: 'digit',
      hideInForm: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('user.account'),
      dataIndex: 'account',
      key: 'account',
      valueType: 'text',
      width: 120,
      copyable: true,
    },
    {
      title: t('user.self_account'),
      dataIndex: 'self_account',
      key: 'self_account',
      valueType: 'text',
      width: 120,
      copyable: true,
    },
    {
      title: t('user.user_role'),
      dataIndex: 'user_role',
      key: 'user_role',
      valueType: 'select',
      width: 120,
      filters: true,
      onFilter: true,
      valueEnum: userRoleEnum,
    },
    {
      title: t('user.password'),
      dataIndex: 'password',
      key: 'password',
      valueType: 'text',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      hideInSearch: true,
      width: 120,
      copyable: true,
    },
    {
      title: t('user.user_status'),
      dataIndex: 'user_status',
      key: 'user_status',
      valueType: 'select',
      width: 120,
      sorter: true,
      valueEnum: userStatusEnum,
    },
    {
      title: t('user.create_by'),
      dataIndex: 'create_by',
      key: 'create_by',
      valueType: 'digit',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('user.update_by'),
      dataIndex: 'update_by',
      key: 'update_by',
      valueType: 'digit',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('user.create_time'),
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('user.update_time'),
      dataIndex: 'update_time',
      key: 'update_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('user.delete_time'),
      dataIndex: 'delete_time',
      key: 'delete_time',
      valueType: 'dateTime',
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
            title={t('table.edit', { name: t('user.table_name') })}
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
            title={t('table.delete', { name: t('user.table_name') })}
          >
            <Popconfirm
              title={t('table.delete', { name: t('user.table_name') })}
              description={t('table.delete_tips', {
                name: t('user.table_name'),
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
      const initRes = await getUserlist(params);
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
    const delRes = await deleteUser(id);
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
        const updateRes = await updateUser(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await addUser(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await getUserDetail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      message.error(
        t('table.get_details_error', { name: t('user.table_name') }),
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
                    name: t('user.table_name'),
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
              {t('table.add', { name: t('user.table_name') })}
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
            ? t('table.edit', { name: t('user.table_name') })
            : t('table.add', { name: t('user.table_name') })
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
          name="user_name"
          label={t('user.user_name')}
          placeholder={t('table.please_enter', {
            name: t('user.user_name'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('user.user_name'),
              }),
            },
          ]}
        />
        <ProFormUploadButton
          name="user_avatar_files"
          label={t('user.user_avatar')}
          rules={[
            {
              required: true,
              message: t('table.please_upload', {
                name: t('user.user_avatar'),
              }),
            },
          ]}
          fieldProps={{
            customRequest: uploadCustomRequest,
            // 自定义显示已上传的文件
            showUploadList: {
              showRemoveIcon: true,
              showPreviewIcon: true,
            },
          }}
        />
        <ProFormSelect
          name="sex"
          label={t('user.sex')}
          placeholder={t('table.please_select', {
            name: t('user.sex'),
          })}
          width="xl"
          valueEnum={sexEnum}
          rules={[
            {
              required: true,
              message: t('table.please_select', {
                name: t('user.sex'),
              }),
            },
          ]}
        />
        <ProFormDatePicker
          name="birthday"
          label={t('user.birthday')}
          placeholder={t('table.please_select', {
            name: t('user.birthday'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_select', {
                name: t('user.birthday'),
              }),
            },
          ]}
        />
        <ProFormText
          name="account"
          label={t('user.account')}
          placeholder={t('table.please_enter', {
            name: t('user.account'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('user.account'),
              }),
            },
          ]}
        />
        <ProFormText
          name="self_account"
          label={t('user.self_account')}
          placeholder={t('table.please_enter', {
            name: t('user.self_account'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('user.self_account'),
              }),
            },
          ]}
        />
        <ProFormSelect
          name="user_role"
          label={t('user.user_role')}
          placeholder={t('table.please_select', {
            name: t('user.user_role'),
          })}
          width="xl"
          valueEnum={userRoleEnum}
          rules={[
            {
              required: true,
              message: t('table.please_select', {
                name: t('user.user_role'),
              }),
            },
          ]}
        />
        <ProFormSelect
          name="user_status"
          label={t('user.user_status')}
          placeholder={t('table.please_select', {
            name: t('user.user_status'),
          })}
          width="xl"
          valueEnum={userStatusEnum}
          rules={[
            {
              required: true,
              message: t('table.please_select', {
                name: t('user.user_status'),
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
        title={t('table.details', { name: t('user.table_name') })}
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

export default UserList;
