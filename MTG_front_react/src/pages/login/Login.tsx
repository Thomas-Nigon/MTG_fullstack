import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterComponent from "./Components/RegisterComponent";
import LoginComponent from "./Components/LoginComponent";

export default function Login() {
  return (
    <main className="flex flex-col items-center  mt-20 ">
      <h1 className="mb-5">WELCOME LOGIN PAGE</h1>
      <Tabs defaultValue="Register" className="w-[400px]">
        <TabsList className=" flex items-center justify-center">
          <TabsTrigger className="w-full" value="Login">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Register">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <LoginComponent />
        </TabsContent>
        <TabsContent value="Register">
          <RegisterComponent />
        </TabsContent>
      </Tabs>
    </main>
  );
}
