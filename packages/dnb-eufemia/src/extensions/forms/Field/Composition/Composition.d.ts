import { Props as FieldBlockProps } from '../../FieldBlock';
export type Props = Pick<FieldBlockProps, 'id' | 'label' | 'labelDescription' | 'labelDescriptionInline' | 'labelSrOnly' | 'labelSize' | 'width' | 'align' | 'contentWidth' | 'disabled' | 'error' | 'warning' | 'info' | 'children' | 'help' | 'className' | 'space'>;
declare function CompositionField(props: Props): import("react/jsx-runtime").JSX.Element;
export default CompositionField;
