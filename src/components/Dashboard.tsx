import { useState } from 'react';
import Navigation from './Navigation';
import Overview from './Overview';
import Charts from './Charts';
import DataTable from './DataTable';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'charts':
        return <Charts />;
      case 'data':
        return <DataTable />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;