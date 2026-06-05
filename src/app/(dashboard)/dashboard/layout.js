import { DashboardLayoutSidebar } from "./_components/DashboardLayoutSidebar";

function RecruiterDashboarLayout({ children }) {
  return (
    <div>
      <div className="flex min-h-screen">
        <DashboardLayoutSidebar />
        <div className="flex-1 "> {children}</div>
      </div>
    </div>
  );
}

export default RecruiterDashboarLayout;
