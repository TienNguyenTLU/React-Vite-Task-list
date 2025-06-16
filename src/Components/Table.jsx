import { useState } from "react";
import AddModal from "./AddModal";
import DeleteAlert from "./DeleteAlert";
function Table()
{
    const [Tasks, setTasks] = useState([
        { id: 1, name: "Task 1", desc:"Perform Task 1" , status: "In Progress" , date: "2025-06-06"},
        { id: 2, name: "Task 2", desc:"Perform Task 2" , status: "Completed" , date: "2025-06-07"},
        { id: 3, name: "Task 3", desc:"Perform Task 3" , status: "Pending" , date: "2025-06-08"},
    ]);
    function setStatusColor(status)
    {
        switch (status) {
            case "In Progress":
                return " text-blue-500";
            case "Completed":
                return "text-green-500";
            case "Pending":
                return "text-gray-500";
            default:
                return "text-white";
        }
    }
    return (
        <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Tasks</h1>
        </div>
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Task name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {Tasks.map((task,index) => (
                    <tr key={task.id} className="hover">
                        <th>{index + 1}</th>
                        <td>{task.name}</td>
                        <td>{task.desc}</td>
                        <td>
                            <span className={`badge ${setStatusColor(task.status)}`}>
                                {task.status}
                            </span>
                        </td>
                        <td>
                            <div className="flex gap-2">
                                <button className="btn btn-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                                </svg>
                            </button>
                                <DeleteAlert />
                            </div> 
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}
export default Table;