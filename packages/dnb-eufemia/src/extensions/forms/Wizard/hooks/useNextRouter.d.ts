export default function useNextRouter(id: string, { useRouter, usePathname, useSearchParams }: {
    useRouter: any;
    usePathname: any;
    useSearchParams: any;
}): {
    getIndex: () => number;
};
