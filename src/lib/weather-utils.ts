// src/lib/weather-utils.ts

import type { ForecastListItem, ProcessedForecast } from './types';

export const formatTemperature = (temp: number) => `${Math.round(temp)}°C`;

export const formatWindSpeed = (speed: number) => `${(speed * 3.6).toFixed(1)} km/h`;

export const formatTime = (timestamp: number, timezone: number) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
};

export const formatDay = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('pt-BR', { weekday: 'short' });
};

export const processForecastData = (
  list: ForecastListItem[], 
  timezone: number
): ProcessedForecast[] => {
  const dailyData: { [key: string]: { temps: number[], icons: string[], descriptions: string[] } } = {};

  list.forEach(item => {
    // Adjust timestamp to city's timezone before getting the date string
    const localDate = new Date((item.dt + timezone) * 1000);
    const dateKey = localDate.toISOString().split('T')[0];

    if (!dailyData[dateKey]) {
      dailyData[dateKey] = { temps: [], icons: [], descriptions: [] };
    }
    dailyData[dateKey].temps.push(item.main.temp);
    dailyData[dateKey].icons.push(item.weather[0].icon);
    dailyData[dateKey].descriptions.push(item.weather[0].description);
  });
  
  // Get today's date key in the city's timezone
  const today = new Date();
  today.setSeconds(today.getSeconds() + timezone);
  const todayKey = today.toISOString().split('T')[0];
  
  // Remove today's data if it exists
  if (dailyData[todayKey]) {
      delete dailyData[todayKey];
  }
  
  return Object.entries(dailyData).slice(0, 5).map(([date, data]) => {
    const temp_min = Math.min(...data.temps);
    const temp_max = Math.max(...data.temps);

    // Find the most frequent icon for the day
    const iconCounts = data.icons.reduce((acc, icon) => {
        const baseIcon = icon.substring(0,2); // group by day/night variations
        acc[baseIcon] = (acc[baseIcon] || 0) + 1;
        return acc;
    }, {} as {[key: string]: number});

    const mostFrequentBaseIcon = Object.keys(iconCounts).reduce((a, b) => iconCounts[a] > iconCounts[b] ? a : b);
    // Prefer day icon 'd'
    const icon = `${mostFrequentBaseIcon}d`;
    
    // Find the most frequent description for the day
    const descriptionCounts = data.descriptions.reduce((acc, desc) => {
        acc[desc] = (acc[desc] || 0) + 1;
        return acc;
    }, {} as {[key: string]: number});
    const description = Object.keys(descriptionCounts).reduce((a, b) => descriptionCounts[a] > descriptionCounts[b] ? a : b);

    return {
      dt: new Date(date).getTime() / 1000,
      temp_min,
      temp_max,
      icon,
      description
    };
  });
};
