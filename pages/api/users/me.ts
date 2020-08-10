import { NextApiRequest, NextApiResponse } from 'next';

const sessions: Array<{
  token: string;
  user: any;
}> = [
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk1OTU5NjU0LCJleHAiOjE1OTg1NTE2NTR9.2qt0AIgVZPsduecu7G8_QbnwDgLDZiT25wQRcGqqQfI",
      user: {
        "id": 1,
        "username": "yoshualopez",
        "email": "yoshualopez1529@hotmail.com",
        "provider": "local",
        "confirmed": true,
        "blocked": null,
        "role": {
          "id": 1,
          "name": "Administrator",
          "description": "Este perfil puede crear usuarios",
          "type": "authenticated"
        },
        "created_at": "2020-07-28T18:07:34.032Z",
        "updated_at": "2020-08-04T01:07:40.054Z"
      }
    }
  ]

export default (req: NextApiRequest, res: NextApiResponse) => {
  const token: string = req.headers.authorization || "";
  let beUser: boolean = false;
  let user: any = null;

  for (let i = 0; sessions.length > i; i++) {
    beUser = !!token.includes(sessions[i].token);
    user = sessions[i].user;
  }

  if (!beUser) {
    res.statusCode = 401;
    return res.json({
      statusCodestatusCode: 401,
      error: "Unauthorized",
      message: "Invalid token."
    })
  }

  res.statusCode = 200
  return res.json(user)
}
