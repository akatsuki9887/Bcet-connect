import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import { useParams } from "react-router-dom";
import ChannelSidebar from "../components/ChannelSidebar";
import CommunityFeed from "../components/CommunityFeed";
import CommunityMembers from "../components/CommunityMembers";

export default function CommunityDetailPage() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);

  const loadCommunity = () => {
    api.get(`/communities/${id}`).then((res) => {
      setCommunity(res.data.data);
    });
  };

  useEffect(() => {
    loadCommunity();
  }, [id]);

  if (!community) return <p>Loading...</p>;

  return (
    <div className="flex gap-6 p-4">
      {/* LEFT → Channels */}
      <ChannelSidebar channels={community.channels} />

      {/* CENTER → Feed */}
      <CommunityFeed community={community} reload={loadCommunity} />

      {/* RIGHT → Members */}
      <CommunityMembers members={community.members} />
    </div>
  );
}
