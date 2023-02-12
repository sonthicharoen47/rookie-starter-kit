import services from "@configs/interceptors";
import { THelper } from "@interfaces/help.interface";

export const regenFoodStore = () => {
  return services
    .get<THelper>("/api/help")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};
