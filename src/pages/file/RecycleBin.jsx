import { ProTable } from '@ant-design/pro-components';
import { Button, Tooltip, Popconfirm, App } from 'antd';
import { useRef } from 'react';
import { useSearchParams } from 'react-router';
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  removeEmptyValues,
  searchParamsToObject,
  onlyPageParams,
} from '@/utils/common/object_util';
import {
  getRecycledFileList,
  restoreFile,
  permanentDeleteFile,
} from '@/api/pages/file';

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
      title: t('file.original_file_name'),
      dataIndex: 'original_file_name',
      key: 'original_file_name',
      valueType: 'text',
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
          <Tooltip
            key="restore"
            title={t('table.restore', { name: t('file.table_name') })}
          >
            <Popconfirm
              title={t('table.restore', { name: t('file.table_name') })}
              description={t('table.restore_tips', {
                name: t('file.table_name'),
              })}
              onConfirm={() => {
                batchRestoreData([record?.id]);
              }}
            >
              <Button
                variant="solid"
                color="green"
                shape="circle"
                icon={<RedoOutlined />}
              />
            </Popconfirm>
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
      const initRes = await getRecycledFileList(params);
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

  // 删除逻辑
  const deleteData = async (id) => {
    const delRes = await permanentDeleteFile(id);
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

  // 恢复逻辑
  const restoreData = async (id) => {
    const delRes = await restoreFile(id);
    if (delRes?.code === 0) {
      return delRes?.data;
    }
    throw delRes?.data;
  };

  // 批量恢复逻辑
  const batchRestoreData = async (ids) => {
    try {
      await Promise.all(ids.map((id) => restoreData(id)));
      message.success(t('table.restore_success'));
    } catch (error) {
      console.error('Error restoring File:', error);
      message.error(t('table.restore_error'));
    } finally {
      tableRef.current.reload();
    }
  };
  const tableRef = useRef();
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
            <div className="flex gap-4">
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
              <Button
                key="batchRestore"
                variant="solid"
                color="green"
                onClick={() => {
                  modal.confirm({
                    title: t('table.restore', { name: t('file.table_name') }),
                    content: t('table.restore_tips', {
                      name: t('file.table_name'),
                    }),
                    onOk: () => {
                      batchRestoreData(selectedRowKeys);
                    },
                  });
                }}
              >
                {t('table.batch_restore')}
              </Button>
            </div>
          ) : null,
        ]}
      />
    </>
  );
};

export default FileList;
