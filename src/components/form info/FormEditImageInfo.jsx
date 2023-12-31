import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import Alert from "../Alert";
import Proptypes from "prop-types";
import Info from "../../../api/info";

const FormEditImage = ({ setShowHideFormEditImage, setInfo, id }) => {
  const [txtRes, setTxtRes] = useState({});
  const [showHide, setShowHide] = useState("-translate-x-[105%]");
  const [alertType, setAlertType] = useState("success");
  const [disableBtn, setDisableBtn] = useState(false);
  const [optImage, setOptImage] = useState("1");
  const [image, setImage] = useState(null);

  const sendCategory = async (e) => {
    try {
      e.preventDefault();
      setDisableBtn(true);

      const formData = new FormData();
      formData.append("image", image);

      const res = await Info.Add(id, formData);

      setTxtRes({
        info: "Berhasil",
        msg: res.data.message,
      });
      setShowHide("");
      setAlertType("success");
      setTimeout(() => {
        setShowHideFormEditImage(false);
        setInfo((prev) => {
          return prev.map((v) => {
            if (v._id === id) {
              v.imageUrl =
                typeof image === "object" ? URL.createObjectURL(image) : image;
              return v;
            }
            return v;
          });
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
      setShowHideFormEditImage(false);
    }
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="z-20 flex justify-center items-center black-screen absolute top-0 left-0 bottom-0 right-0">
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
          <div className="flex flex-col justify-between gap-6">
            <Select
              className="w-52 h-10"
              label="pilih opsi tambah gambar"
              isRequired
              defaultSelectedKeys={"1"}
              onChange={(e) => setOptImage(e.target.value)}
            >
              <SelectItem key={1} value={"Url"}>
                Url
              </SelectItem>
              <SelectItem key={2} value={"File"}>
                File
              </SelectItem>
            </Select>

            {optImage == "1" ? (
              <Input
                isRequired
                type="text"
                label="Url image"
                onChange={(e) => setImage(e.target.value)}
                size="sm"
              />
            ) : (
              <Input isRequired type="file" size="sm" onChange={handleUpload} />
            )}
          </div>

          <Button type="submit" className="self-start" disabled={disableBtn}>
            Ubah gambar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormEditImage;

FormEditImage.propTypes = {
  setShowHideFormEditImage: Proptypes.func,
  setInfo: Proptypes.func,
  id: Proptypes.string,
};
