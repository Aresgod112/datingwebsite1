import { Outlet } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin - Heartlink" },
    { name: "description", content: "Heartlink admin panel" },
  ];
};

export default function Admin() {
  return <Outlet />;
}
