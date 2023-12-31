import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import Info from "../../api/info";

const ConfirmAlertInfo = ({
  setShowConfirmAlertInfo,
  showConfirmAlertInfo,
  setInfo,
  id,
}) => {
  const [disableBtn, setDisableBtn] = useState(false);

  const deleteInfo = async () => {
    try {
      setDisableBtn(true);
      const idInfo = showConfirmAlertInfo;
      await Info.del(id, idInfo);
      setInfo((prev) => {
        return prev.filter((val) => {
          return val._id != idInfo;
        });
      });
      setShowConfirmAlertInfo("");
      setDisableBtn(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed z-20 black-screen top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <div
        className="w-80 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">Hapus info</span> yakin ingin dihapus ?
        <div className="mt-5 flex gap-2">
          <Button
            color="success"
            size="sm"
            onClick={() => setShowConfirmAlertInfo("")}
            disabled={disableBtn}
          >
            Batal
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={deleteInfo}
            disabled={disableBtn}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlertInfo;

ConfirmAlertInfo.propTypes = {
  setShowConfirmAlertInfo: PropTypes.func,
  showConfirmAlertInfo: PropTypes.string,
  setInfo: PropTypes.func,
  id: PropTypes.string,
};
