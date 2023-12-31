import { Image } from "@nextui-org/react";
import Proptypes from "prop-types";
import { useState } from "react";

const CardImage = ({
  val,
  setShowConfirmInfo,
  setShowHideFormEditImage,
  setShowHideFormEditInfo,
}) => {
  const [showImageBackScreen, setShowImageBackScreen] = useState(false);

  const hover = () => {
    setShowImageBackScreen(true);
  };

  const hoverLeave = () => {
    setShowImageBackScreen(false);
  };

  return (
    <div className="border p-2 rounded-md border-gray-500 flex  gap-10">
      <div
        className="border relative"
        onMouseEnter={hover}
        onMouseLeave={hoverLeave}
      >
        <Image
          width={180}
          height={90}
          alt="NextUI hero Image with delay"
          src={val.imageUrl}
          radius="none"
          className="z-0"
        />
        {showImageBackScreen ? (
          <div className="black-screen top-0 left-0 right-0 bottom-0 absolute flex flex-col gap-10 justify-center items-center">
            <div
              className="cursor-pointer"
              onClick={() => setShowHideFormEditImage(val._id)}
            >
              Ubah gambar
              <i className="fa-solid fa-pen"></i>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setShowHideFormEditInfo(val)}
            >
              Ubah text
              <i className="fa-solid fa-pen"></i>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="p-2 w-full">
        <h1 className="font-bold">{val.title}</h1>
        <p className="text-[0.7rem] mt-2 text-gray-500">
          Disimpan : {new Date(val.created_at).getFullYear()}
        </p>
        <p className="text-[0.8rem] mt-5 text-gray-300">Deskripsi :</p>
        <p className="text-[0.7rem] mt-2">{val.description}</p>
      </div>

      <i
        className="fa-solid fa-x text-red-400 cursor-pointer"
        onClick={() => setShowConfirmInfo(val._id)}
      ></i>
    </div>
  );
};

export default CardImage;

CardImage.propTypes = {
  val: Proptypes.object,
  setShowConfirmInfo: Proptypes.func,
  setShowHideFormEditImage: Proptypes.func,
  setShowHideFormEditInfo: Proptypes.func,
};
