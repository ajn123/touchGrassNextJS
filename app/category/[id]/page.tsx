import { getCategory } from "@/services/api";
import { Event } from "@/types/event";
import FeaturedEvent from "@/components/events/featuredEvent";

export type paramsType = Promise<{ id: string }>;
export default async function CategoryPage({ params }: { params: paramsType }) {
    const category = await getCategory((await (params)).id);

    return  (
        <div className="columns-3 gap-4 my-10">
            {category.map((event: Event) => (                
            <div key={event._id} className="border-2 border-gray-200 rounded-lg">
                <FeaturedEvent key={event._id} event={event} />
            </div>
            ))}
        </div>
    );
}