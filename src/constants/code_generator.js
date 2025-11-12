/**
 * 自动时间类型
 */
export const autoTimeTypes = ['create', 'update', 'delete'];

/**
 * 表单类型
 */
export const formTypes = [
  'ProFormText',
  'ProFormDigit',
  'ProFormText.Password',
  'ProFormTextArea',
  'ProFormCaptcha',
  'ProFormDatePicker',
  'ProFormDateTimePicker',
  'ProFormDateRangePicker',
  'ProFormDateTimeRangePicker',
  'ProFormSelect',
  'ProFormTreeSelect',
  'ProFormCheckbox',
  'ProFormRadio.Group',
  'ProFormSlider',
  'ProFormSwitch',
  'ProFormUploadButton',
  'ProFormUploadDragger',
  'ProFormMoney',
  'ProFormSegmented',
  'RichText',
];

/**
 * 显示值类型
 */
export const valueTypes = [
  'password',
  'money',
  'textarea',
  'date',
  'dateTime',
  'dateWeek',
  'dateMonth',
  'dateQuarter',
  'dateYear',
  'dateRange',
  'dateTimeRange',
  'time',
  'timeRange',
  'text',
  'select',
  'treeSelect',
  'checkbox',
  'rate',
  'radio',
  'radioButton',
  'progress',
  'percent',
  'digit',
  'second',
  'avatar',
  'code',
  'switch',
  'fromNow',
  'image',
  'jsonCode',
  'color',
  'cascader',
  'segmented',
  'group',
  'formList',
  'formSet',
  'divider',
  'dependency',
];

/**
 * 渲染类型
 */
export const renderTypes = ['text', 'html', 'tag'];

/**
 * 枚举状态类型
 */
export const enumStatusTypes = ['Default', 'Success', 'Processing', 'Error'];

/**
 * 数值类型
 */
export const numberTypes = [
  'int',
  'bigint',
  'smallint',
  'float',
  'decimal',
  'double',
  'tinyint',
  'mediumint',
];

/**
 * 时间类型
 */
export const timeTypes = ['datetime', 'date', 'time', 'timestamp', 'year'];

/**
 * 字符类型
 */
export const charTypes = ['char', 'varchar'];

/**
 * 文本类型
 */
export const textTypes = ['text', 'mediumtext', 'longtext', 'tinytext'];

/**
 * 代码类型
 */
export const codeTypes = ['json'];

/**
 * 文件类型
 */
export const fileTypes = ['blob', 'longblob', 'mediumblob', 'tinyblob'];

/**
 * SQL字段类型
 */
export const sqlFieldTypes = [
  ...numberTypes,
  ...timeTypes,
  ...charTypes,
  ...textTypes,
  ...codeTypes,
  ...fileTypes,
  'enum',
];
