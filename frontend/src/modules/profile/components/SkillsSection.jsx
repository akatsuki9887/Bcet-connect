export default function SkillsSection({ skills = [] }) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="font-semibold mb-3">Skills</h3>

      <div className="flex gap-2 flex-wrap">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {skill}
            </span>
          ))
        ) : (
          <p>No skills added</p>
        )}
      </div>
    </div>
  );
}
