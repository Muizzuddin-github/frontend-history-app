import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import FormAddCategory from "../components/FormAddCategory";
import ConfirmAlert from "../components/ConfirmAlert";
import FormEditCategory from "../components/FormEditCategory";
import CardImage from "../components/CardImage";
import FormAddInfo from "../components/form info/FormAddInfo";
import ConfirmAlertInfo from "../components/ConfirmAlertInfo";
import FormEditImage from "../components/form info/FormEditImageInfo";
import FormEditInfo from "../components/form info/FormEditInfo";
import LoadingPage from "../components/LoadingPage";
import { useNavigate } from "react-router-dom";
import Category from "../../api/category";
import instAxios from "../../api/insAxios";
import { Helmet } from "react-helmet";
import logo from "/history.ico";

const Dashboard = () => {
  const [category, setCategory] = useState([]);
  const [showHideFormAddCategory, setShowHideFormAddCategory] = useState(true);
  const [showConfirmAlert, setShowConfirmAlert] = useState("");
  const [showHideFormEditCategory, setShowHideFormEditCategory] = useState({});
  const [categoryDeep, setCategoryDeep] = useState({});
  const [showHideOneOfTable, setShowHideOneOfTable] = useState(true);

  // state info
  const [showHideFormAddInfo, setShowHideFormAddInfo] = useState(false);
  const [info, setInfo] = useState([]);
  const [showConfirmAlertInfo, setShowConfirmAlertInfo] = useState("");
  const [showHideFormEditImage, setShowHideFormEditImage] = useState("");
  const [showHideFormEditInfo, setShowHideFormEditInfo] = useState({});

  // authentication
  const [isLogin, setIsLogin] = useState(false);
  const redirect = useNavigate();
  const [btnLoadingLogout, setBtnLoadingLogout] = useState(false);

  useEffect(
    function () {
      Category.getCategory()
        .then(({ data: { data } }) => {
          setCategory(data);
          setIsLogin(true);
        })
        .catch(() => {
          redirect("/");
        });
    },
    [redirect]
  );

  const backToCategory = () => {
    setShowHideOneOfTable(true);
    setCategory((prev) => {
      let i = 0;
      let run = true;
      while (i < category.length && run) {
        if (prev[i]._id === categoryDeep._id) {
          prev[i].info = info;
          run = false;
        }
        i++;
      }
      return prev;
    });
    setCategoryDeep({});
  };

  const logout = async () => {
    try {
      setBtnLoadingLogout(true);
      await instAxios.post("/logout");
      setBtnLoadingLogout(false);
      redirect("/");
    } catch (err) {
      console.log(err);
      setBtnLoadingLogout(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" href={logo} />
      </Helmet>
      {isLogin ? (
        <div className="flex justify-end">
          {showHideFormAddCategory ? (
            ""
          ) : (
            <FormAddCategory
              setShowHideFormAddCategory={setShowHideFormAddCategory}
              setCategory={setCategory}
            />
          )}
          {showConfirmAlert.length === 0 ? (
            ""
          ) : (
            <ConfirmAlert
              setShowConfirmAlert={setShowConfirmAlert}
              showConfirmAlert={showConfirmAlert}
              setCategory={setCategory}
            />
          )}
          {Object.keys(showHideFormEditCategory).length === 0 ? (
            ""
          ) : (
            <FormEditCategory
              setCategory={setCategory}
              showHideFormEditCategory={showHideFormEditCategory}
              setShowHideFormEditCategory={setShowHideFormEditCategory}
            />
          )}
          {showHideFormAddInfo ? (
            <FormAddInfo
              setShowHideFormAddInfo={setShowHideFormAddInfo}
              id={categoryDeep._id}
              setInfo={setInfo}
            />
          ) : (
            ""
          )}
          {showConfirmAlertInfo.length === 0 ? (
            ""
          ) : (
            <ConfirmAlertInfo
              setShowConfirmAlertInfo={setShowConfirmAlertInfo}
              showConfirmAlertInfo={showConfirmAlertInfo}
              setInfo={setInfo}
              id={categoryDeep._id}
            />
          )}
          {showHideFormEditImage.length === 0 ? (
            ""
          ) : (
            <FormEditImage
              setInfo={setInfo}
              setShowHideFormEditImage={setShowHideFormEditImage}
              idCategory={categoryDeep._id}
              showHideFormEditImage={showHideFormEditImage}
            />
          )}
          {Object.keys(showHideFormEditInfo).length === 0 ? (
            ""
          ) : (
            <FormEditInfo
              setInfo={setInfo}
              setShowHideFormEditInfo={setShowHideFormEditInfo}
              idCategory={categoryDeep._id}
              showHideFormEditInfo={showHideFormEditInfo}
            />
          )}
          <aside
            id="default-sidebar"
            className="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 fixed left-0 z-10"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">Bookmark</span>
                  </a>
                </li>
                <li>
                  {showHideOneOfTable ? (
                    <Button
                      color="primary"
                      size="md"
                      onClick={() => setShowHideFormAddCategory(false)}
                    >
                      <i className="text-xl fa-solid fa-plus"></i> Kategori
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      size="md"
                      onClick={() => setShowHideFormAddInfo(true)}
                    >
                      <i className="text-xl fa-solid fa-plus"></i> Info
                    </Button>
                  )}
                </li>
              </ul>
            </div>
          </aside>
          <div className="w-[81.2%]">
            <div className="w-full p-5 box-border">
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl">
                    Selamat datang Muiz
                    {Object.keys(categoryDeep).length
                      ? ` > ${categoryDeep.category}`
                      : ""}
                  </h1>
                  <Button
                    color="secondary"
                    size="md"
                    onClick={logout}
                    isLoading={btnLoadingLogout}
                  >
                    Logout
                  </Button>
                </div>
                <p className="mt-2 text-sm">
                  Simpan histori atau catatan penting anda
                </p>
                {showHideOneOfTable ? (
                  ""
                ) : (
                  <i
                    className="fa-solid fa-arrow-left text-2xl mt-2 cursor-pointer"
                    onClick={backToCategory}
                  ></i>
                )}
              </div>

              <div className="mt-5">
                {showHideOneOfTable ? (
                  <Table>
                    <TableHeader>
                      <TableColumn>Nama</TableColumn>
                      <TableColumn className="text-center">
                        Tanggal dibuat
                      </TableColumn>
                      <TableColumn className="text-center">
                        Modifikasi
                      </TableColumn>
                    </TableHeader>
                    <TableBody>
                      {category.map((val, i) => (
                        <TableRow key={i}>
                          <TableCell
                            className="cursor-pointer"
                            onDoubleClick={() => {
                              setCategoryDeep({
                                _id: val._id,
                                category: val.category,
                              });
                              setShowHideOneOfTable(false);
                              setInfo(val.info);
                            }}
                          >
                            <i className="mr-2 fa-regular fa-folder"></i>{" "}
                            {val.category}
                          </TableCell>
                          <TableCell className="text-center">
                            {dateFormat(
                              new Date(val.created_at).getTime(),
                              "dddd dd mmm yyyy"
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="m-auto w-44 flex justify-between">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setShowHideFormEditCategory({
                                    _id: val._id,
                                    category: val.category,
                                  })
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                color="danger"
                                onClick={() => setShowConfirmAlert(val._id)}
                              >
                                hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col item-center justify-center gap-5 w-full box-border">
                    {info
                      .slice()
                      .reverse()
                      .map((val, i) => (
                        <CardImage
                          key={i}
                          val={val}
                          setShowConfirmInfo={setShowConfirmAlertInfo}
                          setShowHideFormEditImage={setShowHideFormEditImage}
                          setShowHideFormEditInfo={setShowHideFormEditInfo}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default Dashboard;
