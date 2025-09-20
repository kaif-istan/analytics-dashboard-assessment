interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const sections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'charts', label: 'Charts', icon: '📈' },
    { id: 'data', label: 'Data Table', icon: '🗃️' }
  ];

  return (
    <nav className="bg-card card-shadow border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-electric bg-clip-text text-transparent">
                ⚡ EV Analytics
              </h1>
            </div>
          </div>
          <div className="flex space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground glow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;