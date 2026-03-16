import type { Path } from '../types';
export type Props = {
    id?: string;
    path?: Path;
    itemPath?: Path;
    omitSectionPath?: boolean;
};
export default function usePath(props?: Props): {
    identifier: string;
    path: string;
    itemPath: string;
    joinPath: (paths: Array<Path>) => string;
    makePath: (path: Path) => string;
    makeIteratePath: (itemPath?: Path, iteratePath?: Path, { omitSectionPath }?: {
        omitSectionPath?: boolean;
    }) => string;
    makeSectionPath: (path: Path) => string;
    cleanPath: typeof cleanPath;
};
export declare function cleanPath(path: Path): string;
export declare function appendPath(base: Path, part: Path | undefined): Path;
