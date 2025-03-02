import { getCategory } from "@/services/api";
import { Event } from "@/types/event";
import FeaturedEvent from "@/components/events/featuredEvent";

export type paramsType = Promise<{ id: string }>;
export default async function CategoryPage({ params }: { params: paramsType }) {

    const category = await getCategory((await (params)).id);


    return  (

      <section className="max-w-7xl mx-5 my-10 px-4 ">

        <div>
            {category.map((event: Event) => (                
            
            <div key={event._id} className="my-4 border-4 border-gray-200 rounded-lg">
                <FeaturedEvent key={event._id} event={event} />
            </div>
            ))}

        </div>
      </section>


    );
}