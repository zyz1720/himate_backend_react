import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Button, Tooltip, Popconfirm, Image, App } from 'antd';
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
  getGroupList,
  getGroupDetail,
  deleteGroup,
  updateGroup,
  addGroup,
} from '@/api/pages/group';
import { uploadCustomRequest } from '@/utils/common/upload_util';
import { FileTypeEnum, FileUseTypeEnum } from '@/constants/database_enum';

const STATIC_URL = import.meta.env.VITE_STATIC_URL;

const GroupList = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // 枚举值定义

  const columns = [
    {
      title: t('group.id'),
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
      title: t('group.group_id'),
      dataIndex: 'group_id',
      key: 'group_id',
      valueType: 'text',
      width: 120,
      copyable: true,
    },
    {
      title: t('group.group_name'),
      dataIndex: 'group_name',
      key: 'group_name',
      valueType: 'text',
      width: 120,
    },

    {
      title: t('group.group_avatar'),
      dataIndex: 'group_avatar',
      key: 'group_avatar',
      width: 120,
      render: (group_avatar) => (
        <Image
          src={`${STATIC_URL}${group_avatar}`}
          alt={t('group.group_avatar')}
          width={40}
        />
      ),
    },
    {
      title: t('group.group_introduce'),
      dataIndex: 'group_introduce',
      key: 'group_introduce',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: t('group.create_time'),
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('group.update_time'),
      dataIndex: 'update_time',
      key: 'update_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('group.create_by'),
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
      title: t('group.update_by'),
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
      title: t('group.delete_time'),
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
            title={t('table.edit', { name: t('group.table_name') })}
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
            title={t('table.delete', { name: t('group.table_name') })}
          >
            <Popconfirm
              title={t('table.delete', { name: t('group.table_name') })}
              description={t('table.delete_tips', {
                name: t('group.table_name'),
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
      const initRes = await getGroupList(params);
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
      console.error('Error fetching Group list:', error);
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
    const delRes = await deleteGroup(id);
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
      console.error('Error deleting Group:', error);
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
        const updateRes = await updateGroup(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await addGroup(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating or adding Group:', error);
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await getGroupDetail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      console.error('Error fetching Group detail:', error);
      message.error(
        t('table.get_details_error', { name: t('group.table_name') }),
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
                    name: t('group.table_name'),
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
              {t('table.add', { name: t('group.table_name') })}
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
            ? t('table.edit', { name: t('group.table_name') })
            : t('table.add', { name: t('group.table_name') })
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
          name="group_id"
          label={t('group.group_id')}
          placeholder={t('table.please_enter', {
            name: t('group.group_id'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('group.group_id'),
              }),
            },
          ]}
        />
        <ProFormText
          name="group_name"
          label={t('group.group_name')}
          placeholder={t('table.please_enter', {
            name: t('group.group_name'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('group.group_name'),
              }),
            },
          ]}
        />
        <ProFormUploadButton
          name="group_avatar_files"
          label={t('group.group_avatar')}
          rules={[
            {
              required: false,
              message: t('table.please_upload', {
                name: t('group.group_avatar'),
              }),
            },
          ]}
          fieldProps={{
            customRequest: (fileInfo) =>
              uploadCustomRequest({
                ...fileInfo,
                file_type: FileTypeEnum.image,
                use_type: FileUseTypeEnum.user,
              }),
            showUploadList: {
              showRemoveIcon: true,
              showPreviewIcon: true,
            },
          }}
        />
        <ProFormTextArea
          name="group_introduce"
          label={t('group.group_introduce')}
          placeholder={t('table.please_enter', {
            name: t('group.group_introduce'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('group.group_introduce'),
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
        title={t('table.details', { name: t('group.table_name') })}
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

export default GroupList;
