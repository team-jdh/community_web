import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);

    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId, commentId } = req.query;
  const apiUrl = `${process.env.API_BASE_URL}/post/${postId}/comment/${commentId}?page=1&size=5`;
  const response = await fetch(apiUrl);
  const result = await response.json();

  res.status(200).json({ commentList: result });
};
