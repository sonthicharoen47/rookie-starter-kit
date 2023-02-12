import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { Food } from "@constants/food";

type THelper = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<THelper>
) {
  const method = req.method;
  if (method === "GET") {
    fs.writeFile("src/json/food.json", JSON.stringify({ food: Food }));
    res.status(200).json({ message: "regenerate food data success!" });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
