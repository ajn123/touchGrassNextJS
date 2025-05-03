import { Event } from "@/types/event";


export default function DateHeader(event: Event) {
        return (
            <div key={event._id} className="text-sm text-gray-500 mb-2 mt-2">
                {event.date && new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                  <div className="flex flex-wrap">
                  {event.schedules && event.schedules.map((schedule, scheduleIndex) => {
                    return (
                        <div key={`schedule-${scheduleIndex}`}>
                        {
                            schedule.days.length == 7 && (
                                <span key="everyday" className="day-tag">
                                    Everyday
                                </span>
                            )
                        }
                            {schedule.days.length < 7 && schedule.days.map((day) => (
                                <span key={`${scheduleIndex}-${day}`} className="day-tag">
                                    {day}
                                </span>
                            ))}
                        </div>
                    )
                  })}
                  </div>
            </div>
    )
}