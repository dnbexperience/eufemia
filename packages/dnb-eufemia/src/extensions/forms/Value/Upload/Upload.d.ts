import type { ValueProps } from '../../types';
import type { ListFormatProps } from '../../../../components/list-format';
import type { UploadFile } from '../../../../components/upload/types';
import type { Props as FieldUploadProps } from '../../Field/Upload/Upload';
export type Props = ValueProps<Array<UploadFile>> & Omit<ListFormatProps, 'value'> & Pick<FieldUploadProps, 'download' | 'onFileClick'> & {
    displaySize?: boolean;
};
declare function Upload(props: Props): import("react/jsx-runtime").JSX.Element;
export default Upload;
