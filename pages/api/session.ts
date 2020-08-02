import { NextApiRequest, NextApiResponse } from 'next';

const users = [
  {
    _id: "001",
    username: "yellyoshua",
    name: "Yoshua",
    surname: "Lopez",
    avatar: "/vercel.svg",
    email: "hola@mundo.com",
    provider: "",
    confirmed: true,
    active: true,
    profiles: [{
      name: "admin",
      show: "Administrador",
      can: [
        "create.post.alert",
        "create.post.blog",
        "create.post.event",
        "edit.post.blog.change_visibility",
        "edit.post.alert.change_visibility",
        "edit.post.event.change_visibility",
        "remove.post.blog.change_visibility",
        "remove.post.alert.change_visibility",
        "remove.post.event.change_visibility",
        "remove.post.comment",

        "create.user.admin",
        "create.user.docente",
        "create.user.client",
        "edit.user.recovery_password",
        "edit.user.fields",
        "remove.user.admin",
        "remove.user.docente",
        "remove.user.client",

        "create.election.session",
        "create.election.candidats",
        "edit.election.session",
        "edit.election.candidats",
        "remove.election.session",
        "remove.election.candidats",
      ],
    }]
  },
  {
    _id: "002",
    username: "loremipsum",
    name: "Lorem",
    surname: "Ipsum",
    avatar: "/vercel.svg",
    email: "lorem@mundo.com",
    provider: "",
    confirmed: false,
    active: false,
    profiles: [{
      name: "docente",
      show: "Docente",
      can: [
        "create.post.alert",
        "create.post.blog",
        "create.post.event",
        "edit.post.blog.change_visibility",
        "edit.post.alert.change_visibility",
        "edit.post.event.change_visibility",
        "remove.post.blog.change_visibility",
        "remove.post.alert.change_visibility",
        "remove.post.event.change_visibility",
        "remove.post.comment",

        "create.user.admin",
        "create.user.docente",
        "create.user.client",
        "edit.user.recovery_password",
        "edit.user.fields",
        "remove.user.admin",
        "remove.user.docente",
        "remove.user.client",

        "create.election.session",
        "create.election.candidats",
        "edit.election.session",
        "edit.election.candidats",
        "remove.election.session",
        "remove.election.candidats",
      ],
    }]
  },
  {
    _id: "003",
    username: "yellyoshua",
    name: "Yoshua",
    surname: "Lopez",
    avatar: "/vercel.svg",
    email: "hola@mundo.com",
    provider: "",
    confirmed: true,
    active: false,
    profiles: [{
      name: "client",
      show: "Cliente",
      can: [],
    }]
  }
];

const sessions: Array<{
  token: string;
  userId: string;
}> = [
    {
      token: "someclient",
      userId: "003"
    },
    {
      token: "someadmin",
      userId: "001"
    },
    {
      token: "somedocente",
      userId: "002"
    }
  ]

export default (req: NextApiRequest, res: NextApiResponse) => {
  const token: string = req.headers.authorization || "";
  let session = sessions.filter((auth) => token.includes(auth.token));

  if (session.length >= 1) {
    let client = users.filter((user) => user._id === session[0].userId);

    res.statusCode = 200;

    return res.json({
      response: {
        sessionToken: session[0].token,
        session: {
          profiles: client[0].profiles,
        },
        user: {
          _id: client[0]._id,
          username: client[0].username,
          name: client[0].name,
          surname: client[0].surname,
          avatar: client[0].avatar,
          email: client[0].email,
          provider: client[0].provider,
          confirmed: client[0].confirmed,
          active: client[0].active
        },
        content: {}
      }
    })
  }

  res.statusCode = 200
  res.json({ response: {} })
}
