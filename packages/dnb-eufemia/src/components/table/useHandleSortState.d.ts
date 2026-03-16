export type useHandleSortStateOptions = {
    /**
     * Defines if the current column should be active or not.
     * Defaults to false.
     */
    active?: boolean;
    /**
     * Define the sorting direction. Can be "asc", "desc" or "off".
     * Defaults to "off".
     */
    direction?: useHandleSortStateDirection;
    /**
     * Define the possible modes.
     * Defaults to ["asc", "desc", "off"].
     */
    modes?: Array<useHandleSortStateMode>;
};
export type useHandleSortStateDirection = 'asc' | 'desc' | 'off';
export type useHandleSortStateMode = 'asc' | 'desc' | 'off';
export type useHandleSortStateName = string;
export type useHandleSortStateConfig = Record<useHandleSortStateName, useHandleSortStateOptions>;
export type SortState = Record<useHandleSortStateName, {
    active: boolean;
    reversed: boolean;
    direction: useHandleSortStateDirection | 'off';
}>;
export type SortEventHandler = () => void;
export type SortHandler = Record<useHandleSortStateName, SortEventHandler>;
export declare function useHandleSortState(config: useHandleSortStateConfig, defaults?: useHandleSortStateOptions): {
    sortState: SortState;
    sortHandler: SortHandler;
    activeSortName: any;
};
export default useHandleSortState;
