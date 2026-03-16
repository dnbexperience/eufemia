import useUpload from './useUpload';
import { defaultProps } from './UploadContext';
import type { UploadAllProps } from './types';
export type * from './types';
export { defaultProps };
declare const Upload: {
    (localProps: UploadAllProps): import("react/jsx-runtime").JSX.Element;
    useUpload: typeof useUpload;
};
export default Upload;
