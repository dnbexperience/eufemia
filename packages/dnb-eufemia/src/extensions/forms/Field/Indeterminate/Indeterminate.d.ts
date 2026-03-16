import type { Props as ToggleAllProps } from '../Toggle/Toggle';
import type { Path } from '../../types';
export type Props = Partial<Omit<ToggleAllProps, 'textOn' | 'textOff'>> & {
    /**
     * An array of paths to the data object.
     */
    dependencePaths: Array<Path>;
    /**
     * When `checked`, the dependent checkboxes will always be set to "checked" when in indeterminate state.
     * When `unchecked`, the dependent checkboxes will be set to "unchecked" when in indeterminate state.
     * When "auto", the dependent checkboxes will get the inverted state from where the (this) parent checkbox is in.
     * Default is `checked`.
     */
    propagateIndeterminateState?: 'checked' | 'unchecked' | 'auto';
};
export default function Indeterminate(props: Props): import("react/jsx-runtime").JSX.Element;
