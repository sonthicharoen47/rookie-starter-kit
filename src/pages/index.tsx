import {
  getAllFood,
  getFoodById,
  purchasedFoodById,
} from "@services/customer.service";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { TFood } from "@constants/food";
import { regenFoodStore } from "@services/helper.service";

const Timer = dynamic(() => import("@components/atoms/Timer"), {
  ssr: false,
});

export default function Home() {
  const [data, setData] = useState<Array<TFood>>([]);

  const fetchAllFood = async () => {
    const result = await getAllFood();
    setData(result.data);
  };

  const fetchFoodByName = async () => {
    const result = await getFoodById({ _id: "000001" });
    setData([result.data]);
  };

  const updateStock = async () => {
    const result = await purchasedFoodById({ _id: "000001", _amount: 2 });
    console.log(result);
  };

  const [name, setName] = useState<string>("");
  const [todo, setTodo] = useState<Array<{ id: string; value: string }>>([]);

  const onAddTodo = () => {
    setName("");
    setTodo([...todo, { id: uuidv4(), value: name }]);
  };

  const onRemoveTodoById = (_id: string) => {
    let dummy = todo.filter((f) => f.id !== _id);
    setTodo(dummy);
  };

  const onRegenData = async () => {
    const result = await regenFoodStore();
    console.log(result);
  };

  return (
    <div className="w-[640px] flex items-center flex-col bg-gray-400 rounded-2xl p-6 gap-2">
      {/* <Timer /> */}

      <button onClick={fetchAllFood}>GET ALL</button>
      <button onClick={fetchFoodByName}>GET By Name</button>
      <button onClick={updateStock}>Hello</button>
      <button onClick={onRegenData}>Regen</button>
      {/* <div className="flex flex-col">
        <div className="bg-blue-500 text-black p-2 w-fit">
          <label>Name</label>
          <input
            className="mx-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={onAddTodo}>Add</button>
        </div>
        <div className="w-full">
          <h2 className="bg-red-500 ">Todo List</h2>
          <div className="bg-green-500">
            {todo.map((t, index) => (
              <div
                key={index}
                className="flex justify-between border-b-2 border-slate-900"
              >
                <span>{t.value}</span>
                <button onClick={() => onRemoveTodoById(t.id)}>remove</button>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {data && data.length > 0 ? (
        <div>
          <div className="w-full grid grid-cols-2 border-b-2 border-slate-900">
            <div className="flex w-full justify-center bg-purple-500">
              Food Name
            </div>
            <div className="flex w-full justify-center bg-red-500">Stock</div>
          </div>
          {data.map((d) => (
            <div key={uuidv4()} className="w-full grid grid-cols-2">
              <div className="flex w-full justify-center bg-purple-500">
                {d.name}
              </div>
              <div className="flex w-full justify-center bg-red-500">
                {d.stock}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
