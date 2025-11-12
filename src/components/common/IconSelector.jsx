import { useState, useEffect, useMemo } from 'react';
import {
  Form,
  Input,
  Select,
  Space,
  Typography,
  Spin,
  App,
  Tooltip,
  Empty,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';
import { iconLibraries } from '@/constants/icon_libraries';
import { copyToClipboard } from '@/utils/common/string_util';
import { AiOutlineCopy } from 'react-icons/ai';

const { Text } = Typography;
const { Option } = Select;

// 图标库缓存对象
const iconLibraryCache = {};

// 异步加载图标库的函数，带缓存机制
const loadIconLibrary = async (importPath) => {
  // 检查缓存中是否已有该图标库
  if (iconLibraryCache[importPath]) {
    return iconLibraryCache[importPath];
  }

  try {
    const library = iconLibraries.find((lib) => lib.importPath === importPath);
    if (library) {
      const module = await library.import();
      // 将加载的图标库存入缓存
      iconLibraryCache[importPath] = module;
      return module;
    }
    console.error(`Icon library not supported: ${importPath}`);
    return null;
  } catch (error) {
    console.error(`Failed to load icon library: ${importPath}`, error);
    return null;
  }
};

// 虚拟化列表项组件
const IconItem = ({ icon, isSelected, onSelect }) => {
  return (
    <div
      className={`text-center cursor-pointer p-2 rounded-md transition-all duration-200 ${
        isSelected
          ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30'
          : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      onClick={() => onSelect(icon)}
    >
      <div className="flex justify-center items-center">
        <icon.Component size={32} />
      </div>
      <div className="mt-2 text-sm truncate">{icon.name}</div>
    </div>
  );
};

// 简单的虚拟化列表实现
const VirtualizedIconList = ({ data, height, onSelect, selectedIcon }) => {
  const [scrollTop, setScrollTop] = useState(0);

  // 图标项配置
  const itemHeight = 80; // 每个图标项的高度
  const itemsPerRow = {
    xs: 2,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 8,
  };

  // 获取当前屏幕尺寸对应的每行图标数
  const getCurrentItemsPerRow = () => {
    // 简单实现，实际项目中可能需要使用响应式钩子
    const width = window.innerWidth;
    if (width >= 1200) return itemsPerRow.xl;
    if (width >= 992) return itemsPerRow.lg;
    if (width >= 768) return itemsPerRow.md;
    if (width >= 576) return itemsPerRow.sm;
    return itemsPerRow.xs;
  };

  const itemsPerRowValue = getCurrentItemsPerRow();

  // 计算可见行数，额外渲染3行作为缓冲
  const visibleRows = Math.ceil(height / itemHeight) + 3;

  // 计算起始和结束索引
  const startRow = Math.floor(scrollTop / itemHeight);
  const startIndex = startRow * itemsPerRowValue;
  const endIndex = Math.min(
    startIndex + visibleRows * itemsPerRowValue,
    data.length,
  );

  // 获取可见的数据项
  const visibleData = data.slice(startIndex, endIndex);

  // 计算列表总高度
  const totalRows = Math.ceil(data.length / itemsPerRowValue);
  const totalHeight = totalRows * itemHeight;

  // 计算顶部填充高度
  const topPadding = startRow * itemHeight;

  // 处理滚动事件
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      className="relative"
      style={{ height, overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <div className="absolute w-full" style={{ height: totalHeight }}>
        {/* 顶部空白占位 */}
        <div style={{ height: topPadding }}></div>

        {/* 可见区域的图标网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 pb-6">
          {visibleData.map((icon) => (
            <IconItem
              key={`${icon.name}`}
              icon={icon}
              isSelected={selectedIcon?.name === icon.name}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const IconSelector = ({ onSelect, height = 460 }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [selectedLibrary, setSelectedLibrary] = useState('react-icons/ai');
  const [searchTerm, setSearchTerm] = useState('');
  const [iconList, setIconList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  // 加载选中的图标库
  useEffect(() => {
    if (selectedLibrary) {
      loadIcons();
    }
  }, [selectedLibrary]);

  // 使用useMemo优化搜索过滤性能
  const filteredIcons = useMemo(() => {
    if (iconList.length === 0) return [];

    if (!searchTerm.trim()) {
      return iconList;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return iconList.filter((icon) =>
      icon.name.toLowerCase().includes(lowerSearchTerm),
    );
  }, [searchTerm, iconList]);

  // 分批处理大型数组的辅助函数
  const processArrayInChunks = (array, chunkSize, callback) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }

    let currentChunk = 0;

    const processNextChunk = () => {
      if (currentChunk >= chunks.length) {
        callback([]);
        return;
      }

      // 在下一个动画帧处理下一批
      requestAnimationFrame(() => {
        callback(chunks[currentChunk]);
        currentChunk++;
        processNextChunk();
      });
    };

    processNextChunk();
  };

  const loadIcons = async () => {
    setLoading(true);
    try {
      const module = await loadIconLibrary(selectedLibrary);
      if (module) {
        // 获取模块中的所有图标组件
        const iconEntries = Object.entries(module).filter(
          ([key, value]) =>
            typeof value === 'function' &&
            key[0] === key[0].toUpperCase() &&
            !key.includes('_'),
        );

        // 对于大型图标库，分批处理以避免UI卡顿
        const CHUNK_SIZE = 50; // 每批处理的图标数量

        if (iconEntries.length > CHUNK_SIZE * 3) {
          // 如果图标数量较多
          // 先设置一个空数组
          setIconList([]);

          // 分批处理和设置图标
          let allIcons = [];
          processArrayInChunks(iconEntries, CHUNK_SIZE, (chunk) => {
            if (chunk.length === 0) return; // 处理完成

            const chunkIcons = chunk.map(([name, Component]) => ({
              name,
              Component,
            }));

            allIcons = [...allIcons, ...chunkIcons];
            setIconList([...allIcons]); // 更新状态
          });
        } else {
          // 对于小型图标库，直接处理
          const icons = iconEntries.map(([name, Component]) => ({
            name,
            Component,
          }));
          setIconList(icons);
        }
      }
    } catch (error) {
      console.error('Error loading icons:', error);
    } finally {
      setLoading(false);
    }
  };

  // 使用防抖优化图标选择操作
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // 防抖处理复制操作
  const debouncedCopyClick = debounce((text) => {
    handleCopyClick(text);
  }, 300);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    debouncedCopyClick(`<${icon.name} />`);
    if (onSelect) {
      onSelect(icon, selectedLibrary);
    }
  };

  const handleCopyClick = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      message.success(text + t('icon_selector.copy_success'));
    } else {
      message.error(t('icon_selector.copy_failed'));
    }
  };

  return (
    <Space direction="vertical" className="w-full">
      {/* 库选择器 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <Form.Item label={t('icon_selector.library')}>
            <Select
              className="w-full"
              value={selectedLibrary}
              onChange={setSelectedLibrary}
            >
              {iconLibraries.map((lib) => (
                <Option key={lib.importPath} value={lib.importPath}>
                  {lib.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-span-1">
          <Form.Item label={t('icon_selector.search_icon')}>
            <Input
              placeholder={t('icon_selector.search_icon')}
              prefix={<SearchOutlined />}
              allowClear
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Item>
        </div>
      </div>

      {/* 当前选中的图标信息 */}
      {selectedIcon && (
        <div className="bg-gray-100 dark:bg-gray-950 p-4 rounded-md">
          <Text strong>{t('icon_selector.selected_icon')}</Text>
          <Space direction="vertical" style={{ width: '100%', marginTop: 8 }}>
            <Space>
              <selectedIcon.Component size={24} />
              <Text>{selectedIcon.name}</Text>
            </Space>
            <div className="bg-gray-200 dark:bg-gray-900 p-2 rounded-md font-mono text-sm">
              <div>
                <strong>{t('icon_selector.import_statement')}：</strong>
                {`import { ${selectedIcon.name} } from '${selectedLibrary}';`}
                <Tooltip title={t('icon_selector.copy_tooltip')}>
                  <AiOutlineCopy
                    className="inline-block ml-2 cursor-pointer"
                    onClick={() =>
                      handleCopyClick(
                        `import { ${selectedIcon.name} } from '${selectedLibrary}';`,
                      )
                    }
                  />
                </Tooltip>
              </div>
              <div>
                <strong>{t('icon_selector.element')}：</strong>
                {`<${selectedIcon.name} />`}
                <Tooltip title={t('icon_selector.copy_tooltip')}>
                  <AiOutlineCopy
                    className="inline-block ml-2 cursor-pointer"
                    onClick={() => handleCopyClick(`<${selectedIcon.name} />`)}
                  />
                </Tooltip>
              </div>
            </div>
          </Space>
        </div>
      )}

      {/* 图标列表 - 使用虚拟化列表优化 */}
      <Spin spinning={loading} tip={t('icon_selector.loading')}>
        <div
          style={{ height, overflow: 'hidden' }}
          className="scroll-container-compact"
        >
          {filteredIcons.length === 0 && !loading ? (
            <Empty
              description={t('icon_selector.no_icons_found')}
              style={{ padding: 20 }}
            />
          ) : (
            <VirtualizedIconList
              data={filteredIcons}
              height={height}
              onSelect={handleIconSelect}
              selectedIcon={selectedIcon}
            />
          )}
        </div>
      </Spin>
    </Space>
  );
};

export default IconSelector;
