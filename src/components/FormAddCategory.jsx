import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import Alert from "./Alert";
import Category from "../../api/category";
import Proptypes from "prop-types";
import dateformat from "dateformat";

const FormAddCategory = ({ setShowHideFormAddCategory, setCategory }) => {
  const [txtRes, setTxtRes] = useState({});
  const [showHide, setShowHide] = useState("-translate-x-[105%]");
  const [alertType, setAlertType] = useState("success");
  const [categoryName, setCategoryName] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const sendCategory = async (e) => {
    try {
      e.preventDefault();
      setDisableBtn(true);

      const res = await Category.AddCategory({
        category: categoryName,
      });

      setTxtRes({
        info: "Berhasil",
        msg: res.data.message,
      });
      setShowHide("");
      setAlertType("success");
      setTimeout(() => {
        setShowHideFormAddCategory(true);
        setCategory((prev) => [
          {
            _id: res.data.insertedID,
            category: categoryName,
            created_at: dateformat(new Date(), "yyyy-mm-dd hh-MM-ss Z"),
            info: [],
          },
          ...prev,
        ]);
      }, 1000);
    } catch (err) {
      setDisableBtn(false);
      setTxtRes({
        info: "Gagal",
        msg: err.response.data.errors.join(" "),
      });
      setShowHide("");
      setAlertType("error");
    }
  };

  const closeForm = () => {
    if (!disableBtn) {
      setShowHideFormAddCategory(true);
    }
  };

  return (
    <div className="z-20 flex justify-center items-center black-screen absolute top-0 left-0 bottom-0 right-0">
      <div className="-mt-32">
        <div className="h-20 w-96 overflow-hidden">
          <Alert txt={txtRes} showHide={showHide} type={alertType} />
        </div>
        <form
          onSubmit={sendCategory}
          className="w-[30rem] flex flex-col gap-2 bg-black p-10 border border-gray-400 rounded-md relative"
        >
          <i
            className="fa-solid fa-x absolute right-3  top-3 text-red-400 cursor-pointer"
            onClick={closeForm}
          ></i>
          <h1 className="text-xl font-bold mb-2">Tambah Kategori</h1>
          <Input
            type="text"
            label="Nama Kategori"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button type="submit" className="self-start" disabled={disableBtn}>
            Tambah
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormAddCategory;

FormAddCategory.propTypes = {
  setShowHideFormAddCategory: Proptypes.func,
  setCategory: Proptypes.func,
};
