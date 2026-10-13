function DashboardPanel({ title, children }) {
  return (
    <div className="flex min-[1040px]:min-h-0 flex-col">
      <h3 className="shrink-0">{title}</h3>
      <div className="min-[1040px]:min-h-0 min-[1040px]:flex-1 overflow-y-auto rounded-[10px] bg-white p-[25px]">
        {children}
      </div>
    </div>
  );
}

export default DashboardPanel;
