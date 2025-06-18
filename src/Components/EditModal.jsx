import React, { useState, useEffect } from 'react';
import SuccessAlert from './SuccessAlert';
import status from 'daisyui/components/status';

function EditModal({ task, fetchTasks }) {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [formData, setFormData] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        status: 'Pending'
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const API_URL = `http://localhost:8080/tasks/${task.id}`;
    useEffect(() => {
        if (task) {
            setFormData({
                taskName: task.taskName || '',
                description: task.description || '',
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
                status: 'Pending'
            });
        }
    }, [task, isOpenEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseEdit = () => setIsOpenEdit(false);
    const handleOpenEdit = () => setIsOpenEdit(true);

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Something went wrong');
            setSuccessMessage('Task edited successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
            fetchTasks();
            handleCloseEdit();
        } catch (err) {
            console.error('Submit error:', err);
            setError(err.message);
        }
    };

    return (
        <>
            <button onClick={handleOpenEdit} className="btn btn-warning">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="size-5">
                    <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                </svg>
            </button>

            {successMessage && <SuccessAlert message={successMessage} />}

            <dialog open={isOpenEdit} className="modal modal-middle sm:modal-middle">
                <div className="modal-box w-11/12 max-w-lg">
                    <button onClick={handleCloseEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg text-center mb-6">Edit task</h3>
                    <form onSubmit={handleSubmitEdit}>
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
                                value={formData.taskName}
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
                                value={formData.description}
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
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <div className="flex justify-end gap-3">
                            <button type="button" className="btn btn-ghost" onClick={handleCloseEdit}>
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

export default EditModal;
