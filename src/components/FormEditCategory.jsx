import { Input, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import Category from "../../api/category";
import Proptypes from "prop-types";

const FormEditCategory = ({
  setShowHideFormEditCategory,
  setCategory,
  showHideFormEditCategory,
}) => {
  const [txtRes, setTxtRes] = useState({});
  const [showHide, setShowHide] = useState("-translate-x-[105%]");
  const [alertType, setAlertType] = useState("success");
  const [categoryName, setCategoryName] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(
    function () {
      setCategoryName(showHideFormEditCategory.category);
    },
    [showHideFormEditCategory]
  );

  const sendCategory = async (e) => {
    try {
      e.preventDefault();
      setDisableBtn(true);

      const id = showHideFormEditCategory._id;
      const res = await Category.UpdateCategory(id, {
        category: categoryName,
      });

      setTxtRes({
        info: "Berhasil",
        msg: res.data.message,
      });
      setShowHide("");
      setAlertType("success");
      setTimeout(() => {
        setShowHideFormEditCategory(true);

        setCategory((prev) => {
          let i = 0;
          let run = true;
          while (i < prev.length && run) {
            if (prev[i]._id === id) {
              prev[i].category = categoryName;
              run = false;
            }
            i++;
          }
          return prev;
        });
      }, 1000);
    } catch (err) {
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
      setShowHideFormEditCategory({});
    }
  };

  return (
    <div className="z-20 flex justify-center items-center black-screen absolute top-0 left-0 bottom-0 right-0">
      <div className="-mt-32">
        <div className="h-20 overflow-hidden w-96">
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
          <h1 className="text-xl font-bold mb-2">Ubah Kategori</h1>
          <Input
            type="text"
            label="Nama Kategori"
            onChange={(e) => setCategoryName(e.target.value)}
            defaultValue={showHideFormEditCategory.category}
          />
          <Button type="submit" className="self-start" disabled={disableBtn}>
            Ubah
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormEditCategory;

FormEditCategory.propTypes = {
  setShowHideFormEditCategory: Proptypes.func,
  setCategory: Proptypes.func,
  showHideFormEditCategory: Proptypes.object,
};
