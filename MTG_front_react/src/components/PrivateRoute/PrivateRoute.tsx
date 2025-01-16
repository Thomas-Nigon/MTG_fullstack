import React from "react";
import Redirect from "../Redirect/Redirect";
import { AccessRule, checkAccess } from "@/services/checkAcces";
import userStore from "@/services/ZustandStores/userStore";

export default function PrivateRoute({
  children,
  accessRule,
}: {
  children: React.ReactNode;
  accessRule: AccessRule;
}) {
  const user = userStore.getState().user;

  if (!user) {
    return <Redirect />;
  }
  return <div>{checkAccess(user, accessRule) ? children : <Redirect />}</div>;
}
