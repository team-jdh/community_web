import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return handlePost(req, res);
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiUrl = `${process.env.API_BASE_URL}/post`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: req.body,
  });

  const isSuccess = response.status === 201;

  res.status(response.status).json({ isSuccess });
};
