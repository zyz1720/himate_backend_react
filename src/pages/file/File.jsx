import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormDigit,
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
  UploadOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  removeEmptyValues,
  searchParamsToObject,
  onlyPageParams,
  formatWithFiles,
} from '@/utils/common/object_util';
import {
  getFileList,
  getFileDetail,
  deleteFile,
  updateFile,
  addFile,
} from '@/api/pages/file';
import { uploadCustomRequest } from '@/utils/common/upload_util';

const FileList = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // 枚举值定义
  const fileTypeEnum = {
    image: { text: '图片', status: 'Default' },
    video: { text: '视频', status: 'Default' },
    audio: { text: '音频', status: 'Default' },
    other: { text: '其它', status: 'Default' },
    document: { text: '文档', status: 'Default' },
  };

  const useTypeEnum = {
    user: { text: '用户使用', status: 'Default' },
    chat: { text: '聊天使用', status: 'Default' },
    group: { text: '群组使用', status: 'Default' },
    system: { text: '系统使用', status: 'Default' },
    music: { text: '音乐使用', status: 'Default' },
    upload: { text: '临时上传', status: 'Default' },
    unknown: { text: '未知', status: 'Default' },
  };

  const columns = [
    {
      title: t('file.id'),
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
      title: t('file.file_type'),
      dataIndex: 'file_type',
      key: 'file_type',
      valueType: 'select',
      width: 120,
      filters: true,
      onFilter: true,
      valueEnum: fileTypeEnum,
    },
    {
      title: t('file.use_type'),
      dataIndex: 'use_type',
      key: 'use_type',
      valueType: 'select',
      width: 120,
      filters: true,
      onFilter: true,
      valueEnum: useTypeEnum,
    },
    {
      title: t('file.file_hash'),
      dataIndex: 'file_hash',
      key: 'file_hash',
      valueType: 'text',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
    },

    {
      title: t('file.file_key'),
      dataIndex: 'file_key',
      key: 'file_key',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
    {
      title: t('file.file_size'),
      dataIndex: 'file_size',
      key: 'file_size',
      valueType: 'digit',
      hideInSearch: true,
      width: 120,
    },
    {
      title: t('file.create_time'),
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('file.create_by'),
      dataIndex: 'create_by',
      key: 'create_by',
      valueType: 'digit',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
    },
    {
      title: t('file.update_by'),
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
      title: t('file.update_time'),
      dataIndex: 'update_time',
      key: 'update_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('file.delete_time'),
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
            title={t('table.edit', { name: t('file.table_name') })}
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
            title={t('table.delete', { name: t('file.table_name') })}
          >
            <Popconfirm
              title={t('table.delete', { name: t('file.table_name') })}
              description={t('table.delete_tips', {
                name: t('file.table_name'),
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
      const initRes = await getFileList(params);
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
      console.error('Error fetching File list:', error);
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
    const delRes = await deleteFile(id);
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
      console.error('Error deleting File:', error);
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
        const updateRes = await updateFile(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await addFile(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating or adding File:', error);
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await getFileDetail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      console.error('Error fetching File detail:', error);
      message.error(
        t('table.get_details_error', { name: t('file.table_name') }),
      );
    }
  };

  const tableRef = useRef();
  const formRef = useRef();
  const isReset = useRef(false);

  const uploadFormRef = useRef();
  const [fileType, setFileType] = useState(null);
  const [useType, setUseType] = useState(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

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
                    name: t('file.table_name'),
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
            <div className="flex gap-4">
              <Button
                key="add"
                variant="solid"
                color="blue"
                icon={<UploadOutlined />}
                onClick={() => {
                  setUploadModalVisible(true);
                }}
              >
                {t('file.upload')}
              </Button>
              <Button
                key="add"
                variant="outlined"
                color="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  addData();
                }}
              >
                {t('table.add', { name: t('file.table_name') })}
              </Button>
            </div>
          ),
        ]}
      />
      {/* 上传文件弹窗： */}
      <ModalForm
        key={'upload'}
        formRef={uploadFormRef}
        labelWidth="auto"
        title={t('file.upload')}
        open={uploadModalVisible}
        submitter={{
          render: () => [],
        }}
        onOpenChange={(visible) => {
          setUploadModalVisible(visible);
          if (!visible) {
            uploadFormRef.current?.resetFields();
            setFileType(null);
            setUseType(null);
          }
        }}
      >
        <ProFormSelect
          name="file_type"
          label={t('file.file_type')}
          placeholder={t('table.please_select', {
            name: t('file.file_type'),
          })}
          width="xl"
          valueEnum={fileTypeEnum}
          onChange={(value) => {
            setFileType(value);
          }}
          rules={[
            {
              required: false,
              message: t('table.please_select', {
                name: t('file.file_type'),
              }),
            },
          ]}
        />
        <ProFormSelect
          name="use_type"
          label={t('file.use_type')}
          placeholder={t('table.please_select', {
            name: t('file.use_type'),
          })}
          width="xl"
          valueEnum={useTypeEnum}
          onChange={(value) => {
            setUseType(value);
          }}
          rules={[
            {
              required: false,
              message: t('table.please_select', {
                name: t('file.use_type'),
              }),
            },
          ]}
        />
        {fileType && useType ? (
          <ProFormUploadButton
            name="file"
            label={t('file.table_name')}
            max={1}
            rules={[
              {
                required: false,
                message: t('table.please_upload', {
                  name: t('file.table_name'),
                }),
              },
            ]}
            fieldProps={{
              customRequest: (fileInfo) =>
                uploadCustomRequest({
                  ...fileInfo,
                  file_type: fileType,
                  use_type: useType,
                }),
              showUploadList: {
                showRemoveIcon: true,
                showPreviewIcon: true,
              },
            }}
          />
        ) : null}
      </ModalForm>
      {/* 新增/编辑弹窗： */}
      <ModalForm
        key={currentRow?.id + 'handle'}
        formRef={formRef}
        labelWidth="auto"
        title={
          currentRow?.id
            ? t('table.edit', { name: t('file.table_name') })
            : t('table.add', { name: t('file.table_name') })
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
        <ProFormSelect
          name="file_type"
          label={t('file.file_type')}
          placeholder={t('table.please_select', {
            name: t('file.file_type'),
          })}
          width="xl"
          valueEnum={fileTypeEnum}
          rules={[
            {
              required: false,
              message: t('table.please_select', {
                name: t('file.file_type'),
              }),
            },
          ]}
        />
        <ProFormSelect
          name="use_type"
          label={t('file.use_type')}
          placeholder={t('table.please_select', {
            name: t('file.use_type'),
          })}
          width="xl"
          valueEnum={useTypeEnum}
          rules={[
            {
              required: false,
              message: t('table.please_select', {
                name: t('file.use_type'),
              }),
            },
          ]}
        />
        <ProFormText
          name="file_key"
          label={t('file.file_key')}
          placeholder={t('table.please_enter', {
            name: t('file.file_key'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('file.file_key'),
              }),
            },
          ]}
        />
        <ProFormDigit
          name="file_size"
          label={t('file.file_size')}
          placeholder={t('table.please_enter', {
            name: t('file.file_size'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('file.file_size'),
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
        title={t('table.details', { name: t('file.table_name') })}
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

export default FileList;
