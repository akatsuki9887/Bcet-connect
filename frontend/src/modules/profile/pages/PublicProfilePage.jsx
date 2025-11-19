import { useEffect, useState } from "react";
import axios from "../../../services/apiClient";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";

export default function PublicProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`/user/${userId}`)
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.error("Public profile fetch error:", err);
      });
  }, [userId]);

  if (!profile) return <p className="p-4">Loading Profile...</p>;

  return (
    <div className="p-4">
      <ProfileHeader profile={profile} />
    </div>
  );
}
