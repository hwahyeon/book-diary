import BookCalendar from "@/components/Calendar";
import { books } from "@/lib/books";

const CalendarPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-24">
      <h1 className="text-2xl font-bold mb-6">Book Diary</h1>
      <BookCalendar books={books} />
    </div>
  );
};

export default CalendarPage;
