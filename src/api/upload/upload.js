import instance from '@/utils/request/axios_instance';

// 单文件上传
export const uploadFile = (file, callBack) =>
  instance.post('upload/file', file, {
    onUploadProgress: callBack,
  });
