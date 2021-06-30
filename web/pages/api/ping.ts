import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  res.json({
    pong: true,
  });
};

export default handler;
