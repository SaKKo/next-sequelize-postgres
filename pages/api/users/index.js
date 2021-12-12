import db from "../../../models";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await db.User.findAll();
    res.status(200).json({ users: users });
  } else if (req.method === "POST") {
    const params = req.body;
    const user = await db.User.create({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
    });
    res.status(201).json({ user: user });
  }
}
