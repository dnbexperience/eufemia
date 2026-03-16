import type { SpacingProps } from '../space/types';
export type UploadFileLinkProps = UploadFileAnchorProps & UploadFileButtonProps;
export declare const UploadFileLink: (props: UploadFileLinkProps) => import("react/jsx-runtime").JSX.Element;
export default UploadFileLink;
type UploadFileButtonProps = {
    text: string;
    onClick?: () => void;
} & SpacingProps;
type UploadFileAnchorProps = {
    text: string;
    href: string;
    download?: boolean;
} & SpacingProps;
