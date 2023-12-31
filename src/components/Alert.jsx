import PropsTypes from "prop-types";

const Alert = ({ txt, showHide, type }) => {
  if (type === "success") {
    return (
      <div
        className={`transition-all p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 ${showHide}`}
        role="alert"
      >
        <span className="font-medium">{txt?.info}</span> {txt?.msg}
      </div>
    );
  }

  return (
    <div
      className={`transition-all p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 ${showHide}`}
      role="alert"
    >
      <span className="font-medium">{txt?.info}</span> {txt.msg}
    </div>
  );
};

export default Alert;

Alert.propTypes = {
  txt: PropsTypes.object,
  showHide: PropsTypes.string,
  type: PropsTypes.string,
};
