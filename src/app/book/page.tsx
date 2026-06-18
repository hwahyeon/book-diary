import BookCalendar from "@/components/Calendar";
import { books } from "@/lib/books";
import { siteConfig } from "@/config/content";

const CalendarPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-24">
      <h1 className="text-2xl font-bold mb-6">{siteConfig.calendarTitle}</h1>
      <BookCalendar books={books} />
    </div>
  );
};

export default CalendarPage;
