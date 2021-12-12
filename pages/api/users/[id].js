import db from "../../../models";

export default async function handler(req, res) {
  console.log("REQ.QUERY", req.query);
  const user = await db.User.findByPk(req.query.id);
  if (!user) {
    res
      .status(404)
      .json({ error: `Cannot find user with id: ${req.query.id}` });
  } else {
    if (req.method === "GET") {
      res.status(200).json({ user: user });
    } else if (req.method === "PUT" || req.method === "PATCH") {
      const params = req.body;
      user.firstName = params.firstName;
      user.lastName = params.lastName;
      user.email = params.email;
      await user.save();
      res.status(200).json({ user: user });
    } else if (req.method === "DELETE") {
      await user.destroy();
      res.status(200).json({});
    }
  }
}
