import type { FieldProps } from '../../types';
import type { UploadFile, UploadFileNative, UploadProps } from '../../../../components/Upload';
import type { SpacingProps } from '../../../../shared/types';
export type { UploadFile, UploadFileNative };
export type UploadValue = Array<UploadFile | UploadFileNative>;
export type Props = Omit<FieldProps<UploadValue, UploadValue | undefined>, 'layout' | 'layoutOptions' | 'onBlurValidator' | 'onChangeValidator' | 'contentWidth' | 'labelSize' | 'labelDescriptionInline' | 'labelSrOnly' | 'labelSize'> & SpacingProps & Pick<Partial<UploadProps>, 'children' | 'title' | 'variant' | 'text' | 'acceptedFileTypes' | 'filesAmountLimit' | 'fileMaxSize' | 'onFileDelete' | 'onFileClick' | 'skeleton' | 'download' | 'allowDuplicates' | 'buttonProps' | 'disableDragAndDrop'> & {
    fileHandler?: (newFiles: UploadValue) => UploadValue | Promise<UploadValue>;
    onValidationError?: (invalidFiles: UploadValue) => UploadValue | void;
    width?: 'large' | 'stretch';
};
declare function UploadComponent(props: Props): import("react/jsx-runtime").JSX.Element;
export default UploadComponent;
export declare function transformFiles(value: UploadValue): UploadValue | undefined;
