import { toFirstUpperCase, toCamelCase } from '@/utils/common/string_util';
import { formatToObjectStr, isEmptyObject } from '@/utils/common/object_util';

/**
 * 生成Table组件内容
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @returns {string} - 包含Table组件内容的字符串
 */
export function generateTableComponent(tableInfo) {
  const { tableName, fields } = tableInfo;
  const camelCaseName = toFirstUpperCase(tableName);

  const inputTypes = [
    'ProFormText',
    'ProFormText.Password',
    'ProFormTextArea',
    'ProFormDigit',
    'ProFormDigitRange',
  ];
  const pickerTypes = [
    'ProFormDatePicker',
    'ProFormDateTimePicker',
    'ProFormDateRangePicker',
    'ProFormDateTimeRangePicker',
    'ProFormTimePicker',
  ];
  const selectTypes = [
    'ProFormSelect',
    'ProFormTreeSelect',
    'ProFormSegmented',
  ];
  const checkTypes = [
    'ProFormCheckbox.Group',
    'ProFormRadio.Group',
    'ProFormCascader',
  ];
  const controlTypes = [
    'ProFormSwitch',
    'ProFormRate',
    'ProFormSlider',
    'ProFormMoney',
  ];
  const uploadTypes = ['ProFormUploadDragger', 'ProFormUploadButton'];

  // 生成列定义
  let columnsDefinition = '';
  // 生成表单字段定义
  let formFields = '';
  // 生成枚举值定义
  let enumObjStr = '';
  const enumList = [];
  fields.forEach((field) => {
    const {
      name,
      valueType,
      renderType,
      hideInTable,
      hideInForm,
      hideInDetail,
      hideInSearch,
      isCopyable,
      isEditable,
      isDisable,
      isEllipsis,
      valueEnum,
      colWidth,
      isFilterable,
      isSortable,
    } = field || {};

    // 获取枚举值
    const enumName = toCamelCase(name) + 'Enum';
    if (!isEmptyObject(valueEnum)) {
      enumList.push({
        name: enumName,
        value: valueEnum,
      });
    }

    let columnConfig = `{
      title: t('${tableName}.${name}'),
      dataIndex: '${name}',
      key: '${name}',
      valueType:'${valueType}',`;
    const optionalConfigs = [
      hideInTable && `hideInTable: ${hideInTable}`,
      hideInForm && `hideInForm: ${hideInForm}`,
      hideInDetail && `hideInDescriptions: ${hideInDetail}`,
      hideInSearch && `hideInSearch: ${hideInSearch}`,
      isDisable && `disable: ${isDisable}`,
      isEditable && `editable: ${isEditable}`,
      isEllipsis && `ellipsis: ${isEllipsis}`,
      colWidth && `width: ${colWidth}`,
      isCopyable && `copyable: ${isCopyable}`,
      isFilterable &&
        `filters: ${isFilterable},
      onFilter: true`,
      isSortable && `sorter: ${isSortable}`,
      !isEmptyObject(valueEnum) && `valueEnum: ${enumName}`,
      renderType === 'html' &&
        `renderFormItem: (_, { defaultRender }) => {
         return defaultRender(_);
         },
      render: (_, record) => (
        <HTMLContainer content={record?.${name}} maxHeight="auto" />
      )`,
      renderType === 'tag' &&
        `renderFormItem: (_, { defaultRender }) => {
         return defaultRender(_);
         },
      render: (_, record) => {
        const value = ${enumName}[record?.${name}];
        return value ? <Tag color={value?.status?.toLowerCase()}>{value?.text}</Tag> : null;
      }`,
    ].filter(Boolean);

    columnConfig += optionalConfigs
      .map(
        (config) => `
      ${config},`,
      )
      .join('');

    columnConfig += `
    },`;
    columnsDefinition += columnConfig;
  });

  fields.forEach((field) => {
    const {
      hideInForm,
      isPrimaryKey,
      proFormType,
      formRegExp,
      isRequired,
      name,
    } = field || {};
    if (hideInForm) return;
    if (isPrimaryKey) return;

    const enumName = toCamelCase(name) + 'Enum';

    let formField;
    if (inputTypes.includes(proFormType)) {
      const patternRule = formRegExp
        ? `{ pattern: ${formRegExp}, message: t('table.invalid_format', {
        name: t('${tableName}.${name}'),
      }) }`
        : '';
      formField = `<${proFormType}
          name="${name}"
          label={t('${tableName}.${name}')}
          placeholder={t('table.please_enter', {
            name: t('${tableName}.${name}'),
          })}
          width="xl"
          rules={[
            { required: ${isRequired}, message: t('table.please_enter', {
              name: t('${tableName}.${name}'),
            }) },${patternRule}
          ]}
        />
        `;
    }
    if (pickerTypes.includes(proFormType)) {
      formField = `<${proFormType}
          name="${name}"
          label={t('${tableName}.${name}')}
          placeholder={t('table.please_select', {
            name: t('${tableName}.${name}'),
          })}
          width="xl"
          rules={[
            { required: ${isRequired}, message: t('table.please_select', {
              name: t('${tableName}.${name}'),
            }) }
          ]}
        />
        `;
    }
    if (selectTypes.includes(proFormType)) {
      formField = `<${proFormType}
          name="${name}"
          label={t('${tableName}.${name}')}
          placeholder={t('table.please_select', {
            name: t('${tableName}.${name}'),
          })}
          width="xl"
          valueEnum={${enumList.find((item) => item.name === enumName) ? enumName : '{}'}}
          rules={[
            { required: ${isRequired}, message: t('table.please_select', {
              name: t('${tableName}.${name}'),
            }) }
          ]}
        />
        `;
    }
    if (checkTypes.includes(proFormType)) {
      formField = `<${proFormType}
          name="${name}"
          label={t('${tableName}.${name}')}
          layout="vertical"
          valueEnum={${enumList.find((item) => item.name === enumName) ? enumName : '{}'}}
          rules={[
            { required: ${isRequired}, message: t('table.please_select', {
              name: t('${tableName}.${name}'),
            }) }
          ]}
        />
        `;
    }
    if (controlTypes.includes(proFormType)) {
      formField = `<${proFormType}
          name="${name}"
          label={t('${tableName}.${name}')}
        />
        `;
    }
    if (uploadTypes.includes(proFormType)) {
      formField = `<${proFormType}
          name="${name}_files"
          label={t('${tableName}.${name}')}
          rules={[
            { required: ${isRequired}, message: t('table.please_upload', {
              name: t('${tableName}.${name}'),
            }) }
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
        `;
    }
    if (proFormType === 'RichText') {
      const patternRule = formRegExp
        ? `{ pattern: ${formRegExp}, message: t('table.invalid_format', {
        name: t('${tableName}.${name}'),
      }) }`
        : '';
      formField = `<ProForm.Item
          name="${name}"
          label={t('${tableName}.${name}')}
          rules={[
            { required: ${isRequired}, message: t('table.please_enter', {
              name: t('${tableName}.${name}'),
            }) },${patternRule}
          ]}
        >
          <RichText
            height="400px"
            value={currentRow?.${name}}
            onChange={(content, delta, source) => {
              if (source === 'user') {
                setCurrentRow({ ...currentRow, ${name}: content });
                formRef.current?.setFieldsValue({ ${name}: content });
              }
            }}
          />
        </ProForm.Item>
        `;
    }

    formFields += `${formField}`;
  });

  // 生成枚举值定义
  enumList.forEach((enumItem) => {
    const { name, value } = enumItem || {};
    if (!name || !value) return;
    enumObjStr += `
    const ${name} = ${formatToObjectStr(value)};
    `;
  });

  const componentContent = `import {
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
  get${camelCaseName}List,
  get${camelCaseName}Detail,
  delete${camelCaseName},
  update${camelCaseName},
  add${camelCaseName},
} from '@/api/pages/${tableName}';
import { uploadCustomRequest } from '@/utils/common/upload_util';
import RichText from '@/components/common/RichText';
import HTMLContainer from '@/components/common/HTMLContainer';

const ${camelCaseName}List = () => {
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // 枚举值定义
  ${enumObjStr}

  const columns = [
    ${columnsDefinition}
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
            title={t('table.edit', { name: t('${tableName}.table_name') })}
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
            title={t('table.delete', { name: t('${tableName}.table_name') })}
          >
            <Popconfirm
              title={t('table.delete', { name: t('${tableName}.table_name') })}
              description={t('table.delete_tips', { name: t('${tableName}.table_name') })}
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
      const initRes = await get${camelCaseName}List(params);
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
      console.error('Error fetching ${camelCaseName} list:', error);
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
    const delRes = await delete${camelCaseName}(id);
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
      console.error('Error deleting ${camelCaseName}:', error);
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
        const updateRes = await update${camelCaseName}(currentRow.id, form);
        message.open({
          type: updateRes.code === 0 ? 'success' : 'error',
          content: updateRes.message,
        });
      } else {
        const addRes = await add${camelCaseName}(form);
        message.open({
          type: addRes.code === 0 ? 'success' : 'error',
          content: addRes.message,
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating or adding ${camelCaseName}:', error);
      message.error(t('table.action_error'));
      return false;
    } finally {
      tableRef.current.reload();
    }
  };

  // 查看详情逻辑
  const getDataDetail = async (id) => {
    try {
      const detailRes = await get${camelCaseName}Detail(id);
      const { data } = detailRes;
      if (detailRes.code === 0) {
        setCurrentRow(data);
      }
    } catch (error) {
      console.error('Error fetching ${camelCaseName} detail:', error);
      message.error(t('table.get_details_error', { name: t('${tableName}.table_name') }));
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
                  content: t('table.batch_delete_tips', { name: t('${tableName}.table_name') }),
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
              {t('table.add', { name: t('${tableName}.table_name') })}
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
            ? t('table.edit', { name: t('${tableName}.table_name') })
            : t('table.add', { name: t('${tableName}.table_name') })
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
        ${formFields}
      </ModalForm>
      {/* 详情弹窗： */}
      <ModalForm
        key={currentRow?.id + 'view'}
        labelWidth="auto"
        disabled
        title={t('table.details', { name: t('${tableName}.table_name') })}
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

export default ${camelCaseName}List;`;

  return componentContent;
}
