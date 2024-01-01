import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import Alert from "../Alert";
import Proptypes from "prop-types";
import Info from "../../../api/info";

const FormAddInfo = ({ setShowHideFormAddInfo, setInfo, id }) => {
  const [txtRes, setTxtRes] = useState({});
  const [showHide, setShowHide] = useState("-translate-x-[105%]");
  const [alertType, setAlertType] = useState("success");
  const [infoName, setInfoName] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [optImage, setOptImage] = useState("1");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const sendCategory = async (e) => {
    try {
      e.preventDefault();
      setDisableBtn(true);

      const formData = new FormData();
      formData.append("title", infoName);
      formData.append("description", description);
      formData.append("image", image);

      const res = await Info.Add(id, formData);

      setTxtRes({
        info: "Berhasil",
        msg: res.data.message,
      });
      setShowHide("");
      setAlertType("success");
      setTimeout(() => {
        setShowHideFormAddInfo(false);
        setInfo((prev) => [
          ...prev,
          {
            _id: res.data.insertedID,
            title: infoName,
            description: description,
            imageUrl:
              typeof image === "object" ? URL.createObjectURL(image) : image,
            created_at: new Date(),
          },
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
      setShowHideFormAddInfo(false);
    }
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
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
          />
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
          <Textarea
            label="Deskripsi"
            className="max-w-xs"
            rows="4"
            isRequired
            onChange={(e) => setDescription(e.target.value)}
            disableAutosize
          />
          <Button type="submit" className="self-start" disabled={disableBtn}>
            Tambah
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormAddInfo;

FormAddInfo.propTypes = {
  setShowHideFormAddInfo: Proptypes.func,
  setInfo: Proptypes.func,
  id: Proptypes.string,
};
