import type { UploadFile, UploadContextProps, UploadAcceptedFileTypes, UploadAcceptedFileTypesWithFileMaxSize, UploadFileNative } from './types';
export declare const BYTES_IN_A_MEGA_BYTE = 1048576;
export declare function verifyFiles(files: Array<UploadFile | UploadFileNative>, context: Pick<UploadContextProps, 'errorUnsupportedFile' | 'errorLargeFile' | 'acceptedFileTypes' | 'fileMaxSize'>): (UploadFile | UploadFileNative)[];
export declare function getFileTypeFromExtension(file: File): string;
export declare function getAcceptedFileTypes(acceptedFileTypes: UploadAcceptedFileTypes | UploadAcceptedFileTypesWithFileMaxSize): string;
export declare function hasPreferredMimeType(acceptedFileTypes: UploadAcceptedFileTypes, file: File): boolean;
export declare function isArrayOfStrings(arr: any): boolean;
export declare function isArrayOfObjects(arr: any): boolean;
export declare function extendWithAbbreviation(acceptedFileTypes: UploadAcceptedFileTypes, abbreviations?: {
    jpg: string;
}): string[];
