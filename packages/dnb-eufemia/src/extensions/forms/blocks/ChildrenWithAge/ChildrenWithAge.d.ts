import type { SectionProps } from '../../Form/Section';
import type { SpacingProps } from '../../../../shared/types';
type Mode = 'edit' | 'summary';
type Variant = Array<'joint-responsibility' | 'daycare'>;
export type Props = SectionProps & {
    mode?: Mode;
    enableAdditionalQuestions?: Variant;
    toWizardStep?: number;
} & SpacingProps;
export default function ChildrenWithAge({ mode, enableAdditionalQuestions, toWizardStep, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
