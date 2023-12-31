import { Input, Button, Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Alert from "../Alert";
import Proptypes from "prop-types";
import Info from "../../../api/info";

const FormEditInfo = ({
  setShowHideFormEditInfo,
  setInfo,
  idCategory,
  showHideFormEditInfo,
}) => {
  const [txtRes, setTxtRes] = useState({});
  const [showHide, setShowHide] = useState("-translate-x-[105%]");
  const [alertType, setAlertType] = useState("success");
  const [infoName, setInfoName] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(
    function () {
      setInfoName(showHideFormEditInfo.title);
      setDescription(showHideFormEditInfo.description);
    },
    [showHideFormEditInfo]
  );

  const sendCategory = async (e) => {
    try {
      e.preventDefault();
      setDisableBtn(true);

      const idInfo = showHideFormEditInfo._id;
      const res = await Info.UpdateNoImage(idCategory, idInfo, {
        title: infoName,
        description: description,
      });

      setTxtRes({
        info: "Berhasil",
        msg: res.data.message,
      });
      setShowHide("");
      setAlertType("success");
      setTimeout(() => {
        setShowHideFormEditInfo(false);
        setInfo((prev) => {
          let i = 0;
          let run = true;
          while (i < prev.length && run) {
            if (prev[i]._id === idInfo) {
              prev[i].title = infoName;
              prev[i].description = description;
              run = false;
            }
            i++;
          }
          return prev;
        });
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
      setShowHideFormEditInfo("");
    }
  };

  return (
    <div className="z-20 fixed flex justify-center items-center black-screen top-0 left-0 bottom-0 right-0">
      <div className="mt-2">
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
          <h1 className="text-xl font-bold mb-2">Tambah Info</h1>
          <Input
            isRequired
            type="text"
            label="Judul"
            onChange={(e) => setInfoName(e.target.value)}
            defaultValue={showHideFormEditInfo.title}
          />
          <Textarea
            label="Deskripsi"
            className="max-w-xs"
            rows="4"
            isRequired
            onChange={(e) => setDescription(e.target.value)}
            disableAutosize
            defaultValue={showHideFormEditInfo.description}
          />
          <Button type="submit" className="self-start" disabled={disableBtn}>
            Ubah
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormEditInfo;

FormEditInfo.propTypes = {
  setShowHideFormEditInfo: Proptypes.func,
  setInfo: Proptypes.func,
  idCategory: Proptypes.string,
  showHideFormEditInfo: Proptypes.string,
};
