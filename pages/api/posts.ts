
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

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  return res.json({ posts: postsData })
}