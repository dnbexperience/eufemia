import type { Path, ValueProps } from '../../types';
export type Props = ValueProps<string> & {
    dataPath?: Path;
};
declare function Selection(props: Props): import("react/jsx-runtime").JSX.Element;
export default Selection;
