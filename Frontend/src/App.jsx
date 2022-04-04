import AdminDashboard from "./pages/AdminDashboard";
import ClientLoginForm from "./components/Authentification/ClientLoginForm"
import AdminLoginForm from "./components/Authentification/AdminLoginForm";
import ClientRegisterForm from "./components/Authentification/ClientRegisterForm";
import Nav from "./Layouts/Nav";
import { Route, Routes } from "react-router-dom";
import RDVForm from "./components/Dashboard/Client/RDVForm";
import ClientDashboard from "./pages/ClientDashboard";
import ClientLogin from "./pages/ClientLogin";
import AuthLayout from "./Layouts/AuthLayout";
import AdminLogin from "./pages/AdminLogin";
import ClientRegister from "./pages/ClientRegister";


function App() {
    const routes = ["home","login", "client", "admin", "register"]
    return (
    <div className="App ">


        {/*<div>*/}
        {/*    {routes.map((route, index) => {*/}
        {/*        return <Link to={`${!index?"/":route}`} key={route}>{route}</Link>*/}
        {/*    })}*/}
        {/*</div>*/}

        <Routes >
            {["/", "login"].map(route => {
                return <Route key={route} path={route} element={<ClientLogin />}/>
            })}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/register" element={<ClientRegister />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
        </Routes>
    </div>
  )
}

export default App
