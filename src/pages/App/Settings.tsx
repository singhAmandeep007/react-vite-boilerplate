import { FC, PropsWithChildren } from "react";

export type TSettingsProps = Record<string, never>;

export const Settings: FC<PropsWithChildren<TSettingsProps>> = () => {
  return <div>Settings</div>;
};
