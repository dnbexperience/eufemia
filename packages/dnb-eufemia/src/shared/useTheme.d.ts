/**
 * Theme Hook
 *
 */
import type { ThemeProps } from './Theme';
export type UseThemeReturn = (ThemeProps & {
    isUi: boolean;
    isSbanken: boolean;
    isEiendom: boolean;
    isCarnegie: boolean;
}) | null;
export default function useTheme(): UseThemeReturn;
