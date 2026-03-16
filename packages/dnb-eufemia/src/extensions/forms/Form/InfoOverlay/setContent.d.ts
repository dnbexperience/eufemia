import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
export type InfoOverlayContent = 'success' | 'error' | React.ReactNode | undefined;
export default function setContent(id: SharedStateId, content: InfoOverlayContent): void;
