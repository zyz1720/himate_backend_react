// 导入Node.js文件系统和路径模块
import fs from 'fs';
import path from 'path';

export default [
  {
    url: '/dev/apply_code',
    method: 'post',
    response: (req) => {
      try {
        const { data, gin_name, nest_name } = req.body || {};
        // 遍历请求体中的文件数据
        if (Array.isArray(data)) {
          data.forEach((fileItem) => {
            // 只处理启用的文件
            if (
              fileItem.enabled &&
              fileItem.path &&
              fileItem.code !== undefined
            ) {
              // 默认使用当前项目根目录
              let targetRoot = process.cwd();
              // 获取当前工作目录的父目录（即C:\Users\1\Desktop\daily）
              const parentDir = path.dirname(process.cwd());

              // 当传入了nest_name参数且是nestjs框架的文件时，使用指定的根目录
              if (nest_name && fileItem.framework === 'nestjs') {
                targetRoot = path.join(parentDir, nest_name);
              }
              // 当传入了gin_name参数且是gin框架的文件时，使用指定的根目录
              if (gin_name && fileItem.framework === 'gin') {
                targetRoot = path.join(parentDir, gin_name);
              }

              // 构建完整的文件路径
              const fullPath = path.join(targetRoot, fileItem.path);

              console.log(targetRoot, fullPath);

              // 确保目录存在
              const directory = path.dirname(fullPath);
              if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
              }

              // 写入文件内容
              fs.writeFileSync(fullPath, fileItem.code, 'utf8');
              console.log(`文件已生成: ${fullPath}`);
            }
          });
        }

        return {
          code: 0,
          data: {
            success: true,
            message: '代码文件生成成功',
          },
        };
      } catch (error) {
        console.error('代码文件生成失败:', error);
        return {
          code: 500,
          message: `代码文件生成失败: ${error.message}`,
        };
      }
    },
  },
];
