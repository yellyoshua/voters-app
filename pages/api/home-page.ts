import { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse) => {

  res.statusCode = 200
  res.json({
    id: 1,
    title: "UE Cardenal Gonzalez Zumarraga",
    created_at: 1596385699592,
    updated_at: 1596385724689
  })
}
