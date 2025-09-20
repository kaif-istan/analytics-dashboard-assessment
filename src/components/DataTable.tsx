import { useState, useMemo } from 'react';
import { useEVData } from '../hooks/useEVData';
import { EVData } from '../types/ev-data';

const DataTable = () => {
  const { data, loading } = useEVData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [yearFilter, setYearFilter] = useState('');
  const itemsPerPage = 20;

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.County.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = yearFilter === '' || item['Model Year'].toString() === yearFilter;
      
      return matchesSearch && matchesYear;
    });
  }, [data, searchTerm, yearFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const uniqueYears = useMemo(() => {
    const years = [...new Set(data.map(item => item['Model Year']))].sort((a, b) => b - a);
    return years.filter(year => year > 2000);
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading data table...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Electric Vehicle Data</h2>
        <p className="text-muted-foreground">
          Browse and search through the complete EV dataset
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-xl border border-border space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <input
              type="text"
              placeholder="Search by make, model, city, or county..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-80 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <select
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              <option value="">All Years</option>
              {uniqueYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {filteredData.length.toLocaleString()} of {data.length.toLocaleString()} vehicles
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">Make</th>
                <th className="text-left p-4 font-semibold text-foreground">Model</th>
                <th className="text-left p-4 font-semibold text-foreground">Year</th>
                <th className="text-left p-4 font-semibold text-foreground">Type</th>
                <th className="text-left p-4 font-semibold text-foreground">City</th>
                <th className="text-left p-4 font-semibold text-foreground">County</th>
                <th className="text-left p-4 font-semibold text-foreground">Range</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">{item.Make}</td>
                  <td className="p-4 text-foreground">{item.Model}</td>
                  <td className="p-4 text-foreground">{item['Model Year']}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-accent/20 text-accent'
                    }`}>
                      {item['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)' ? 'BEV' : 'PHEV'}
                    </span>
                  </td>
                  <td className="p-4 text-foreground">{item.City}</td>
                  <td className="p-4 text-foreground">{item.County}</td>
                  <td className="p-4 text-foreground">
                    {item['Electric Range'] > 0 ? `${item['Electric Range']} mi` : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;