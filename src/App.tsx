import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./page/user/Layout";
import { SnackbarProvider } from "notistack";
// import Copyright from "./components/Copyright";
import ActivationKey from "./page/admin/ActivationKey/ActivationKey";
import UserUpdate from "./page/admin/ActivationKey/UserUpdate";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/admin/activation-key" element={<ActivationKey />} />
            <Route path="/admin/user-update" element={<UserUpdate />} />
          </Route>
        </Routes>
        {/* <Copyright /> */}
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
