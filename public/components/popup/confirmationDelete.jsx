export default function ConfirmDelete(props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[50]" onClick={props.onCancel}></div>
      <div className="bg-white p-8 rounded-lg w-96 z-[51] slide-in-blurred-top">
        <h2 className="font-semibold mb-4 text-sm">
          Are you sure you want to delete this?
        </h2>

        <div className="flex justify-end gap-[4px] text-xs">
          <button
            className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 focus:outline-none"
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
            onClick={props.onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
