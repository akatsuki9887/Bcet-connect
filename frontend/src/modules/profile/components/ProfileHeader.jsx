export default function ProfileHeader({ profile }) {
  return (
    <div className="p-6 border rounded bg-white shadow">
      <img
        src={profile.avatar || "/default-avatar.png"}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover"
      />

      <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>

      <p className="text-gray-600 capitalize">{profile.role}</p>

      {profile.headline && (
        <p className="mt-2 text-lg font-semibold">{profile.headline}</p>
      )}

      <p className="mt-2">{profile.bio}</p>

      <div className="flex gap-4 mt-3">
        {profile.social?.linkedin && (
          <a href={profile.social.linkedin} target="_blank" className="text-blue-600 underline">
            LinkedIn
          </a>
        )}
        {profile.social?.github && (
          <a href={profile.social.github} target="_blank" className="text-gray-800 underline">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
