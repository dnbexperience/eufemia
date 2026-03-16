import type { ArrayItemAreaProps } from './ArrayItemArea';
import type { BasicProps } from '../../../../components/flex/Container';
type ArrayItemAreaContext = {
    handleRemoveItem?: () => void;
    variant?: ArrayItemAreaProps['variant'];
    toolbarVariant?: ArrayItemAreaProps['toolbarVariant'];
    divider?: BasicProps['divider'];
};
declare const ArrayItemAreaContext: import("react").Context<ArrayItemAreaContext>;
export default ArrayItemAreaContext;
