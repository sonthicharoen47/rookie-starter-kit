import React, { memo, useMemo, useState } from "react";

const Timer = () => {
  const [someValue, setSomeValue] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const now = Date();

  const memoDate = useMemo(() => {
    return Date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [someValue]);

  return (
    <div className="flex flex-col w-fit p-6 bg-slate-600 rounded-xl items-start justify-center">
      <div className="bg-red-500">Not UseMemo {now}</div>
      <div className="bg-green-500">UseMemo {memoDate}</div>
      <div className="flex w-full justify-center gap-6">
        <button
          className="bg-yellow-500"
          onClick={() => setCount((prev: number) => prev + 1)}
        >
          count + 1
        </button>
        <button
          className="bg-blue-500"
          onClick={() => setSomeValue((prev: boolean) => !prev)}
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export default memo(Timer);
