import AdminDashboard from "./pages/AdminDashboard";
import ClientLogin from "./components/Authentification/ClientLogin"
import AdminLogin from "./components/Authentification/AdminLogin";
import ClientRegister from "./components/Authentification/ClientRegister";
import Nav from "./Layouts/Nav";
import { Route, Routes } from "react-router-dom";
import ClientDashboard from "./components/Dashboard/Client/ClientDashboard";


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
                return <Route key={route} path={route} element={<ClientLogin/>}/>
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
