import type { UploadFile, UploadFileNative, UploadProps } from './types';
export type useUploadReturn = {
    files: Array<UploadFile>;
    setFiles: (files: Array<UploadFile | UploadFileNative>) => void;
    clearFiles: () => void;
    internalFiles: Array<UploadFile>;
    setInternalFiles: (files: Array<UploadFile>) => void;
    getExistingFile: (file: File, fileItems?: Array<UploadFile>) => UploadFile;
};
/**
 * Use together with Upload with the same id to manage the files from outside the component.
 */
declare function useUpload(id: UploadProps['id']): useUploadReturn;
export declare const isFileEqual: (fileA: File, fileB: File) => boolean;
export default useUpload;
