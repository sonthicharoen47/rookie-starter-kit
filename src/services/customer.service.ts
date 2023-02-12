import services from "@configs/interceptors";
import { TFood } from "@constants/food";
import { ReponseFormat } from "@pages/api/food";

type PGetFood = {
  _id: string;
};
type PUpdateFoodStock = {
  _amount: number;
};

interface IGetFoodList extends ReponseFormat {
  data: Array<TFood>;
}

interface IGetFood extends ReponseFormat {
  data: TFood;
}

export const getAllFood = () => {
  return services
    .get<IGetFoodList>("/api/food")
    .then((response) => response.data)
    .catch((error) => error);
};

export const getFoodById = ({ _id }: PGetFood) => {
  const data = { id: _id };
  return services
    .post<IGetFood>("/api/food", { ...data })
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

// muse use .then if use new Promise function
// ex. getFoodByName({ _name: "chan-o-c"}).then(response => { ... }).catch(err => { ...})
// export const getFoodByName = ({ _name }: PGetFood) =>
//   new Promise<IRes>((resolve, reject) => {
//     const data = { name: _name };
//     services
//       .post<IRes>("/api/food", { ...data })
//       .then((response) => resolve(response.data))
//       .catch((error) => reject(error.response.data));
//   });

export const purchasedFoodById = ({
  _id,
  _amount,
}: PUpdateFoodStock & PGetFood) => {
  const data = { id: _id, amount: _amount };
  return services
    .put<IGetFood>("/api/food", { ...data })
    .then((response) => response.data)
    .catch((error) => error.response.data);
};
