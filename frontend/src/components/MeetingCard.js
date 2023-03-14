/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    format,
    parseISO
} from 'date-fns'
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline"
import { useNavigate, Link } from "react-router-dom";


const MeetingCard = ({ meeting }) => {
    const navigate = useNavigate();
    const handleDelete = () => {
        fetch(`http://localhost:8080/api/tasks/${meeting.id}`, {
            method: "DELETE"
        }).then(() => {
            navigate("/");
        });
    }

    let startDateTime = parseISO(meeting.startTime)
    let endDateTime = parseISO(meeting.endTime)

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-purple-100 justify-between">
            <div className="flex items-center space-x-4 group">
                <img
                    src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    alt=""
                    className="flex-none w-10 h-10 rounded-full"
                />
                <div className="flex-auto">
                    <p className="text-gray-900 font-semibold">{meeting.title}</p>
                    <p className="mt-0.5">
                        <time dateTime={meeting.startTime}>
                            {format(startDateTime, 'h:mm a')}
                        </time>
                        {' '}-{' '}
                        <time dateTime={meeting.endTime}>
                            {format(endDateTime, 'h:mm a')}
                        </time>
                    </p>
                </div>
            </div>
            <div className="controls md:hidden group-hover:block">
                <Link to={`/edit/${meeting.id}`} className='flex items-center gap-2 hover:text-purple-900 transition-all cursor-pointer'><PencilAltIcon className=' w-4 h-4' />Edit</Link>
                <span onClick={() => { handleDelete(meeting.id) }} className='flex items-center gap-2 hover:text-purple-900 transition-all cursor-pointer'><TrashIcon className=' w-4 h-4' />Delete</span>
            </div>
        </li>
    )
}

export default MeetingCard