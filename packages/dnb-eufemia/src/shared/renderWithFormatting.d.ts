import React from 'react';
export type FormatOptions = {
    br?: string;
    strong?: (c: React.ReactNode) => React.ReactNode;
    em?: (c: React.ReactNode) => React.ReactNode;
    link?: (c: React.ReactNode, href: string) => React.ReactNode;
    code?: (c: React.ReactNode) => React.ReactNode;
};
type Nodes = React.ReactNode[];
export default function renderWithFormatting(text: string | Nodes, { br, strong, em, link, code, }?: FormatOptions): React.ReactNode;
export {};
