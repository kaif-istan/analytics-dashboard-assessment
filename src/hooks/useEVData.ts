import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { EVData, EVStats, MakeData, YearData } from '../types/ev-data';

export const useEVData = () => {
  const [data, setData] = useState<EVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/Electric_Vehicle_Population_Data.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transform: (value, field) => {
            // Convert numeric fields
            if (field === 'Model Year' || field === 'Electric Range' || field === 'Base MSRP') {
              const num = parseInt(value);
              return isNaN(num) ? 0 : num;
            }
            return value;
          },
          complete: (results) => {
            setData(results.data as EVData[]);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStats = (): EVStats => {
    if (data.length === 0) {
      return {
        totalVehicles: 0,
        bevCount: 0,
        phevCount: 0,
        mostPopularMake: '',
        mostCommonModelYear: 0
      };
    }

    const bevCount = data.filter(d => d['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)').length;
    const phevCount = data.filter(d => d['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)').length;

    // Most popular make
    const makeCounts: Record<string, number> = {};
    data.forEach(d => {
      if (d.Make) {
        makeCounts[d.Make] = (makeCounts[d.Make] || 0) + 1;
      }
    });
    const mostPopularMake = Object.entries(makeCounts).reduce((a, b) => 
      a[1] > b[1] ? a : b, ['', 0])[0];

    // Most common model year
    const yearCounts: Record<number, number> = {};
    data.forEach(d => {
      if (d['Model Year']) {
        yearCounts[d['Model Year']] = (yearCounts[d['Model Year']] || 0) + 1;
      }
    });
    const mostCommonModelYear = parseInt(Object.entries(yearCounts).reduce((a, b) => 
      a[1] > b[1] ? a : b, ['0', 0])[0]);

    return {
      totalVehicles: data.length,
      bevCount,
      phevCount,
      mostPopularMake,
      mostCommonModelYear
    };
  };

  const getTopMakes = (limit: number = 5): MakeData[] => {
    const makeCounts: Record<string, number> = {};
    data.forEach(d => {
      if (d.Make) {
        makeCounts[d.Make] = (makeCounts[d.Make] || 0) + 1;
      }
    });

    return Object.entries(makeCounts)
      .map(([make, count]) => ({ make, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  const getYearDistribution = (): YearData[] => {
    const yearCounts: Record<number, number> = {};
    data.forEach(d => {
      if (d['Model Year'] && d['Model Year'] > 2010) { // Filter for recent years
        yearCounts[d['Model Year']] = (yearCounts[d['Model Year']] || 0) + 1;
      }
    });

    return Object.entries(yearCounts)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);
  };

  return {
    data,
    loading,
    error,
    getStats,
    getTopMakes,
    getYearDistribution
  };
};