export default function JobMatchWidget({ jobSkills }) {
  const match = Math.floor(Math.random() * 30) + 70; // Temp 70–100%

  return (
    <div className="p-4 border rounded bg-blue-50">
      <p className="font-bold text-lg">AI Match Score: {match}%</p>
      <p className="text-sm text-gray-600">
        Based on job requirements vs your profile skills.
      </p>
    </div>
  );
}
