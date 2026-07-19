function SummaryCard({ title, count }) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <h1>{count}</h1>
    </div>
  );
}

export default SummaryCard;
