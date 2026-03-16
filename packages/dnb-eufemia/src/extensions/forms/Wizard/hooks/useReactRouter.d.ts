export default function useReactRouter(id: string, { useSearchParams }: {
    useSearchParams: any;
}): {
    getIndex: () => number;
};
