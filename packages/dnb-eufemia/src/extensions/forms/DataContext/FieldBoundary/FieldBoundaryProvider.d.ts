import React from 'react';
import type { Path } from '../../types';
export type Props = {
    showErrors?: boolean;
    onPathError?: (path: Path, error: Error) => void;
    children: React.ReactNode;
};
export default function FieldBoundaryProvider(props: Props): import("react/jsx-runtime").JSX.Element;
