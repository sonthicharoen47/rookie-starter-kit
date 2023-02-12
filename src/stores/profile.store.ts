import configZustandDevTools from "@utils/zustandDevtools";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TEmployee = {
  id: string;
  name: string;
  salary: number;
  gender: "male" | "female";
  nationality: string;
};

interface IUseProfileStore {
  profile: TEmployee | undefined;
  onSetProfileData: (_profile: TEmployee) => void;
  onReset: () => void;
}

const useProfieStore = create<IUseProfileStore>()(
  devtools(
    persist(
      (set, get) => ({
        profile: undefined,
        onSetProfileData: (_profile) => {
          let dummyProfile = get().profile;
          dummyProfile = { ..._profile };
          set(
            () => ({ profile: dummyProfile }),
            false,
            "ProfileStore/onSetProfileData"
          );
        },
        onReset: () => {
          set(
            (prev) => ({ ...prev, profile: undefined }),
            false,
            "ProfileStore/onReset"
          );
        },
      }),
      configZustandDevTools("Profile-Store")
    )
  )
);

export default useProfieStore;
