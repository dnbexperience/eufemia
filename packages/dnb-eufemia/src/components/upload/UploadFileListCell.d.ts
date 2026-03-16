import React from 'react';
import type { UploadFile, UploadFileNative } from './types';
import type { ProgressIndicatorAllProps } from '../progress-indicator/types';
export declare const fileExtensionImages: {
    png: (props: any) => import("react/jsx-runtime").JSX.Element;
    jpg: (props: any) => import("react/jsx-runtime").JSX.Element;
    pdf: (props: any) => import("react/jsx-runtime").JSX.Element;
    doc: (props: any) => import("react/jsx-runtime").JSX.Element;
    docx: (props: any) => import("react/jsx-runtime").JSX.Element;
    odt: (props: any) => import("react/jsx-runtime").JSX.Element;
    xls: (props: any) => import("react/jsx-runtime").JSX.Element;
    ppt: (props: any) => import("react/jsx-runtime").JSX.Element;
    csv: (props: any) => import("react/jsx-runtime").JSX.Element;
    txt: (props: any) => import("react/jsx-runtime").JSX.Element;
    xml: (props: any) => import("react/jsx-runtime").JSX.Element;
    file: (props: any) => import("react/jsx-runtime").JSX.Element;
};
export type UploadFileListCellProps = {
    id: string;
    /**
     * Uploaded file
     */
    uploadFile: UploadFile | UploadFileNative;
    /**
     * Calls onDelete when clicking the delete button
     */
    onDelete: () => void;
    /**
     * Calls onClick when clicking the file name
     */
    onClick?: () => void;
    /**
     * Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window.
     * Default: false
     */
    download?: boolean;
    /**
     * Allows uploading of duplicate files.
     * Default: false
     */
    allowDuplicates?: boolean;
    /**
     * Text
     */
    loadingText: React.ReactNode;
    deleteButtonText: React.ReactNode;
};
declare const UploadFileListCell: ({ id, uploadFile, onDelete, onClick, loadingText, deleteButtonText, download, allowDuplicates, }: UploadFileListCellProps) => import("react/jsx-runtime").JSX.Element;
export default UploadFileListCell;
export declare function getFileIcon(file: File, loading?: {
    isLoading: UploadFile['isLoading'];
    size?: ProgressIndicatorAllProps['size'];
}, hasWarning?: boolean): import("react/jsx-runtime").JSX.Element;
