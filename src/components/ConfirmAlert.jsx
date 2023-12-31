import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import Category from "../../api/category";
import { useState } from "react";

const ConfirmAlert = ({
  setShowConfirmAlert,
  showConfirmAlert,
  setCategory,
}) => {
  const [disableBtn, setDisableBtn] = useState(false);

  const deleteCategory = async () => {
    try {
      setDisableBtn(true);
      const id = showConfirmAlert;
      await Category.DeleteCategory(id);
      setCategory((prev) => {
        return prev.filter((val) => {
          return val._id != id;
        });
      });
      setShowConfirmAlert("");
      setDisableBtn(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="z-20 black-screen top-0 left-0 bottom-0 right-0 absolute flex justify-center items-center">
      <div
        className="w-80 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">Hapus kategori</span> yakin ingin dihapus
        ?
        <div className="mt-5 flex gap-2">
          <Button
            color="success"
            size="sm"
            onClick={() => setShowConfirmAlert("")}
            disabled={disableBtn}
          >
            Batal
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={deleteCategory}
            disabled={disableBtn}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;

ConfirmAlert.propTypes = {
  setShowConfirmAlert: PropTypes.func,
  showConfirmAlert: PropTypes.string,
  setCategory: PropTypes.func,
};
