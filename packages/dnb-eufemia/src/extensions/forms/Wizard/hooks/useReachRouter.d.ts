export default function useReachRouter(id: string, { useLocation, navigate }: {
    useLocation: any;
    navigate: any;
}): {
    getIndex: () => number;
};
