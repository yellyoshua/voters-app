import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default (req: NextApiRequest, res: NextApiResponse) => {

  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
