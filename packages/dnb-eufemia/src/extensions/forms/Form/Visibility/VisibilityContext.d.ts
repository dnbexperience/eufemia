import type { Props } from './Visibility';
type VisibilityContext = {
    isVisible: boolean;
    keepInDOM: boolean;
    inheritVisibility?: boolean;
    props?: Props;
};
declare const VisibilityContext: import("react").Context<VisibilityContext>;
export default VisibilityContext;
