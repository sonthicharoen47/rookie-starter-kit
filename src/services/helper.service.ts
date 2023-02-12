import services from "@configs/interceptors";

export const regenFoodStore = () => {
  return services
    .get("/api/help")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};
