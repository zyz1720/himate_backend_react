import JSZip from 'jszip';
import { generateCode } from './generate_code_util';
import { downloadFile } from '@/utils/common/download_util';

/**
 * 生成压缩包
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @returns {void}
 */
export async function generateZipFile(tableInfo) {
  const { tableName } = tableInfo;
  const generatedCode = generateCode(tableInfo);

  const zip = new JSZip();

  Object.entries(generatedCode).forEach(([_, frameworkCode]) => {
    Object.entries(frameworkCode).forEach(([_, codeOrObj]) => {
      if (
        typeof codeOrObj === 'object' &&
        codeOrObj !== null &&
        Object.keys(codeOrObj).length > 0 &&
        Object.values(codeOrObj).every(
          (val) => typeof val === 'object' && val !== null,
        )
      ) {
        // 处理嵌套的dto对象
        Object.entries(codeOrObj).forEach(([_, dtoCode]) => {
          zip.file(dtoCode.zipPath, dtoCode.code);
        });
      } else {
        // 处理普通代码文件
        zip.file(codeOrObj.zipPath, codeOrObj.code);
      }
    });
  });

  // 生成zip文件
  const content = await zip.generateAsync({ type: 'blob' });

  // 下载文件
  downloadFile(content, `${tableName}_code.zip`);
}
