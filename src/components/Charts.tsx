import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useEVData } from '../hooks/useEVData';

const Charts = () => {
  const { getStats, getTopMakes, getYearDistribution, loading } = useEVData();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading charts...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const topMakes = getTopMakes();
  const yearData = getYearDistribution();

  const vehicleTypeData = [
    { name: 'Battery Electric (BEV)', value: stats.bevCount, color: 'hsl(var(--chart-primary))' },
    { name: 'Plug-in Hybrid (PHEV)', value: stats.phevCount, color: 'hsl(var(--chart-secondary))' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border border-border card-shadow">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-primary">
            {payload[0].name}: <span className="font-bold">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border border-border card-shadow">
          <p className="text-foreground font-medium">{payload[0].name}</p>
          <p className="text-primary">
            Count: <span className="font-bold">{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-muted-foreground text-sm">
            {((payload[0].value / stats.totalVehicles) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Data Visualizations</h2>
        <p className="text-muted-foreground">
          Interactive charts showing EV distribution patterns and trends
        </p>
      </div>

      {/* Vehicle Type Distribution */}
      <div className="bg-card p-6 rounded-xl card-shadow border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6">Vehicle Type Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vehicleTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                stroke="none"
              >
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 space-x-6">
          {vehicleTypeData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Makes */}
        <div className="bg-card p-6 rounded-xl card-shadow border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-6">Top 5 Vehicle Makes</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topMakes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="make" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Year Distribution */}
        <div className="bg-card p-6 rounded-xl card-shadow border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-6">Vehicles by Model Year</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="year" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--accent))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;