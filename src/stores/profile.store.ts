import { IProfile } from "@interfaces/profile.interface";
import configZustandDevTools from "@utils/zustandDevtools";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUseProfileStore {
  profile: IProfile | undefined;
  onSetProfileData: (_profile: IProfile) => void;
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
