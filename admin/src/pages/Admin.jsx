import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ListProducts from "../components/ListProducts";
import AddProduct from "../components/AddProduct";

const Admin = () => {
	return (
        <div className="lg:flex">
            <Sidebar />
            <Routes>
                <Route path="/addproduct" element={<AddProduct />}/>
                <Route path="/listproducts"element={<ListProducts />} />
            </Routes>
        </div>
    );
};

export default Admin;
