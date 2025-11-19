import { useEffect, useState } from "react";
import axios from "../../../services/apiClient";
import ProfileHeader from "../components/ProfileHeader";
import SkillsSection from "../components/SkillsSection";
import PortfolioGrid from "../components/PortfolioGrid";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/user/me")
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
      });
  }, []);

  if (!profile) return <p className="p-4">Loading Profile...</p>;

  return (
    <div className="space-y-6 p-4">
      <ProfileHeader profile={profile} />

      <SkillsSection skills={profile.skills} />

      <PortfolioGrid items={profile.portfolio} />
    </div>
  );
}
