import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts/Theme-proviter";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <UserProvider>
          <div className="app">
            <Navbar />
            <Outlet />
          </div>
        </UserProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
