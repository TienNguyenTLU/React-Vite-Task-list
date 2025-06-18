import { use, useState } from "react";
import AddModal from "./AddModal";
import DeleteAlert from "./DeleteAlert";
import { useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";
function Table({InputValue})
{
    const [Tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(5);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = Tasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(Tasks.length / tasksPerPage);
    function paginate(pageNumber) { setCurrentPage(pageNumber) }
    const fetchTasks = () => {
        axios.get('http://localhost:8080/tasks')
        .then(response => {
        setTasks(response.data);
        })
        .catch(error => {
        console.error('Error fetching data: ', error);
        });
    }
    useEffect(() => {
        fetchTasks();
    }, []);
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
    function filterTasks(tasks, inputValue) {
        if (!inputValue)
            return tasks;
        return tasks.filter(task =>
            task.taskName.toLowerCase().includes(inputValue.toLowerCase()) ||
            task.description.toLowerCase().includes(inputValue.toLowerCase())
        );
    }
    return (
        <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <AddModal fetchTasks ={fetchTasks} />
        </div>
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Task name</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {filterTasks(Tasks,InputValue).map((task,index) => (
                    <tr key={task.id} className="hover">
                        <th>{index + 1}</th>
                        <td>{task.taskName}</td>
                        <td>{task.description}</td>
                        <td>{task.dueDate}</td>
                        <td><span className={`badge ${setStatusColor(task.status)}`}>{task.status}</span></td>
                        <td>
                            <div className="flex gap-2">
                                <EditModal task={task} fetchTasks={fetchTasks}/>
                                <DeleteAlert taskId = {task.id} onDeleted = {fetchTasks}/>
                            </div> 
                        </td>
                    </tr>
                ))}
                </tbody>
                        <div className="flex justify-center mt-4 gap-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)} className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}>
                            {i + 1}
                        </button>
                ))}
            </div>
            </table>
        </div>
        </div>
    )
}
export default Table;