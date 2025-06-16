import React, { useState } from 'react';

function AddModalComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        taskName: '',
        taskDescription: '',
        dueDate: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!' + JSON.stringify(formData, null, 2));
        handleClose();
    };
    return (
        <>
            <button className="btn btn-primary" onClick={handleOpen}>
                Add Task
            </button>
            <dialog open={isOpen} id="my_modal_3" className="modal modal-middle sm:modal-middle">
                <div className="modal-box w-11/12 max-w-lg">
                    <form method="dialog" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center mb-6">Add New Task</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text text-base">Task name:</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Type task name here"
                                required
                            />
                        </fieldset>
                        <fieldset className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text text-base">Task description:</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24 w-full"
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
                                required
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