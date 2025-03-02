import Image from "next/image";
import { getFeaturedEvents, getCategories } from '../services/api';
import FeaturedEvent from '../components/events/featuredEvent';
import RecurringEvent from '../components/events/recurringEvent';
import Link from 'next/link';
export default async function Home() {
  const events = await getFeaturedEvents();
  const categories = await getCategories();
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
        <Image
          src={"/dc-skyline.jpg"}
          alt="DC Events Hero"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Discover DC Events</h1>
          <p className="text-xl mb-8">Your guide to everything happening in the District</p>
          {/* <div className="flex gap-4 justify-center">
            <input 
              type="text"
              placeholder="Search events..."
              className="px-6 py-3 rounded-full w-96 text-black"
            />
          </div> */}
        </div>
      </section>


      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <FeaturedEvent key={event._id} event={event} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link href={`/category/${category}`} className="hover:scale-105 transition-all duration-300">
              <div key={category} className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <RecurringEvent />
    </main>
  );
}
