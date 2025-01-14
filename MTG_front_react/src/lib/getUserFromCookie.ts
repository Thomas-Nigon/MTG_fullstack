export function getUserFromCookie(): void /* Promise<UserContext | null> */ {
  /*  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const loggedUser: UserContext = {
      id: payload.userId as string,
      name: payload.userName as string,
      email: payload.email as string,
      role: payload.role as string,
      isLogged: true,
    };

    return loggedUser;
  } catch (error) {
    console.error("JWT verification failed", error);
    return null;
  } */
}
