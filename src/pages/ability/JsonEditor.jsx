import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, message, Card, Tooltip } from 'antd';
import {
  FormatPainterFilled,
  DownloadOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useLayoutStore } from '@/stores/layoutStore';
import {
  JsonEditor as JsonEditorComponent,
  defaultTheme,
  githubDarkTheme,
} from 'json-edit-react';
import { downloadFile } from '@/utils/common/download_util';



const { TextArea } = Input;

const JsonEditor = () => {
  const { settingConfig } = useLayoutStore();
  const { t } = useTranslation();
  const [jsonStr, setJsonStr] = useState('{}');
  const [isValidJson, setIsValidJson] = useState(true);
  const [parsedJson, setParsedJson] = useState({});

  // 验证JSON格式
  const validateJson = (str) => {
    if (!str.trim()) {
      setIsValidJson(false);
      setParsedJson({});
      return;
    }
    try {
      const parsed = JSON.parse(str);
      setIsValidJson(true);
      setParsedJson(parsed);
    } catch (error) {
      console.error('解析JSON时出错:', error);
      setIsValidJson(false);
      setParsedJson({});
    }
  };

  // 处理文本变化
  const handleTextChange = (e) => {
    const newStr = e.target.value;
    setJsonStr(newStr);
    validateJson(newStr);
  };

  // 格式化JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonStr);
      const formattedStr = JSON.stringify(parsed, null, 2);
      setJsonStr(formattedStr);
      message.success(t('json_editor.format_success'));
    } catch (error) {
      console.error('格式化JSON时出错:', error);
      message.error(t('json_editor.format_error'));
    }
  };

  // 导出为JSON文件
  const exportAsJson = () => {
    try {
      const parsed = JSON.parse(jsonStr);
      const blob = new Blob([JSON.stringify(parsed, null, 2)], {
        type: 'application/json',
      });
      downloadFile(blob, 'json_editor_data.json');
      message.success(t('json_editor.export_json_success'));
    } catch (error) {
      console.error('导出JSON文件时出错:', error);
      message.error(t('json_editor.export_json_error'));
    }
  };

  // 导出为JS文件
  const exportAsJs = () => {
    try {
      const parsed = JSON.parse(jsonStr);
      const jsContent = `// JSON数据转换为JavaScript对象\nconst jsonData = ${JSON.stringify(
        parsed,
        null,
        2,
      )};\n\n// 导出数据\nexport default jsonData;`;
      const blob = new Blob([jsContent], { type: 'application/javascript' });
      downloadFile(blob, 'json_editor_data.js');
      message.success(t('json_editor.export_js_success'));
    } catch (error) {
      console.error('导出JS文件时出错:', error);
      message.error(t('json_editor.export_js_error'));
    }
  };

  // 渲染简单的可视化视图
  const renderVisualView = () => {
    if (!isValidJson || Object.keys(parsedJson).length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          {!isValidJson
            ? t('json_editor.invalid_json_check')
            : t('json_editor.no_data')}
        </div>
      );
    }

    return (
      <JsonEditorComponent
        theme={
          settingConfig?.navTheme === 'realDark'
            ? githubDarkTheme
            : defaultTheme
        }
        data={parsedJson}
        setData={(data) => {
          setParsedJson(data);
          setJsonStr(JSON.stringify(data, null, 2));
        }}
      />
    );
  };

  return (
    <Card
      className="w-full"
      title={t('json_editor.title')}
      extra={
        <div className="flex space-x-2">
          <Tooltip title={t('json_editor.format_tooltip')}>
            <Button
              icon={<FormatPainterFilled />}
              onClick={formatJson}
              disabled={!jsonStr.trim()}
              size="small"
            />
          </Tooltip>
          <Tooltip title={t('json_editor.export_json_tooltip')}>
            <Button
              icon={<DownloadOutlined />}
              onClick={exportAsJson}
              disabled={!isValidJson}
              size="small"
            />
          </Tooltip>
          <Tooltip title={t('json_editor.export_js_tooltip')}>
            <Button
              icon={<FileTextOutlined />}
              onClick={exportAsJs}
              disabled={!isValidJson}
              size="small"
            />
          </Tooltip>
        </div>
      }
    >
      <div className="grid md:grid-cols-2 gap-4 gap-x-8 h-auto">
        <div className="md:col-span-1">
          <div className="mb-2 font-medium">{t('json_editor.editor_tab')}</div>
          <TextArea
            value={jsonStr}
            onChange={handleTextChange}
            placeholder={t('json_editor.placeholder')}
            autoSize={{ minRows: 10, maxRows: 20 }}
            className={!isValidJson && jsonStr.trim() ? 'border-red-500' : ''}
          />
          {!isValidJson && jsonStr.trim() && (
            <div className="text-red-500 text-sm mt-2">
              {t('json_editor.invalid_json')}
            </div>
          )}
        </div>
        <div className="md:col-span-1">
          <div className="mb-2 font-medium">{t('json_editor.preview_tab')}</div>
          {renderVisualView()}
        </div>
      </div>
    </Card>
  );
};

export default JsonEditor;
