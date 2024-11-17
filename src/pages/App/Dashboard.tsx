import { FC, PropsWithChildren } from "react";

export type TDashboardProps = Record<string, never>;

export const Dashboard: FC<PropsWithChildren<TDashboardProps>> = () => {
  return <div>Dashboard</div>;
};
