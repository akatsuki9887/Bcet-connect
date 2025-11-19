import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import CreatePostBox from "../components/CreatePostBox";
import PostCard from "../components/PostCard";
import FeedFilters from "../components/FeedFilters";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  const loadFeed = () => {
    api.get("/feed").then((res) => {
      setPosts(res.data.data);
    });
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-5 space-y-6">
      <CreatePostBox onPostCreated={loadFeed} />

      <FeedFilters onFilter={(type) => loadFeed(type)} />

      {posts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={loadFeed} />
      ))}
    </div>
  );
}
