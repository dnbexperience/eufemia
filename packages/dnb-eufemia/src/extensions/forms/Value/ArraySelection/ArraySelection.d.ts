import type { ValueProps } from '../../types';
import { ListFormatProps } from '../../../../components/list-format';
export type Props = ValueProps<Array<number | string>> & ListFormatProps;
declare function ArraySelection(props: Props): import("react/jsx-runtime").JSX.Element;
export default ArraySelection;
