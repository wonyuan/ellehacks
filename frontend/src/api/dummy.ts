// import { get } from "./fetchRequests";

// export const fetchFlaskData = async () => {
//   const data = await get({
//     url: "http://localhost:5000/api/data",
//   });
//   return data;
// };

import { get, post } from "./fetchRequests";

interface placeholderGetProps {
  params: { postId?: string };
}

export const placeholderGet = async ({ params }: placeholderGetProps) => {
  const data = await get({
    url: "https://jsonplaceholder.typicode.com/comments",
    params: params,
  });
  return data;
};

interface placeholderPostProps {
  params: {
    title: string;
    body: string;
    userId: number;
  };
}

export const placeholderPost = async ({ params }: placeholderPostProps) => {
  const data = await post({
    url: "https://jsonplaceholder.typicode.com/posts",
    body: params,
  });

  return data;
};