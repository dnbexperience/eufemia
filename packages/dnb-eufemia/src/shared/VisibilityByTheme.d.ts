import type React from 'react';
import type { ThemeNames, ThemeProps } from './Theme';
type VisibilityByThemeProps = {
    /**
     * A valid theme name or object.
     * Will pass children on a match.
     */
    visible?: ThemeParams;
    /**
     * A valid theme name or object.
     * Will omit passing children on a match.
     * NB: "visible" takes presence over "hidden"
     */
    hidden?: ThemeParams;
    /**
     * Any kind of a React Node that should render on a match.
     */
    children: React.ReactNode;
};
type ThemeItem = ThemeNames | ThemeProps;
type ThemeParams = ThemeItem | Array<ThemeItem>;
declare function VisibilityByTheme({ children, visible, hidden, }: VisibilityByThemeProps): React.JSX.Element;
declare namespace VisibilityByTheme {
    var Name: () => "Carnegie" | "Eiendom" | "Sbanken" | "DNB";
}
export default VisibilityByTheme;
