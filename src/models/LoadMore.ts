export interface LoadMoreProps {
    skeleton: JSX.Element;
    onElementVisible: () => void;
    isLoadingMore: boolean;
    canLoadMore: boolean;
}
