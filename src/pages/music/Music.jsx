import {
  ProTable,
  ModalForm,
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormTextArea,
  ProFormCaptcha,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormTreeSelect,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSlider,
  ProFormSwitch,
  ProFormUploadButton,
  ProFormUploadDragger,
  ProFormMoney,
  ProFormSegmented,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Button, Tooltip, Popconfirm, Tag, App } from 'antd';
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
  getMusicList,
  getMusicDetail,
  deleteMusic,
  updateMusic,
  addMusic,
} from '@/api/pages/music';
import { uploadCustomRequest } from '@/utils/common/upload_util';
import RichText from '@/components/common/RichText';
import HTMLContainer from '@/components/common/HTMLContainer';

const MusicList = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // 枚举值定义

  const columns = [
    {
      title: t('music.id'),
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
      title: t('music.title'),
      dataIndex: 'title',
      key: 'title',
      valueType: 'text',
      width: 120,
      copyable: true,
    },
    {
      title: t('music.artist'),
      dataIndex: 'artist',
      key: 'artist',
      valueType: 'text',
      width: 120,
      copyable: true,
    },
    {
      title: t('music.album'),
      dataIndex: 'album',
      key: 'album',
      valueType: 'text',
      width: 120,
    },
    {
      title: t('music.sample_rate'),
      dataIndex: 'sample_rate',
      key: 'sample_rate',
      valueType: 'digit',
      width: 120,
      sorter: true,
    },
    {
      title: t('music.bitrate'),
      dataIndex: 'bitrate',
      key: 'bitrate',
      valueType: 'digit',
      width: 120,
      sorter: true,
    },
    {
      title: t('music.duration'),
      dataIndex: 'duration',
      key: 'duration',
      valueType: 'digit',
      width: 120,
      sorter: true,
    },
    {
      title: t('music.artists'),
      dataIndex: 'artists',
      key: 'artists',
      valueType: 'jsonCode',
      width: 120,
    },

    {
      title: t('music.music_extra_id'),
      dataIndex: 'music_extra_id',
      key: 'music_extra_id',
      valueType: 'select',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      width: 120,
    },
    {
      title: t('music.create_time'),
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 160,
      sorter: true,
    },
    {
      title: t('music.update_time'),
      dataIndex: 'update_time',
      key: 'update_time',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      width: 160,
      sorter: true,
    },
    {
      title: t('music.create_by'),
      dataIndex: 'create_by',
      key: 'create_by',
      valueType: 'digit',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('music.update_by'),
      dataIndex: 'update_by',
      key: 'update_by',
      valueType: 'digit',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      width: 120,
      sorter: true,
    },
    {
      title: t('music.delete_time'),
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
      title: t('music.file_id'),
      dataIndex: 'file_id',
      key: 'file_id',
      valueType: 'select',
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
            title={t('table.edit', { name: t('music.table_name') })}
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
            title={t('table.delete', { name: t('music.table_name') })}
          >
            <Popconfirm
              title={t('table.delete', { name: t('music.table_name') })}
              description={t('table.delete_tips', {
                name: t('music.table_name'),
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
      const initRes = await getMusicList(params);
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
      console.error('Error fetching Music list:', error);
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
    const delRes = await deleteMusic(id);
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
      console.error('Error deleting Music:', error);
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
        const updateRes = await updateMusic(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await addMusic(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating or adding Music:', error);
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await getMusicDetail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      console.error('Error fetching Music detail:', error);
      message.error(
        t('table.get_details_error', { name: t('music.table_name') }),
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
                    name: t('music.table_name'),
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
              {t('table.add', { name: t('music.table_name') })}
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
            ? t('table.edit', { name: t('music.table_name') })
            : t('table.add', { name: t('music.table_name') })
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
          name="sample_rate"
          label={t('music.sample_rate')}
          placeholder={t('table.please_enter', {
            name: t('music.sample_rate'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('music.sample_rate'),
              }),
            },
          ]}
        />
        <ProFormDigit
          name="bitrate"
          label={t('music.bitrate')}
          placeholder={t('table.please_enter', {
            name: t('music.bitrate'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('music.bitrate'),
              }),
            },
          ]}
        />
        <ProFormDigit
          name="duration"
          label={t('music.duration')}
          placeholder={t('table.please_enter', {
            name: t('music.duration'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('music.duration'),
              }),
            },
          ]}
        />
        <ProFormTextArea
          name="artists"
          label={t('music.artists')}
          placeholder={t('table.please_enter', {
            name: t('music.artists'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('music.artists'),
              }),
            },
          ]}
        />
        <ProFormSelect
          name="file_id"
          label={t('music.file_id')}
          placeholder={t('table.please_select', {
            name: t('music.file_id'),
          })}
          width="xl"
          valueEnum={{}}
          rules={[
            {
              required: true,
              message: t('table.please_select', {
                name: t('music.file_id'),
              }),
            },
          ]}
        />
        <ProFormText
          name="title"
          label={t('music.title')}
          placeholder={t('table.please_enter', {
            name: t('music.title'),
          })}
          width="xl"
          rules={[
            {
              required: true,
              message: t('table.please_enter', {
                name: t('music.title'),
              }),
            },
          ]}
        />
        <ProFormText
          name="artist"
          label={t('music.artist')}
          placeholder={t('table.please_enter', {
            name: t('music.artist'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('music.artist'),
              }),
            },
          ]}
        />
        <ProFormText
          name="album"
          label={t('music.album')}
          placeholder={t('table.please_enter', {
            name: t('music.album'),
          })}
          width="xl"
          rules={[
            {
              required: false,
              message: t('table.please_enter', {
                name: t('music.album'),
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
        title={t('table.details', { name: t('music.table_name') })}
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

export default MusicList;
