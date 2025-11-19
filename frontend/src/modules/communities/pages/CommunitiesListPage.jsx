import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import CommunityCard from "../components/CommunityCard";

export default function CommunitiesListPage() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    api.get("/communities").then((res) => {
      setCommunities(res.data.data);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Communities</h1>

      {communities.map((c) => (
        <CommunityCard key={c._id} community={c} />
      ))}
    </div>
  );
}
