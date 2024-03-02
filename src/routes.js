import NotFound from "./pages/404/NotFound";
import Account from "./pages/Account/Account";
import Chats from "./pages/Chats/Chats";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import OurMenu from "./pages/OurMenu/OurMenu";
import Payments from "./pages/Payments/Payments";
import Product from "./pages/Product/Product";
import Register from "./pages/Register/Register";
import Support from "./pages/Support/Support";
import WhyFoodHut from "./pages/WhyFoodHut/WhyFoodHut";

let routes = [
  { path: "/", element: <Home /> },
  { path: "/whyfoodhut", element: <WhyFoodHut /> },
  { path: "/ourmenu", element: <OurMenu /> },
  { path: "/Login", element: <Login /> },
  { path: "/forgetpassword", element: <ForgetPass /> },
  { path: "/register", element: <Register /> },
  { path: "/product", element: <Product /> },
  {
    path: "/account",
    element: <Account />,
    children: [
      { path: "mydashboard", element: <Dashboard /> },
      { path: "payments", element: <Payments /> },
      { path: "support", element: <WhyFoodHut /> },
      { path: "chats", element: <WhyFoodHut /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];
export default routes;
