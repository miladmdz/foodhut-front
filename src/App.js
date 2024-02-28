import "./App.css";
import { NavLink, useRoutes } from "react-router-dom";
import Header from "./components/Header/Header";
import routes from "./routes";
import { FaChevronUp } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BsChatSquare } from "react-icons/bs";

import restaurantCotext from "./context/contextData";
import { useEffect, useState } from "react";

function App() {
  let router = useRoutes(routes);

  const [isShowMenu, setIsShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenu, setIsMenu] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [flage1, setFlag1] = useState(false);
  const [flage2, setFlag2] = useState(false);
  const [users, setUsers] = useState([]);
  const [userAcc, setUserAcc] = useState({});

  useEffect(() => {
    let theme = localStorage.getItem("theme");

    if (theme === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
    setUserAcc(JSON.parse(localStorage.getItem("userAccount")));
  }, []);

  useEffect(() => {
    if (userAcc) {
      if (userAcc.email === "admin@gmail.com" && userAcc.password === "admin") {
        setIsLogin(true);
        setIsAdmin(true);
      } else {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  }, [userAcc]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <restaurantCotext.Provider
      value={{
        isShowMenu,
        setIsShowMenu,
        darkMode,
        setDarkMode,
        isMenu,
        setIsMenu,
        isLogin,
        setIsLogin,
        users,
        setUsers,
        userAcc,
        setUserAcc,
        modalLogin,
        setModalLogin,
        modalRegister,
        setModalRegister,
        modalLogout,
        setModalLogout,
        flage1,
        setFlag1,
        flage2,
        setFlag2,
        isAdmin,
        setIsAdmin,
      }}
    >
      <div className="relative dark:bg-black headerbgc z-0">
        <Header />
        {router}
        {/* effect bgc for menu mobile */}
        <div
          className={
            isShowMenu
              ? "absolute top-0 w-full h-full bg-black/20 dark:bg-black/60 z-[999999] transition-all"
              : "hidden absolute top-0 w-full h-full bg-black/20 z-[9999] transition-all"
          }
        ></div>
        {/* login modal */}
        <div
          className={modalLogin ? "absolute w-[100px] h-[60px] fade" : "hidden"}
        >
          <div className="fixed flex items-center justify-center top-[700px] right-10 w-[250px] xs:w-[300px] h-[60px] bg-blue-600 z-[9999999] rounded-3xl">
            <p className="text-xl font-semibold text-white dark:text-black">
              Login successful !
            </p>
          </div>
        </div>
        {/* register modal */}
        <div
          className={
            modalRegister ? "absolute w-[100px] h-[60px] fade" : "hidden"
          }
        >
          <div className="fixed flex items-center justify-center top-[700px] right-10 w-[250px] xs:w-[300px] h-[60px] bg-blue-600 z-[9999999] rounded-3xl">
            <p className="text-xl font-semibold text-white dark:text-black">
              Register successful !
            </p>
          </div>
        </div>
        {/* logout modal */}
        <div
          className={
            modalLogout ? "absolute w-[100px] h-[60px] fade" : "hidden"
          }
        >
          <div className="fixed flex items-center justify-center top-[700px] right-10 w-[250px] xs:w-[300px] h-[60px] bg-red-700 z-[9999999] rounded-3xl">
            <p className="text-xl font-semibold text-white dark:text-black">
              Log Out !
            </p>
          </div>
        </div>
        {/* delete modal in payment */}
        <div
          className={
            flage1 && flage2 ? "absolute w-[100px] h-[60px] fade" : "hidden"
          }
        >
          <div className="fixed flex items-center justify-center top-[700px] right-10 w-[250px] xs:w-[300px] h-[60px] bg-red-700 z-[9999999] rounded-3xl">
            <p className="text-xl font-semibold text-white dark:text-black">
              Item Deleted !
            </p>
          </div>
        </div>
        {/* scroll up btn */}
        <div className="hidden md:block absolute ">
          <div
            onClick={scrollHandler}
            className="fixed flex items-center justify-center top-[720px] right-20 w-12 h-12 rounded-full bg-primryOrang hover:dark:bg-primryOrang/40 hover:bg-primryOrang/80 cursor-pointer child:hover:text-black child:dark:hover:text-white transition-all"
          >
            <FaChevronUp className="text-white dark:text-black" />
          </div>
        </div>
        {/* support btn */}
        {isLogin ? (
          <>
            {isAdmin ? (
              <div className="hidden md:block absolute ">
                <NavLink
                  to={"/account/chats"}
                  className="fixed flex items-center justify-center top-[720px] left-20 w-12 h-12 rounded-full bg-primryOrang hover:dark:bg-primryOrang/40 hover:bg-primryOrang/80 cursor-pointer child:hover:text-black child:dark:hover:text-white transition-all"
                >
                  <BsChatSquare  className="text-2xl text-white dark:text-black" />
                </NavLink>
              </div>
            ) : (
              <div className="hidden md:block absolute ">
                <NavLink
                  to={"/account/support"}
                  className="fixed flex items-center justify-center top-[720px] left-20 w-12 h-12 rounded-full bg-primryOrang hover:dark:bg-primryOrang/40 hover:bg-primryOrang/80 cursor-pointer child:hover:text-black child:dark:hover:text-white transition-all"
                >
                  <MdOutlineSupportAgent className="text-2xl text-white dark:text-black" />
                </NavLink>
              </div>
            )}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </restaurantCotext.Provider>
  );
}

export default App;
