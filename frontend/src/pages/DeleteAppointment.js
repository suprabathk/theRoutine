import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react"

const DeleteAppointment = () => {
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const { appointmentID } = useParams();

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/tasks/${appointmentID}`, {
            method: "DELETE"
        }).then(() => {
            setIsPending(false)
            navigate("/");
        });
    }


    return (
        <div className="delete mx-80 my-4">
            <h2 className="text-3xl font-semibold mb-4">Are you sure you want to delete this appointment?</h2>
            <p className="text-purple-900">This action cannot be undone!</p>
            {!isPending && (
                <div className="flex gap-2">
                    <button onClick={() => { navigate("/") }} className=" hover:text-purple-800 transition-all w-full border hover:border-purple-400 bg-purple-400 hover:bg-purple-200 text-white py-3 rounded-md mt-6">Cancel</button>
                    <button onClick={handleDelete} className=" text-purple-800 transition-all w-full border border-purple-400 hover:bg-purple-400 bg-purple-200 hover:text-white py-3 rounded-md mt-6">Delete appointment</button>
                </div>
            )}
            {isPending && <button disabled className="transition-all w-full border border-purple-400 bg-purple-400 cursor-not-allowed text-white py-3 rounded-md mt-6">Deleting appointment...</button>}
        </div>
    );
}

export default DeleteAppointment;