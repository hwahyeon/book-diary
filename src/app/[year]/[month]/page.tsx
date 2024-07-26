interface DetailPageProps {
  params: {
    year: string;
    month: string;
  };
}

export default function DetailPage({ params }: DetailPageProps) {
  const { year, month } = params;

  return (
    <div>
      <h1>
        Details for {year} / {month}
      </h1>
      <p>
        This page is displaying details for the year {year} and month {month}.
      </p>
    </div>
  );
}
