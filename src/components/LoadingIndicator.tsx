export const LoadingIndicator = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    <p className="mt-2 text-white text-lg">Loading movies...</p>
  </div>
);
