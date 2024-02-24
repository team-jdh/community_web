import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "DELETE":
      return handleDelete(req, res);
    case "PUT":
      return handlePut(req, res);
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;
  const authHeader = req.headers.authorization;
  const apiUrl = `${process.env.API_BASE_URL}/post/${postId}`;

  const response = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader && { Authorization: authHeader }),
    },
  });

  const isSuccess = response.status === 204;
  res.status(200).json({ isSuccess: isSuccess });
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;
  const authHeader = req.headers.authorization;
  const apiUrl = `${process.env.API_BASE_URL}/post/${postId}`;

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader && { Authorization: authHeader }),
    },
    body: req.body,
  });

  const result = await response.json();
  res.status(response.status).json({ post: result });
};
