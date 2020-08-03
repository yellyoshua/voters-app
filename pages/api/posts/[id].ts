
import { NextApiRequest, NextApiResponse } from 'next';

const postsData = [
  {
    id: "la-casa-blanca",
    title: "La casa blanca de color verde"
  },
  {
    id: "la-casa-roja",
    title: "La casa roja de color verde"
  },
  {
    id: "la-casa-amarilla",
    title: "La casa amarilla de color verde"
  }
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const postsFind = postsData.find((post: { id: string }) => post.id === req.query.id);
  const post = postsFind || {};
  res.statusCode = 200;
  return res.json({ post });
}