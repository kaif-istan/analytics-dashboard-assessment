interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  gradient?: boolean;
}

const StatsCard = ({ title, value, icon, gradient = false }: StatsCardProps) => {
  return (
    <div className={`p-6 rounded-xl card-shadow border border-border ${
      gradient ? 'bg-gradient-card' : 'bg-card'
    } hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;