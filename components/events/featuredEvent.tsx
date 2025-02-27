import { Event } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import DateHeader from "@/components/dates/dateHeader";
export default function FeaturedEvent({ event }: { event: Event }) {
    return (
        <Link href={`/event/${event._id}`}>
        <div key={event._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              
              <div className="relative h-48">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                  <DateHeader {...event} />

 
                  
                <h3 className="text-xl font-semibold mb-2 text-black">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.venue}</p>
                { event.cost && event.cost.type !== "free" ? (
                    <p className="text-sm text-gray-500 mb-2">
                     ${event.cost.amount}
                   </p>
                  ) : (
                    <p className="text-sm text-black mb-2">
                      Free
                  </p>
                  )
                }
              </div>
            </div>
        </Link>
    );
}