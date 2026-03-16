import DialogBody from './parts/DialogBody';
import DialogHeader from './parts/DialogHeader';
import DialogNavigation from './parts/DialogNavigation';
import type { DialogProps, DialogContentProps } from './types';
declare function Dialog(localProps: DialogProps & DialogContentProps): import("react/jsx-runtime").JSX.Element;
declare namespace Dialog {
    var Body: typeof DialogBody;
    var Header: typeof DialogHeader;
    var Navigation: typeof DialogNavigation;
    var Action: ({ declineText, confirmText, hideDecline, hideConfirm, onConfirm, onDecline, className, children, ...props }: import("./parts/DialogAction").DialogActionAllProps) => import("react/jsx-runtime").JSX.Element;
}
export default Dialog;
