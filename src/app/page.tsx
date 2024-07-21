
import BookCalendar from '../components/Calendar';

const books = [
  { title: 'Book 1', date: '2024-07-01', cover: '/book1-cover.jpg' },
  { title: 'Book 2', date: '2024-07-10', cover: '/book2-cover.jpg' }
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">My Reading Calendar</h1>
      <BookCalendar books={books} />
    </div>
  );
};

export default HomePage;