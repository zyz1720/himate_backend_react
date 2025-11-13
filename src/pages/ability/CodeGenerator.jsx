import { useState, useCallback } from 'react';
import {
  Button,
  Card,
  Upload,
  Input,
  Form,
  Select,
  Checkbox,
  App,
  Tabs,
  Modal,
  Collapse,
  Drawer,
  InputNumber,
  Popover,
  Tooltip,
} from 'antd';
import {
  InboxOutlined,
  FileSearchOutlined,
  DownloadOutlined,
  SettingOutlined,
  PlusOutlined,
  CodeOutlined,
  FileDoneOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { AiOutlineSelect } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { copyToClipboard } from '@/utils/common/string_util';
import { parseSQLTable } from '@/utils/code_generator/common/sqlparser_util';
import { generateZipFile } from '@/utils/code_generator/common/generate_zip_util';
import { generateCode } from '@/utils/code_generator/common/generate_code_util';
import {
  formTypes,
  autoTimeTypes,
  valueTypes,
  renderTypes,
  enumStatusTypes,
  sqlFieldTypes,
} from '@/constants/code_generator';
import { applyCode } from '@/api/dev/code_generator';
import { AiOutlineCopy } from 'react-icons/ai';
import IconSelector from '@/components/common/IconSelector';

const GIN_NAME = import.meta.env.VITE_GIN_NAME;
const NEST_NAME = import.meta.env.VITE_NEST_NAME;

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const CodeGenerator = () => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [sqlContent, setSqlContent] = useState('');
  const [parsedTableInfo, setParsedTableInfo] = useState(null);
  const [parsedTableFields, setParsedTableFields] = useState([]);
  const [activeTab, setActiveTab] = useState('import');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const [isApplyModalVisible, setIsApplyModalVisible] = useState(false);
  const [fileApplications, setFileApplications] = useState({});
  const [ginName, setGinName] = useState(GIN_NAME);
  const [nestName, setNestName] = useState(NEST_NAME);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [enumValues, setEnumValues] = useState({
    key: '',
    text: '',
    status: 'Default',
  });
  const [editEnumVisible, setEditEnumVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [IconModalVisible, setIconModalVisible] = useState(false);

  // SQL导入配置
  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.sql',
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSqlContent(e.target.result);
      };
      reader.readAsText(file);
      return false; // 阻止默认上传行为
    },
    showUploadList: false,
  };

  // 解析SQL
  const handleParseSQL = () => {
    try {
      if (!sqlContent.trim()) {
        message.error(t('code_generator.please_input_sql_content'));
        return;
      }
      const { tableInfo, fields } = parseSQLTable(sqlContent);
      setParsedTableInfo(tableInfo || null);
      setParsedTableFields(fields || []);

      setActiveTab('configure');
      message.success(t('code_generator.parse_sql_success'));
    } catch (error) {
      message.error(
        t('code_generator.parse_sql_error', { error: error.message }),
      );
    }
  };

  // 初始化一个空的表信息结构
  const emptyTableInfo = {
    tableName: '',
    tableComment: '',
    menuName: '',
    menuIcon: '',
    menuIconPath: '',
  };

  // 创建初始的表信息（如果还没有的话）
  const ensureTableInfoExists = () => {
    if (!parsedTableInfo) {
      setParsedTableInfo(emptyTableInfo);
    }
  };

  // 切换到配置标签页时确保表信息存在
  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === 'configure') {
      ensureTableInfoExists();
    }
  };

  // 更新字段配置
  const handleFieldConfigChange = useCallback((index, key, value) => {
    setParsedTableFields((prevState) => {
      const newState = [...prevState];
      newState[index][key] = value;
      return newState;
    });
  }, []);

  // 更新表信息
  const handleTableInfoChange = useCallback((key, value) => {
    setParsedTableInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  // 添加新字段
  const handleAddField = () => {
    const newField = {
      name: '',
      comment: '',
      type: 'varchar',
      length: 64,
      suffix: [],
      nullable: 'null',
      default: null,
      isPrimaryKey: false,
      isIndex: false,
      isUnique: false,
      valueType: 'text',
      proFormType: 'ProFormText',
      renderType: 'text',
      formRegExp: null,
      colWidth: 120,
      autoTimeType: '',
      hideInTable: false,
      hideInForm: false,
      hideInDetail: false,
      hideInSearch: false,
      isRequired: false,
      isCopyable: false,
      isEditable: false,
      isDisable: false,
      isEllipsis: false,
      isFilterable: false,
      isSortable: false,
      valueEnum: {},
    };

    setParsedTableFields((prevState) => [...prevState, newField]);
  };

  // 删除字段
  const handleDeleteField = (index) => {
    if (parsedTableFields.length === 0) {
      message.error(t('code_generator.field_is_empty'));
      return;
    }

    setParsedTableFields((prevState) =>
      prevState.filter((_, i) => i !== index),
    );
  };

  // 打开数据库字段配置抽屉
  const openDatabaseConfigDrawer = (field) => {
    setCurrentField(field);
    setIsDrawerVisible(true);
  };

  // 在抽屉中更新字段配置
  const handleDrawerFieldConfigChange = (key, value) => {
    if (!currentField) return;

    const updatedField = { ...currentField, [key]: value };
    setCurrentField(updatedField);

    // 同时更新主状态中的字段
    const updatedFields = parsedTableFields.map((field) => {
      if (field.name === currentField.name) {
        return updatedField;
      } else if (!field.name && currentField.name === '') {
        // 处理新添加的未命名字段
        return updatedField;
      }
      return field;
    });

    setParsedTableFields(updatedFields);
  };
  // 生成代码前验证必填项
  const validateForm = () => {
    if (!parsedTableInfo.tableName.trim()) {
      message.error(t('code_generator.table_name_required'));
      return false;
    }
    if (!parsedTableInfo.tableComment.trim()) {
      message.error(t('code_generator.table_comment_required'));
      return false;
    }

    if (parsedTableFields.length === 0) {
      message.error(t('code_generator.field_is_empty'));
      return false;
    }

    for (let i = 0; i < parsedTableFields.length; i++) {
      const field = parsedTableFields[i];
      if (!field.name.trim()) {
        message.error(
          t('code_generator.field_name_required', { index: i + 1 }),
        );
        return false;
      }
      if (!field.comment.trim()) {
        message.error(
          t('code_generator.field_comment_required', { index: i + 1 }),
        );
        return false;
      }
    }

    return true;
  };

  // 生成代码
  const handleGenerateCode = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsGenerating(true);
      message.loading(t('code_generator.generating_code'), 0);

      const tableInfo = {
        ...parsedTableInfo,
        fields: parsedTableFields,
      };

      const code = generateCode(tableInfo, ginName);

      setGeneratedCode(code);
      setIsCodeGenerated(true);
      message.destroy();
      message.success(t('code_generator.generate_code_success'));
    } catch (error) {
      console.log(error);
      message.destroy();
      message.error(t('code_generator.generate_code_error'));
    } finally {
      setIsGenerating(false);
    }
  };

  // 下载代码
  const handleDownloadCode = async () => {
    try {
      if (!isCodeGenerated || !parsedTableInfo) {
        message.warning(t('code_generator.please_generate_code_first'));
        return;
      }

      setIsGenerating(true);
      message.loading(t('code_generator.downloading_code'), 0);

      const tableInfo = {
        ...parsedTableInfo,
        fields: parsedTableFields,
      };
      await generateZipFile(tableInfo);
      message.destroy();
      message.success(t('code_generator.download_code_success'));
    } catch (error) {
      console.error(error);
      message.destroy();
      message.error(t('code_generator.download_code_error'));
    } finally {
      setIsGenerating(false);
    }
  };

  // 应用代码
  const handleApplyCode = () => {
    if (!isCodeGenerated || !generatedCode) {
      message.warning(t('code_generator.please_generate_code_first'));
      return;
    }

    // 初始化文件应用状态
    const initialApplications = {};

    // 遍历所有生成的代码文件
    if (generatedCode) {
      Object.entries(generatedCode).forEach(([framework, frameworkCode]) => {
        Object.entries(frameworkCode).forEach(([type, codeOrObj]) => {
          if (
            typeof codeOrObj === 'object' &&
            codeOrObj !== null &&
            Object.keys(codeOrObj).length > 0 &&
            Object.values(codeOrObj).every(
              (val) => typeof val === 'object' && val !== null && 'code' in val,
            )
          ) {
            // 处理嵌套的dto对象
            Object.entries(codeOrObj).forEach(([dtoType, dtoCode]) => {
              const key = `${framework}-${type}-${dtoType}`;
              initialApplications[key] = {
                enabled: true,
                path: dtoCode.applyPath || '',
                framework,
                type,
                subType: dtoType,
                code: dtoCode.code,
              };
            });
          } else {
            // 处理普通代码文件
            const key = `${framework}-${type}`;
            initialApplications[key] = {
              enabled: true,
              path: codeOrObj.applyPath || '',
              framework,
              type,
              code: codeOrObj.code,
            };
          }
        });
      });
    }

    setFileApplications(initialApplications);
    setIsApplyModalVisible(true);
  };

  // 处理文件应用状态变更
  const handleFileApplicationChange = (key, field, value) => {
    setFileApplications((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  // 执行应用代码
  const executeApplyCode = async () => {
    try {
      setIsGenerating(true);
      message.loading(t('code_generator.applying_code'), 0);

      // 过滤出启用的文件
      const enabledFiles = Object.entries(fileApplications)
        .filter(([_, app]) => app.enabled)
        .map(([key, app]) => ({ key, ...app }));

      if (enabledFiles.length === 0) {
        message.destroy();
        message.warning(t('code_generator.no_files_selected'));
        setIsGenerating(false);
        return;
      }

      // 验证路径
      for (const file of enabledFiles) {
        if (!file.path.trim()) {
          message.destroy();
          message.warning(
            t('code_generator.please_enter_file_path', {
              fileName: `${file.framework}-${file.type}${
                file.subType ? `-${file.subType}` : ''
              }`,
            }),
          );
          setIsGenerating(false);
          return;
        }
      }

      const res = await applyCode({
        data: enabledFiles,
        gin_name: ginName,
        nest_name: nestName,
      });
      if (res.code !== 0) {
        message.destroy();
        message.error(t('code_generator.apply_code_error'));
        setIsGenerating(false);
        return;
      }

      message.success(t('code_generator.apply_code_success'));
      message.destroy();
      setIsApplyModalVisible(false);
    } catch (error) {
      console.error(error);
      message.destroy();
      message.error(t('code_generator.apply_code_error'));
    } finally {
      setIsGenerating(false);
    }
  };

  // 重置
  const handleReset = () => {
    setSqlContent('');
    setParsedTableInfo(null);
    setParsedTableFields([]);
    setGeneratedCode(null);
    setIsCodeGenerated(false);
    setActiveTab('import');
  };

  const renderEnumContent = () => (
    <Form layout="horizontal" labelAlign="left" labelCol={{ span: 6 }}>
      <Form.Item label={t('code_generator.enum_key')} required className="mb-0">
        <Input
          value={enumValues.key}
          allowClear
          onChange={(e) =>
            setEnumValues({ ...enumValues, key: e.target.value })
          }
          placeholder={t('table.please_enter', {
            name: t('code_generator.enum_key'),
          })}
        />
      </Form.Item>
      <Form.Item
        label={t('code_generator.enum_value')}
        required
        className="mb-0"
      >
        <Input
          value={enumValues.text}
          allowClear
          onChange={(e) =>
            setEnumValues({ ...enumValues, text: e.target.value })
          }
          placeholder={t('table.please_enter', {
            name: t('code_generator.enum_value'),
          })}
        />
      </Form.Item>
      <Form.Item label={t('code_generator.enum_status')} className="mb-0">
        <Select
          value={enumValues.status}
          allowClear
          onChange={(e) => setEnumValues((prev) => ({ ...prev, status: e }))}
          options={enumStatusTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          placeholder={t('table.please_select', {
            name: t('code_generator.enum_status'),
          })}
        />
      </Form.Item>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            if (!enumValues.key || !enumValues.text) {
              message.error(t('code_generator.enum_values_error'));
              return;
            }
            const newEnumValues = { ...enumValues };
            const key = newEnumValues.key;
            delete newEnumValues.key;
            handleDrawerFieldConfigChange('valueEnum', {
              ...currentField.valueEnum,
              [key]: newEnumValues,
            });
            message.success(t('code_generator.set_enum_success'));
            setEditEnumVisible(false);
            setEnumValues({ key: '', text: '', status: 'Default' });
          }}
        >
          {t('common.confirm')}
        </Button>
      </div>
    </Form>
  );

  // 删除枚举
  const handleDeleteEnum = (key) => {
    const newEnumValues = { ...currentField.valueEnum };
    delete newEnumValues[key];
    handleDrawerFieldConfigChange('valueEnum', newEnumValues);
    message.success(t('code_generator.delete_enum_success'));
  };

  // 编辑枚举
  const handleEditEnum = (key) => {
    setEditEnumVisible(true);
    setEnumValues({
      key,
      ...currentField.valueEnum[key],
    });
  };

  // 代码选中按钮样式
  const isCheckCode = (type) => {
    return Object.values(fileApplications)
      .filter((app) => app.framework === type)
      .every((app) => app.enabled);
  };

  // 选中代码
  const selectCurrentCode = (type) => {
    const allReactEnabled = Object.values(fileApplications)
      .filter((app) => app.framework === type)
      .every((app) => app.enabled);

    const updatedApplications = { ...fileApplications };
    Object.keys(updatedApplications).forEach((key) => {
      if (key.startsWith(type + '-')) {
        updatedApplications[key].enabled = !allReactEnabled;
      }
    });

    setFileApplications(updatedApplications);
    message.success(
      t(
        'code_generator.' +
          (allReactEnabled ? 'unchecked_code' : 'checked_code'),
        {
          name: t(`code_generator.select_${type}_code`),
        },
      ),
    );
  };

  const handleCopyClick = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      message.success(t('icon_selector.copy_success'));
    } else {
      message.error(t('icon_selector.copy_failed'));
    }
  };

  return (
    <Card title={t('code_generator.title')} className="w-full">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          {
            key: 'import',
            label: t('code_generator.import_sql'),
            icon: <FileSearchOutlined />,
            children: (
              <div className="space-y-4">
                <p className="text-gray-600">
                  {t('code_generator.please_input_sql')}
                </p>
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    {t('code_generator.upload_tips')}
                  </p>
                  <p className="ant-upload-hint">
                    {t('code_generator.upload_hint')}
                  </p>
                </Dragger>

                <div className="space-y-2 mt-2">
                  <p className="text-gray-600">
                    {t('code_generator.or_input_manually')}
                  </p>
                  <TextArea
                    value={sqlContent}
                    onChange={(e) => setSqlContent(e.target.value)}
                    rows={10}
                    placeholder={t('code_generator.please_input_sql_content')}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <Button danger onClick={handleReset}>
                    {t('code_generator.reset')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleParseSQL}
                    loading={isGenerating}
                  >
                    {t('code_generator.parse_sql')}
                  </Button>
                </div>
              </div>
            ),
          },
          {
            key: 'configure',
            label: t('code_generator.configure_fields'),
            icon: <SettingOutlined />,
            children: parsedTableInfo ? (
              <div className="space-y-6">
                <Card
                  key="tableInfo"
                  title={t('code_generator.table_info')}
                  className="mb-2"
                >
                  <Form layout="horizontal">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Form.Item
                        label={t('code_generator.table_name')}
                        required
                      >
                        <Input
                          value={parsedTableInfo.tableName}
                          allowClear
                          onChange={(e) =>
                            handleTableInfoChange('tableName', e.target.value)
                          }
                          placeholder={t('table.please_enter', {
                            name: t('code_generator.table_name'),
                          })}
                        />
                      </Form.Item>
                      <Form.Item
                        label={t('code_generator.table_comment')}
                        required
                      >
                        <Input
                          value={parsedTableInfo.tableComment}
                          allowClear
                          onChange={(e) =>
                            handleTableInfoChange(
                              'tableComment',
                              e.target.value,
                            )
                          }
                          placeholder={t('table.please_enter', {
                            name: t('code_generator.table_comment'),
                          })}
                        />
                      </Form.Item>
                      <Form.Item label={t('code_generator.menu_name')} required>
                        <Input
                          value={parsedTableInfo.menuName}
                          allowClear
                          onChange={(e) =>
                            handleTableInfoChange('menuName', e.target.value)
                          }
                          placeholder={t('table.please_enter', {
                            name: t('code_generator.menu_name'),
                          })}
                        />
                      </Form.Item>
                      <Form.Item label={t('code_generator.menu_icon')}>
                        <Button
                          className="w-full"
                          onClick={() => setIconModalVisible(true)}
                          icon={
                            selectedIcon ? (
                              <selectedIcon.Component />
                            ) : (
                              <AiOutlineSelect />
                            )
                          }
                        >
                          {parsedTableInfo.menuIcon ? (
                            <p className="truncate">
                              {parsedTableInfo.menuIcon}
                            </p>
                          ) : (
                            <p className="truncate">
                              {t('code_generator.select_icon')}
                            </p>
                          )}
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </Card>
                <div>
                  <h3 className="text-base font-bold my-4">
                    {t('code_generator.fields_config')}
                  </h3>
                  <div className="space-y-4">
                    {parsedTableFields.map((field, index) => (
                      <Card
                        key={index}
                        title={
                          <div className="md:flex justify-between items-center">
                            <span>
                              {t('code_generator.field')} {index + 1}:{' '}
                              {field.name || t('code_generator.unnamed_field')}
                            </span>
                            <div className="grid md:grid-cols-2 gap-2">
                              <Button
                                onClick={() => openDatabaseConfigDrawer(field)}
                              >
                                {t('code_generator.database_field_config')}
                              </Button>
                              <Button
                                danger
                                onClick={() => handleDeleteField(index)}
                              >
                                {t('code_generator.delete')}
                              </Button>
                            </div>
                          </div>
                        }
                      >
                        <div className="grid md:grid-cols-7 gap-x-2 gap-y-2">
                          <div className="md:col-span-4">
                            <Form
                              layout="horizontal"
                              labelAlign="left"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 16 }}
                              className="grid grid-cols-1 2xl:grid-cols-2 gap-y-0"
                            >
                              <Form.Item
                                label={t('code_generator.field_name')}
                                required
                                className="mb-0"
                              >
                                <Input
                                  value={field.name}
                                  allowClear
                                  onChange={(e) =>
                                    handleFieldConfigChange(
                                      index,
                                      'name',
                                      e.target.value,
                                    )
                                  }
                                  placeholder={t('table.please_enter', {
                                    name: t('code_generator.field_name'),
                                  })}
                                />
                              </Form.Item>
                              <Form.Item
                                label={t('code_generator.field_comment')}
                                required
                                className="mb-0"
                              >
                                <Input
                                  value={field.comment}
                                  allowClear
                                  onChange={(e) =>
                                    handleFieldConfigChange(
                                      index,
                                      'comment',
                                      e.target.value,
                                    )
                                  }
                                  placeholder={t('table.please_enter', {
                                    name: t('code_generator.field_comment'),
                                  })}
                                />
                              </Form.Item>
                              <Form.Item
                                label={t('code_generator.col_width')}
                                className="mb-0"
                              >
                                <InputNumber
                                  value={field.colWidth}
                                  style={{ width: '100%' }}
                                  allowClear
                                  onChange={(e) =>
                                    handleFieldConfigChange(
                                      index,
                                      'colWidth',
                                      e.target.value,
                                    )
                                  }
                                  placeholder={t('table.please_enter', {
                                    name: t('code_generator.col_width'),
                                  })}
                                />
                              </Form.Item>
                              {!(field.hideInTable && field.hideInDetail) && (
                                <>
                                  <Form.Item
                                    label={t('code_generator.value_type')}
                                    required
                                    className="mb-0"
                                  >
                                    <Select
                                      showSearch
                                      value={field.valueType}
                                      onChange={(value) =>
                                        handleFieldConfigChange(
                                          index,
                                          'valueType',
                                          value,
                                        )
                                      }
                                      placeholder={t('table.please_select', {
                                        name: t('code_generator.value_type'),
                                      })}
                                      options={valueTypes.map((item) => ({
                                        label: t('value_type.' + item),
                                        value: item,
                                      }))}
                                      filterOption={(input, option) =>
                                        (option?.label ?? '').includes(input)
                                      }
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label={t('code_generator.render_type')}
                                    className="mb-0"
                                  >
                                    <Select
                                      showSearch
                                      value={field.renderType}
                                      onChange={(value) =>
                                        handleFieldConfigChange(
                                          index,
                                          'renderType',
                                          value,
                                        )
                                      }
                                      placeholder={t('table.please_select', {
                                        name: t('code_generator.render_type'),
                                      })}
                                      options={renderTypes.map((item) => ({
                                        label: t('render_type.' + item),
                                        value: item,
                                      }))}
                                      filterOption={(input, option) =>
                                        (option?.label ?? '').includes(input)
                                      }
                                    />
                                  </Form.Item>
                                </>
                              )}

                              {!field.hideInForm && (
                                <>
                                  <Form.Item
                                    label={t('code_generator.form_type')}
                                    className="mb-0"
                                  >
                                    <Select
                                      showSearch
                                      value={field.proFormType}
                                      onChange={(value) =>
                                        handleFieldConfigChange(
                                          index,
                                          'proFormType',
                                          value,
                                        )
                                      }
                                      placeholder={t('table.please_select', {
                                        name: t('code_generator.form_type'),
                                      })}
                                      options={formTypes.map((item) => ({
                                        label: t('form_type.' + item),
                                        value: item,
                                      }))}
                                      filterOption={(input, option) =>
                                        (option?.label ?? '').includes(input)
                                      }
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label={t('code_generator.form_RegExp')}
                                    className="mb-0"
                                  >
                                    <Input
                                      value={field.formRegExp}
                                      allowClear
                                      onChange={(e) =>
                                        handleFieldConfigChange(
                                          index,
                                          'formRegExp',
                                          e.target.value,
                                        )
                                      }
                                      placeholder={t('table.please_enter', {
                                        name: t('code_generator.form_RegExp'),
                                      })}
                                    />
                                  </Form.Item>
                                </>
                              )}
                            </Form>
                          </div>

                          <div className="md:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-y-4">
                              <div>
                                <Checkbox
                                  checked={field.hideInTable}
                                  onChange={(e) =>
                                    handleFieldConfigChange(
                                      index,
                                      'hideInTable',
                                      e.target.checked,
                                    )
                                  }
                                >
                                  {t('code_generator.hide_in_table')}
                                </Checkbox>
                              </div>
                              <div>
                                <Checkbox
                                  checked={field.hideInForm}
                                  onChange={(e) =>
                                    handleFieldConfigChange(
                                      index,
                                      'hideInForm',
                                      e.target.checked,
                                    )
                                  }
                                >
                                  {t('code_generator.hide_in_form')}
                                </Checkbox>
                              </div>
                              <div>
                                <Checkbox
                                  checked={field.hideInDetail}
                                  onChange={(e) =>
                                    handleFieldConfigChange(
                                      index,
                                      'hideInDetail',
                                      e.target.checked,
                                    )
                                  }
                                >
                                  {t('code_generator.hide_in_detail')}
                                </Checkbox>
                              </div>
                              {!field.hideInTable && (
                                <div>
                                  <Checkbox
                                    checked={field.hideInSearch}
                                    onChange={(e) =>
                                      handleFieldConfigChange(
                                        index,
                                        'hideInSearch',
                                        e.target.checked,
                                      )
                                    }
                                  >
                                    {t('code_generator.hide_in_search')}
                                  </Checkbox>
                                </div>
                              )}
                              {!(field.hideInTable && field.hideInDetail) && (
                                <>
                                  <div>
                                    <Checkbox
                                      checked={field.isCopyable}
                                      onChange={(e) =>
                                        handleFieldConfigChange(
                                          index,
                                          'isCopyable',
                                          e.target.checked,
                                        )
                                      }
                                    >
                                      {t('code_generator.copyable')}
                                    </Checkbox>
                                  </div>
                                  <div>
                                    <Checkbox
                                      checked={field.isEllipsis}
                                      onChange={(e) =>
                                        handleFieldConfigChange(
                                          index,
                                          'isEllipsis',
                                          e.target.checked,
                                        )
                                      }
                                    >
                                      {t('code_generator.ellipsis')}
                                    </Checkbox>
                                  </div>
                                </>
                              )}
                              {!field.hideInForm && (
                                <div>
                                  <Checkbox
                                    checked={field.isRequired}
                                    onChange={(e) =>
                                      handleFieldConfigChange(
                                        index,
                                        'isRequired',
                                        e.target.checked,
                                      )
                                    }
                                  >
                                    {t('code_generator.required')}
                                  </Checkbox>
                                </div>
                              )}
                              {!field.hideInTable && (
                                <>
                                  <div>
                                    <Checkbox
                                      checked={field.isFilterable}
                                      onChange={(e) =>
                                        handleFieldConfigChange(
                                          index,
                                          'isFilterable',
                                          e.target.checked,
                                        )
                                      }
                                    >
                                      {t('code_generator.filterable')}
                                    </Checkbox>
                                  </div>
                                  <div>
                                    <Checkbox
                                      checked={field.isSortable}
                                      onChange={(e) =>
                                        handleFieldConfigChange(
                                          index,
                                          'isSortable',
                                          e.target.checked,
                                        )
                                      }
                                    >
                                      {t('code_generator.sortable')}
                                    </Checkbox>
                                  </div>
                                  <div>
                                    <Checkbox
                                      checked={field.isEditable}
                                      onChange={(e) =>
                                        handleFieldConfigChange(
                                          index,
                                          'isEditable',
                                          e.target.checked,
                                        )
                                      }
                                    >
                                      {t('code_generator.editable')}
                                    </Checkbox>
                                  </div>
                                  <div>
                                    <Checkbox
                                      checked={field.isDisable}
                                      onChange={(e) =>
                                        handleFieldConfigChange(
                                          index,
                                          'isDisable',
                                          e.target.checked,
                                        )
                                      }
                                    >
                                      {t('code_generator.disable')}
                                    </Checkbox>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    <Button
                      type="dashed"
                      size="large"
                      onClick={handleAddField}
                      className="w-full mt-2"
                    >
                      <PlusOutlined /> {t('code_generator.add_field')}
                    </Button>
                  </div>
                </div>
                <Card
                  key="backend-server"
                  title={t('code_generator.backend_server_name')}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Form.Item label={t('code_generator.nestjs_name')}>
                      <Input
                        value={nestName}
                        allowClear
                        onChange={(e) => setNestName(e.target.value)}
                        placeholder={t('table.please_enter', {
                          name: t('code_generator.nestjs_name'),
                        })}
                      />
                    </Form.Item>
                    <Form.Item label={t('code_generator.gin_name')}>
                      <Input
                        value={ginName}
                        allowClear
                        onChange={(e) => setGinName(e.target.value)}
                        placeholder={t('table.please_enter', {
                          name: t('code_generator.gin_name'),
                        })}
                      />
                    </Form.Item>
                  </div>
                </Card>
                <div className="md:flex justify-end space-x-2 space-y-2 md:space-y-0 mt-4">
                  <Button onClick={() => setActiveTab('import')}>
                    {t('code_generator.back')}
                  </Button>
                  <Button
                    variant="solid"
                    color="green"
                    onClick={handleGenerateCode}
                    loading={isGenerating}
                  >
                    <CodeOutlined /> {t('code_generator.generate_code')}
                  </Button>

                  <Button
                    variant="solid"
                    color="blue"
                    onClick={handleApplyCode}
                    disabled={!isCodeGenerated}
                    loading={isGenerating}
                  >
                    <FileDoneOutlined /> {t('code_generator.apply_code')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleDownloadCode}
                    disabled={!isCodeGenerated}
                    loading={isGenerating}
                  >
                    <DownloadOutlined /> {t('code_generator.download_code')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                {t('code_generator.please_parse_sql_first')}
              </div>
            ),
          },
        ]}
      />

      {/* 应用代码模态框 */}
      <Modal
        title={t('code_generator.apply_code')}
        open={isApplyModalVisible}
        onCancel={() => setIsApplyModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsApplyModalVisible(false)}>
            {t('common.cancel')}
          </Button>,
          <Button
            key="select-react"
            variant={isCheckCode('react') ? 'solid' : 'outlined'}
            color="blue"
            onClick={() => selectCurrentCode('react')}
          >
            {isCheckCode('react') && <CheckOutlined />}
            {t('code_generator.select_react_code')}
          </Button>,
          <Button
            key="select-gin"
            variant={isCheckCode('gin') ? 'solid' : 'outlined'}
            color="green"
            onClick={() => selectCurrentCode('gin')}
          >
            {isCheckCode('gin') && <CheckOutlined />}
            {t('code_generator.select_gin_code')}
          </Button>,
          <Button
            key="select-nestjs"
            color="red"
            variant={isCheckCode('nestjs') ? 'solid' : 'outlined'}
            onClick={() => selectCurrentCode('nestjs')}
          >
            {isCheckCode('nestjs') && <CheckOutlined />}
            {t('code_generator.select_nestjs_code')}
          </Button>,
          <Button
            key="apply"
            type="primary"
            onClick={executeApplyCode}
            loading={isGenerating}
          >
            {t('code_generator.confirm_apply')}
          </Button>,
        ]}
        width={'80%'}
      >
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            {t('code_generator.select_files_and_paths')}
          </p>
          {Object.entries(fileApplications).map(([key, app]) => (
            <Card
              key={key}
              title={`${app.framework.toUpperCase()} - ${app.type.toUpperCase()}${
                app.subType ? ` (${app.subType})` : ''
              }`}
              className="mb-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-20 gap-4">
                <div className="md:col-span-1 pt-1">
                  <Checkbox
                    checked={app.enabled}
                    onChange={(e) =>
                      handleFileApplicationChange(
                        key,
                        'enabled',
                        e.target.checked,
                      )
                    }
                  />
                </div>
                <div className="md:col-span-9">
                  <Form.Item
                    label={t('code_generator.apply_path')}
                    className="mb-0"
                  >
                    <Input
                      value={app.path}
                      onChange={(e) =>
                        handleFileApplicationChange(key, 'path', e.target.value)
                      }
                      placeholder={t('code_generator.please_enter_apply_path')}
                      disabled={!app.enabled}
                    />
                  </Form.Item>
                </div>
              </div>

              {/* 显示代码预览 */}
              <div>
                <Collapse defaultActiveKey={[]}>
                  <Panel
                    header={t('code_generator.code_preview')}
                    key="code_preview"
                    extra={
                      <Tooltip title={t('icon_selector.copy_tooltip')}>
                        <AiOutlineCopy
                          className="inline-block ml-2 cursor-pointer"
                          onClick={() => handleCopyClick(app.code)}
                        />
                      </Tooltip>
                    }
                  >
                    <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm max-h-160">
                      <code>{app.code}</code>
                    </pre>
                  </Panel>
                </Collapse>
              </div>
            </Card>
          ))}
        </div>
      </Modal>

      {/* 数据库字段配置抽屉组件 */}
      <Drawer
        title={
          t('code_generator.database_field_config') + ': ' + currentField?.name
        }
        className="md:w-96"
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
      >
        {currentField && (
          <Form layout="vertical" className="space-y-4">
            <div>
              <Checkbox
                checked={currentField.isPrimaryKey}
                onChange={(e) =>
                  handleDrawerFieldConfigChange(
                    'isPrimaryKey',
                    e.target.checked,
                  )
                }
              >
                {t('code_generator.set_as_primary_key')}
              </Checkbox>
            </div>

            <div>
              <Checkbox
                checked={currentField.isIndex}
                onChange={(e) =>
                  handleDrawerFieldConfigChange('isIndex', e.target.checked)
                }
              >
                {t('code_generator.set_as_index')}
              </Checkbox>
            </div>

            <div>
              <Checkbox
                checked={currentField.isUnique}
                onChange={(e) =>
                  handleDrawerFieldConfigChange('isUnique', e.target.checked)
                }
              >
                {t('code_generator.set_as_unique')}
              </Checkbox>
            </div>
            <div>
              <Checkbox
                checked={currentField.nullable === 'null'}
                onChange={(e) =>
                  handleDrawerFieldConfigChange(
                    'nullable',
                    e.target.checked ? 'null' : 'not null',
                  )
                }
              >
                {t('code_generator.allow_null')}
              </Checkbox>
            </div>
            <Form.Item label={t('code_generator.data_type')} className="mb-4">
              <Select
                showSearch
                value={currentField.type}
                allowClear
                mode="tags"
                onChange={(value) => {
                  handleDrawerFieldConfigChange('type', value[0]);
                }}
                placeholder={t('table.please_enter', {
                  name: t('code_generator.data_type'),
                })}
                options={sqlFieldTypes.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>

            <Form.Item label={t('code_generator.length')} className="mb-4">
              <InputNumber
                value={currentField.length}
                min={1}
                onChange={(value) =>
                  handleDrawerFieldConfigChange('length', value)
                }
                placeholder={t('table.please_enter', {
                  name: t('code_generator.length'),
                })}
              />
            </Form.Item>

            <Form.Item
              label={t('code_generator.default_value')}
              className="mb-4"
            >
              <Input
                value={currentField.default}
                allowClear
                onChange={(e) =>
                  handleDrawerFieldConfigChange('default', e.target.value)
                }
                placeholder={t('table.please_enter', {
                  name: t('code_generator.default_value'),
                })}
              />
            </Form.Item>

            {autoTimeTypes.some((item) =>
              currentField.name.startsWith(item),
            ) && (
              <Form.Item label={t('code_generator.time_type')} className="mb-0">
                <Select
                  showSearch
                  value={currentField.autoTimeType}
                  onChange={(value) =>
                    handleDrawerFieldConfigChange('autoTimeType', value)
                  }
                  placeholder={t('table.please_select', {
                    name: t('code_generator.time_type'),
                  })}
                >
                  {autoTimeTypes.map((item) => (
                    <Option key={item} value={item}>
                      {t('time_type.' + item)}
                    </Option>
                  ))}
                  <Option key="empty" value={null}>
                    {t('code_generator.not_time_type')}
                  </Option>
                </Select>
              </Form.Item>
            )}
            <Form.Item label={t('code_generator.enum_values')} className="mb-4">
              <Popover
                content={renderEnumContent}
                title={t('code_generator.add_enum')}
                trigger="click"
                placement="topLeft"
                open={editEnumVisible}
                onOpenChange={setEditEnumVisible}
              >
                <Button type="primary">{t('code_generator.add_enum')}</Button>
              </Popover>
              {Object.entries(currentField.valueEnum).map(([key, value]) => (
                <pre
                  className="bg-gray-100 p-3 rounded overflow-auto text-sm max-h-60 mt-2 flex items-center justify-between"
                  key={key}
                >
                  <span className="w-60 truncate">
                    {key}:{value.text} ({value.status})
                  </span>
                  <div>
                    <Button
                      size="small"
                      type="link"
                      onClick={() => handleEditEnum(key)}
                    >
                      {t('common.edit')}
                    </Button>
                    <Button
                      size="small"
                      type="link"
                      danger
                      onClick={() => handleDeleteEnum(key)}
                    >
                      {t('common.delete')}
                    </Button>
                  </div>
                </pre>
              ))}
            </Form.Item>
          </Form>
        )}
      </Drawer>

      {/* 图标选择 */}
      <Modal
        title={t('code_generator.select_icon')}
        open={IconModalVisible}
        onCancel={() => setIconModalVisible(false)}
        footer={null}
        width={1300}
      >
        <IconSelector
          onSelect={(icon, path) => {
            handleTableInfoChange('menuIcon', icon.name);
            handleTableInfoChange('menuIconPath', path);
            setSelectedIcon(icon);
            setIconModalVisible(false);
          }}
        />
      </Modal>
    </Card>
  );
};

export default CodeGenerator;
