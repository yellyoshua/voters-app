import { ReactElement } from "react";
import { Post } from "../../lib/collection/Post";
import { usePost } from "../../hooks/useSWR";

export default (props: any): ReactElement => {
  const { data, error } = usePost().fetch;

  if (data) {
    const posts: Post[] = data;
    return <div>
      {
        posts.map(post => (
          <div key={post.slug}>

          </div>
        ))
      }
    </div>;
  }
  return <></>;
}