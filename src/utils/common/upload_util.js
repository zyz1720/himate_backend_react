import { uploadFile } from '@/api/upload/upload';

/**
 * 自定义上传请求
 * @param {File} file - 要上传的文件对象
 * @param {function} onSuccess - 上传成功回调函数，参数为上传后的文件URL
 * @param {function} onError - 上传失败回调函数，参数为错误信息
 * @param {function} onProgress - 上传进度回调函数，参数为进度对象{percent: 上传进度百分比}
 */
export const uploadCustomRequest = async ({
  file,
  file_type,
  use_type,
  onSuccess = () => {},
  onError = () => {},
  onProgress = () => {},
}) => {
  try {
    // 准备FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_type', file_type);
    formData.append('use_type', use_type);

    // 上传文件
    const uploadResponse = await uploadFile(formData, (event) => {
      const percent = ((event.loaded / event.total) * 100) | 0;
      onProgress({ percent });
    });

    if (uploadResponse.code == 0) {
      onSuccess(uploadResponse.data.file_key);
    } else {
      throw new Error('上传失败，未返回key');
    }
  } catch (error) {
    onError(error);
  }
};
