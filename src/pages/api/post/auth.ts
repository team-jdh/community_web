import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUrl = `${process.env.API_BASE_URL}/post/token`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: req.body,
  });

  const result = await response.json();
  res.status(200).json({ token: result });
}
