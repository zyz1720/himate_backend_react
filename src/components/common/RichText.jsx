import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const RichText = (props) => {
  const { t } = useTranslation();
  const { value, onChange, height = 'auto', width = 'auto' } = props;
  const modules = {
    toolbar: [
      // 字体样式
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],

      // 文本格式
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],

      // 段落格式
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      // 列表
      [{ list: 'ordered' }, { list: 'bullet' }],

      // 插入元素
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['formula'],

      // 其他
      ['clean'],
    ],
  };

  return (
    <div className="pb-16" style={{ height, width }}>
      <ReactQuill
        theme="snow"
        locale="zh-cn"
        value={value}
        placeholder={t('rich_text.placeholder')}
        modules={modules}
        onChange={onChange}
        className="w-full h-full scrollbar"
      />
    </div>
  );
};

export default RichText;
