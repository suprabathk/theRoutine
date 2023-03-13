/* eslint-disable jsx-a11y/anchor-is-valid */
import MeetingCard from "./MeetingCard"
import { PlusIcon } from '@heroicons/react/solid'
import { format } from "date-fns"

const MeetingList = ({ selectedDay, selectedDayMeetings }) => {
    return (
        <div className="meeting-list">
            <section className="mt-12 md:mt-0 md:pl-14">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-gray-900">
                        Schedule for{' '}
                        <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                            {format(selectedDay, 'MMM dd, yyy')}
                        </time>
                    </h2>
                    <button className="flex gap-2 items-center text-purple-600 font-semibold hover:underline underline-offset-8">
                        <PlusIcon className="w-4 h-4" />
                        New
                    </button>
                </div>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                    {selectedDayMeetings.length > 0 ? (
                        selectedDayMeetings.map((meeting) => (
                            <MeetingCard meeting={meeting} key={meeting.id} />
                        ))
                    ) : (
                        <div className="empty-list">
                            <p>No appointments for today.</p>
                            <a href="#" className="text-purple-500 hover:underline">Create new appointment</a>
                        </div>
                    )}
                </ol>
            </section>
        </div>
    );
}

export default MeetingList;