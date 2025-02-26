import { getRecurringEvents } from "@/services/api";
import FeaturedEvent from "@/components/events/featuredEvent";

export default async function RecurringEvent() {

    const recurringEvents = await getRecurringEvents();

    return (
        <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-black">Recurring Events</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recurringEvents.map((event) => (
                <FeaturedEvent key={event._id} event={event} />
            ))}
            </div>
        </div>
        </section>
    );
}