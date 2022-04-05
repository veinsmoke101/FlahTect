import AdminDashboard from "./pages/AdminDashboard";
import { Route, Routes } from "react-router-dom"
import ClientDashboard from "./pages/ClientDashboard";
import ClientLogin from "./pages/ClientLogin";
import AdminLogin from "./pages/AdminLogin";
import ClientRegister from "./pages/ClientRegister";


function App() {
    return (
    <div className="App ">

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
