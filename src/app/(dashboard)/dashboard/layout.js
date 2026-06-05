import { DashboardLayoutSidebar } from "./_components/DashboardLayoutSidebar";

function RecruiterDashboarLayout({ children }) {
  return (
    <div>
      <div className="flex min-h-screen">
        <DashboardLayoutSidebar />
        {children}
      </div>
    </div>
  );
}

export default RecruiterDashboarLayout;
