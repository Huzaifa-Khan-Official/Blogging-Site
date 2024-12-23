import React from "react";
import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import configuration from "../configuration/config";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchPosts = async (pageParam) => {
  const res = await axios.get(`${configuration.apiUrl}/posts`, {
    params: {
      page: pageParam,
      limit: 2,
    },
  });
  return res.data;
};

const PostList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (status === "loading") return <p>Loading...</p>;

  if (status === "error") {
    toast.error("An error occurred: " + error.message);
    return <p>An error occurred.</p>;
  }

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;