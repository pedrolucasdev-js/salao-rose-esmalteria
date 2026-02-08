export default function ProgressBar({ step }: { step: number }) {
  const total = 4

  return (
    <div className="w-full bg-gray-200 h-3 rounded mb-6">
      <div
        className="bg-pink-500 h-3 rounded transition-all"
        style={{ width: `${(step / total) * 100}%` }}
      />
    </div>
  )
}
