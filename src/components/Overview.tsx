import StatsCard from './StatsCard';
import { useEVData } from '../hooks/useEVData';

const Overview = () => {
  const { getStats, loading } = useEVData();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading EV data...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Electric Vehicle Overview</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of the Electric Vehicle population dataset
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Vehicles"
          value={stats.totalVehicles.toLocaleString()}
          icon="🚗"
          gradient
        />
        <StatsCard
          title="Battery Electric (BEV)"
          value={stats.bevCount.toLocaleString()}
          icon="🔋"
        />
        <StatsCard
          title="Plug-in Hybrid (PHEV)"
          value={stats.phevCount.toLocaleString()}
          icon="⚡"
        />
        <StatsCard
          title="Most Popular Make"
          value={stats.mostPopularMake}
          icon="🏆"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-xl card-shadow border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <p className="text-foreground">
                <span className="font-semibold">{((stats.bevCount / stats.totalVehicles) * 100).toFixed(1)}%</span> 
                {' '}are fully electric (BEV)
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
              <p className="text-foreground">
                <span className="font-semibold">{((stats.phevCount / stats.totalVehicles) * 100).toFixed(1)}%</span> 
                {' '}are plug-in hybrids (PHEV)
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-chart-3 rounded-full mr-3"></div>
              <p className="text-foreground">
                Most common model year: <span className="font-semibold">{stats.mostCommonModelYear}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl card-shadow border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">Dataset Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Records:</span>
              <span className="font-semibold text-foreground">{stats.totalVehicles.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Primary State:</span>
              <span className="font-semibold text-foreground">Washington (WA)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Source:</span>
              <span className="font-semibold text-foreground">Department of Licensing</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehicle Types:</span>
              <span className="font-semibold text-foreground">BEV & PHEV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;