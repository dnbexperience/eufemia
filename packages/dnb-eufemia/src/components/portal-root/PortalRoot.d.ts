import React from 'react';
type SelectorOptions = {
    /**
     * The id used for the portal root element. Defaults to `eufemia-portal-root`.
     * If an element with this id already exists in the DOM, it will be reused.
     */
    id?: string;
    /**
     * CSS selector for a container to place the portal root inside. The portal element is inserted as the first child of the matched element.
     */
    insideSelector?: string;
    /**
     * CSS selector for a target element; the portal root will be inserted directly before the first matched element.
     */
    beforeSelector?: string;
};
export type PortalRootProps = {
    ref?: React.Ref<HTMLElement> | React.RefObject<HTMLElement> | ((instance: HTMLElement) => void);
} & SelectorOptions & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'id'>;
export type PortalRootProviderProps = React.PropsWithChildren<SelectorOptions>;
export declare function PortalRootProvider(props: PortalRootProviderProps): React.JSX.Element | null;
export declare function getOrCreatePortalElement({ id, insideSelector, beforeSelector, }: SelectorOptions): HTMLElement | null;
declare function PortalRoot(props: PortalRootProps): import("react/jsx-runtime").JSX.Element;
declare namespace PortalRoot {
    var Provider: typeof PortalRootProvider;
}
export default PortalRoot;
