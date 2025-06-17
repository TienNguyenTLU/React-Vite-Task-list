// ✅ SuccessAlert.js
function SuccessAlert({ message }) {
  if (!message) return null;

  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
}
export default SuccessAlert;
