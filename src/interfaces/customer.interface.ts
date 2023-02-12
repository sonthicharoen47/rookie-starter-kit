import { TFood } from "@constants/food";

export type ReponseFormat = {
  status: boolean;
  message: string;
};

export type ResponseFoodJSON = {
  food: Array<TFood>;
};

export interface IGetFoodList extends ReponseFormat {
  data: Array<TFood>;
}
