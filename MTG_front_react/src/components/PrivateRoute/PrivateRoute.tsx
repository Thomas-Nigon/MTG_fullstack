import { UserContext } from "@/contexts/UserContext";
import React, { useContext } from "react";
import Redirect from "../Redirect/Redirect";
import { AccessRule, checkAccess } from "@/lib/checkAcces";

export default function PrivateRoute({
  children,
  accessRule,
}: {
  children: React.ReactNode;
  accessRule: AccessRule;
}) {
  const { user } = useContext(UserContext);

  return <div>{checkAccess(user, accessRule) ? children : <Redirect />}</div>;
}
