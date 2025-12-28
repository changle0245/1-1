export default function Loading() {
  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-charcoal-400">Loading...</p>
      </div>
    </div>
  );
}
