import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
