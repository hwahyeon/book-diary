import BookCalendar from '../components/BookCalendar';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">My Reading Calendar</h1>
      <BookCalendar />
    </div>
  );
};

export default HomePage;