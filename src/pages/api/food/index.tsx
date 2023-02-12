import path from "path";
import { promises as fs } from "fs";
import { TFood } from "@constants/food";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ReponseFormat,
  ResponseFoodJSON,
} from "@interfaces/customer.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReponseFormat & { data: Array<TFood> | TFood | null }>
) {
  const jsonDirectory = path.join(process.cwd(), "src/json");
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + "/food.json", "utf8");
  //Return the content of the data file in json format
  const fileResponse: ResponseFoodJSON = JSON.parse(fileContents);
  const { id, amount } = req.body;
  const method = req.method;
  switch (method) {
    case "GET":
      res.status(200).json({
        status: true,
        data: fileResponse.food,
        message: "get all food data successful!",
      });
      break;
    case "POST":
      const _filter = fileResponse.food.find((f) => f.id === id);
      if (!_filter) {
        return res.status(400).send({
          status: false,
          data: null,
          message: `this id not found`,
        });
      } else {
        return res.status(200).json({
          status: true,
          data: _filter,
          message: "get food data successful!",
        });
      }
    case "PUT":
      const _find = fileResponse.food.find((f) => f.id === id);
      if (!_find) {
        return res.status(400).send({
          status: false,
          data: null,
          message: `not found ${req.body.name} in food data`,
        });
      } else {
        let _status: number = 400;
        let _message: string = "";
        if (amount <= 0) {
          _status = 400;
          _message = "amount must be posity number and more than 0";
        } else if (amount <= _find.stock) {
          _status = 200;
          _message = `updated stock of ${_find.name} successful!`;
          _find["stock"] = _find.stock - amount;
          fs.writeFile("src/json/food.json", JSON.stringify(fileResponse));
        } else if (amount > _find.stock) {
          _status = 400;
          _message = `insufficient inventory`;
        }
        return res.status(_status).json({
          status: _status === 200 ? true : false,
          data: _status === 200 ? _find : null,
          message: _message,
        });
      }
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
