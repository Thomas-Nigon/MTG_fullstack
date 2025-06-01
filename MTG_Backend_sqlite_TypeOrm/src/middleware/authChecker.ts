import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<any> = async (
  { context },
  neededRoles
) => {
  console.log("neededRoles:", neededRoles);
  console.log("context.user.role:", context.user.role);
  return neededRoles.includes(context.user.role);
};
