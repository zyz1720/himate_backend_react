import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormDigit,
  ProFormTextArea,
  ProFormSelect,
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
  SyncOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  removeEmptyValues,
  searchParamsToObject,
  onlyPageParams,
  formatWithFiles,
} from '@/utils/common/object_util';
import {
  getFavoritesList,
  getFavoritesDetail,
  deleteFavorites,
  updateFavorites,
  addFavorites,
  syncFavorites,
} from '@/api/pages/favorites';
import { uploadCustomRequest } from '@/utils/common/upload_util';
import { FileTypeEnum, FileUseTypeEnum } from '@/constants/database_enum';

const THUMBNAIL_URL = import.meta.env.VITE_THUMBNAIL_URL;

const FavoritesList = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // 枚举值定义
  const whetherStatusEnum = {
    yes: { text: '是', status: 'Success' },
    no: { text: '否', status: 'Error' },
  };

  const columns = [
    {
      title: t('favorites.id'),
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
      title: t('favorites.favorites_name'),
      dataIndex: 'favorites_name',
      key: 'favorites_name',
      valueType: 'text',
      width: 120,
    },
    {
      title: t('favorites.favorites_cover'),
      dataIndex: 'favorites_cover',
      key: 'favorites_cover',
      hideInSearch: true,
      width: 120,
      render: (value) => (
        <Image
          width={60}
          src={value != '-' ? THUMBNAIL_URL + value : './music_cover.jpg'}
        />
      ),
    },
    {
      title: t('favorites.is_public'),
      dataIndex: 'is_public',
      key: 'is_public',
      valueType: 'select',
      width: 120,
      valueEnum: whetherStatusEnum,
    },
    {
      title: t('favorites.favorites_remarks'),
      dataIndex: 'favorites_remarks',
      key: 'favorites_remarks',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: t('favorites.is_default'),
      dataIndex: 'is_default',
      key: 'is_default',
      valueType: 'select',
      width: 120,
      valueEnum: whetherStatusEnum,
    },
    {
      title: t('favorites.favorites_uid'),
      dataIndex: 'favorites_uid',
      key: 'favorites_uid',
      valueType: 'text',
      width: 80,
    },
    {
      title: t('favorites.create_time'),
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('favorites.update_time'),
      dataIndex: 'update_time',
      key: 'update_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('favorites.create_by'),
      dataIndex: 'create_by',
      key: 'create_by',
      valueType: 'select',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
    },
    {
      title: t('favorites.update_by'),
      dataIndex: 'update_by',
      key: 'update_by',
      valueType: 'digit',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
    },
    {
      title: t('favorites.delete_time'),
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
            title={t('table.edit', { name: t('favorites.table_name') })}
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
            title={t('table.delete', { name: t('favorites.table_name') })}
          >
            <Popconfirm
              title={t('table.delete', { name: t('favorites.table_name') })}
              description={t('table.delete_tips', {
                name: t('favorites.table_name'),
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
      const initRes = await getFavoritesList(params);
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
      console.error('Error fetching Favorites list:', error);
      return {};
    }
  };

  const [handleModalVisible, setHandleModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [syncModalVisible, setSyncModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState({});

  // 新建逻辑
  const addData = async () => {
    setHandleModalVisible(true);
    setCurrentRow({});
  };

  // 删除逻辑
  const deleteData = async (id) => {
    const delRes = await deleteFavorites(id);
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
      console.error('Error deleting Favorites:', error);
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
        const updateRes = await updateFavorites(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await addFavorites(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating or adding Favorites:', error);
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await getFavoritesDetail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      console.error('Error fetching Favorites detail:', error);
      message.error(
        t('table.get_details_error', { name: t('favorites.table_name') }),
      );
    }
  };

  // 同步收藏夹逻辑
  const syncFavoritesFunc = async (values) => {
    try {
      const syncRes = await syncFavorites(values);
      message.open({
        type: syncRes.code === 0 ? 'success' : 'error',
        content: syncRes.message,
      });
      return true;
    } catch (error) {
      console.error('Error syncing Favorites:', error);
      return false;
    }
  };

  const tableRef = useRef();
  const formRef = useRef();
  const syncFormRef = useRef();
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
                    name: t('favorites.table_name'),
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
            <div className="space-x-4">
              <Button
                key="sync"
                variant="outlined"
                color="blue"
                icon={<SyncOutlined />}
                onClick={() => {
                  setSyncModalVisible(true);
                }}
              >
                {t('table.sync', { name: t('favorites.table_name') })}
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
                {t('table.add', { name: t('favorites.table_name') })}
              </Button>
            </div>
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
            ? t('table.edit', { name: t('favorites.table_name') })
            : t('table.add', { name: t('favorites.table_name') })
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
          name="favorites_uid"
          label={t('favorites.favorites_uid')}
          placeholder={t('table.please_enter', {
            name: t('favorites.favorites_uid'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('favorites.favorites_uid'),
              }),
            },
          ]}
        />
        <ProFormText
          name="favorites_name"
          label={t('favorites.favorites_name')}
          placeholder={t('table.please_enter', {
            name: t('favorites.favorites_name'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('favorites.favorites_name'),
              }),
            },
          ]}
        />
        <ProFormUploadButton
          name="favorites_cover_files"
          label={t('favorites.favorites_cover')}
          rules={[
            {
              required: false,
              message: t('table.please_upload', {
                name: t('favorites.favorites_cover'),
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
          name="favorites_remarks"
          label={t('favorites.favorites_remarks')}
          placeholder={t('table.please_enter', {
            name: t('favorites.favorites_remarks'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('favorites.favorites_remarks'),
              }),
            },
          ]}
        />
        <ProFormSelect
          name="is_public"
          label={t('favorites.is_public')}
          placeholder={t('table.please_select', {
            name: t('favorites.is_public'),
          })}
          width="xl"
          valueEnum={whetherStatusEnum}
          rules={[
            {
              required: false,
              message: t('table.please_select', {
                name: t('favorites.is_public'),
              }),
            },
          ]}
        />
        <ProFormSelect
          name="is_default"
          label={t('favorites.is_default')}
          placeholder={t('table.please_select', {
            name: t('favorites.is_default'),
          })}
          width="xl"
          valueEnum={whetherStatusEnum}
          rules={[
            {
              required: false,
              message: t('table.please_select', {
                name: t('favorites.is_default'),
              }),
            },
          ]}
        />
      </ModalForm>
      {/* 同步弹窗： */}
      <ModalForm
        key={'sync'}
        ref={syncFormRef}
        labelWidth="auto"
        title={t('table.sync', { name: t('favorites.table_name') })}
        open={syncModalVisible}
        onOpenChange={(visible) => {
          setSyncModalVisible(visible);
          if (!visible) {
            syncFormRef.current?.resetFields();
          }
        }}
        onFinish={async (values) => {
          return await syncFavoritesFunc(values);
        }}
      >
        <ProFormText
          name="target"
          label={t('favorites.target')}
          placeholder={t('table.please_enter', {
            name: t('favorites.target'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('favorites.target'),
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
        title={t('table.details', { name: t('favorites.table_name') })}
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

export default FavoritesList;
