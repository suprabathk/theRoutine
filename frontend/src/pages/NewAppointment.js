import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewAppointment = () => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const { selectedDay } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const startDTime = selectedDay + "T" + startTime + ":00.000Z"
        const endDTime = selectedDay + "T" + endTime + ":00.000Z"
        const appointment = { title, startTime: startDTime, endTime: endDTime, userID: 1 };
        setIsPending(true);
        fetch("http://localhost:8080/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment)
        }).then(() => {
            setIsPending(false);
            navigate("/");
        })
    }

    return (
        <div className="create mx-80 my-4">
            <h2 className="text-3xl font-semibold mb-4">Create new appointment for {selectedDay}</h2>
            <form className="flex flex-col my-8" onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input value={title} onChange={(e) => { setTitle(e.target.value) }} required type="text" id="title" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                <label htmlFor="startTime">Author: </label>
                <input value={startTime} onChange={(e) => { setStartTime(e.target.value) }} required type="time" id="startTime" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                <label htmlFor="endTime">Blog: </label>
                <input value={endTime} onChange={(e) => { setEndTime(e.target.value) }} required type="time" id="endTime" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                {!isPending && <button className=" text-purple-800 transition-all w-full border border-purple-400 hover:bg-purple-400 hover:text-white py-3 rounded-md mt-6">Add appointment</button>}
                {isPending && <button disabled className="transition-all w-full border border-purple-400 bg-purple-400 cursor-not-allowed text-white py-3 rounded-md mt-6">Adding appointment...</button>}
            </form>
        </div>
    );
}

export default NewAppointment;