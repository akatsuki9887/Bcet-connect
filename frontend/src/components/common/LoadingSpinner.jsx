export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full" />
    </div>
  );
}
