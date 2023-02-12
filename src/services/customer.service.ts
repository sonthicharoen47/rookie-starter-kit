import services from "@configs/interceptors";
import { IGetFoodList } from "@interfaces/customer.interface";

export const getAllFood = () => {
  return services
    .get<IGetFoodList>("/api/food")
    .then((response) => response.data)
    .catch((error) => error);
};

export const getFoodById = (_id: string) => {};

export const purchasedFoodById = (_id: string, _amount: number) => {};
