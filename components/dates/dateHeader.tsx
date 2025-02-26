import { Event } from "@/types/event";


export default function DateHeader(event: Event) {
        return (
            <div key={event._id} className="text-sm text-gray-500 mb-2 mt-2">
                {event.date && new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                  {event.schedules && event.schedules.map((schedule) => {
                    return (
                        <>
                            {schedule.days.map((day) => (
                                <span key={day} className="inline-block px-2 py-1 mr-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                                    {day}
                                </span>
                            ))}
                        </>
                    )
                  })}
            </div>
    )
}