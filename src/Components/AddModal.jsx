import React, { useState } from 'react';
import SuccessAlert from './SuccessAlert';
const API_URL = 'http://localhost:8080/tasks'; // Địa chỉ API của bạn
function AddModalComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        taskName: '',
        taskDescription: '',
        dueDate: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Something went wrong');
            console.log('Task created:', data);
            setSuccessMessage('Task added successfully!');
            setTimeout(() => {
            setSuccessMessage('');
            }, 3000);
            handleClose();
            return <SuccessAlert message="Task added successfully!" />;
        } catch (err) {
            console.error('Submit error:', err);
            setError(err.message);
        }
    };
    return (
        <>
            <button className="btn btn-primary" onClick={handleOpen}>
                Add Task
            </button>
            <SuccessAlert message={successMessage} />
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
                                name="taskName"
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Type task name here"
                                required
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text text-base">Task description:</span>
                            </label>
                            <textarea
                                name="description"
                                required
                                className="textarea textarea-bordered h-24 w-full"
                                placeholder="Enter task description"
                                onChange={handleChange}
                            ></textarea>
                        </fieldset>
                        <fieldset className="form-control w-full mb-6">
                            <label className="label">
                                <span className="label-text text-base">Due date:</span>
                            </label>
                            <input
                                name="dueDate"
                                type="date"
                                className="input input-bordered w-full"
                                required
                                onChange={handleChange}
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