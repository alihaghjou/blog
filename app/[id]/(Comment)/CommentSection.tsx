"use client";

import type { User } from "@supabase/supabase-js";
import DeleteComment from "./DeleteComment";
import PostComment from "./PostComment";

type commentSectionProps = {
  post: {
    comments:
      | {
          comment: string;
          user_id: string;
        }[]
      | null;
    content: string;
    id: number;
    inserted_at: string;
    name: string;
    updated_at: string;
    user_id: string;
  };
  loggedUser: User | null;
  paramsId: string;
};

export default function CommentSection({
  post,
  loggedUser,
  paramsId,
}: commentSectionProps) {
  return (
    <>
      {loggedUser ? (
        <PostComment
          id={paramsId}
          comments={post.comments}
          userId={loggedUser.id}
        />
      ) : (
        <p className="text-center pt-4">Login in for posting comment.</p>
      )}
      <section className="p-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="indent-4 mt-4">
          {post.comments ? (
            post.comments?.reverse().map((comment, i) => (
              <p
                key={i}
                className="border-b py-6 rounded flex gap-2 items-center"
                style={
                  loggedUser?.id === comment.user_id
                    ? { backgroundColor: "#d1d5db" }
                    : { backgroundColor: "white" }
                }
              >
                <span>{comment.comment}</span>
                {post.comments &&
                loggedUser &&
                [comment.user_id, post.user_id].includes(loggedUser?.id) ? (
                  <DeleteComment
                    commentToDelete={comment}
                    comments={post.comments}
                    postId={paramsId}
                  />
                ) : null}
              </p>
            ))
          ) : (
            <p className="text-gray-600">Be the First Person to Comment</p>
          )}
        </div>
      </section>
    </>
  );
}
