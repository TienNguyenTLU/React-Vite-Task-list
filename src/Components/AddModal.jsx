import React, { useState } from 'react';
function AddModalComponent() {
    const [isOpen, setIsOpen] = useState(false); // State để điều khiển việc mở/đóng modal

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    // Hàm xử lý khi form được submit
    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        console.log('Form submitted!');
        // Thực hiện logic gửi dữ liệu ở đây
        handleClose(); // Đóng modal sau khi submit
    };

    return (
        <>
            <button className="btn btn-primary" onClick={handleOpen}>
                Add Task
            </button>
            <dialog open={isOpen} id="my_modal_3" className="modal modal-middle sm:modal-middle">
                <div className="modal-box w-11/12 max-w-lg"> {/* Đặt kích thước max-w và căn giữa */}
                    {/* Form để đóng modal bằng nút X */}
                    <form method="dialog" onSubmit={(e) => { e.preventDefault(); handleClose(); }}> {/* Thêm onSubmit để đảm bảo đóng */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center mb-6">Add New Task</h3> {/* Căn giữa và thêm margin-bottom */}
                    <form onSubmit={handleSubmit}>
                        <fieldset className="form-control w-full mb-4"> {/* Sử dụng form-control của DaisyUI */}
                            <label className="label">
                                <span className="label-text text-base">Task name:</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full" // input-bordered để có viền
                                placeholder="Type task name here"
                                required // Thêm required nếu cần
                            />
                        </fieldset>
                        <fieldset className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text text-base">Task description:</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24 w-full" // textarea-bordered
                                placeholder="Enter task description"
                            ></textarea>
                        </fieldset>
                        <fieldset className="form-control w-full mb-6">
                            <label className="label">
                                <span className="label-text text-base">Due date:</span>
                            </label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                required // Thêm required nếu cần
                            />
                        </fieldset>
                        <div className="flex justify-end gap-3"> 
                            <button type="button" className="btn btn-ghost" onClick={handleClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-info">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default AddModalComponent;