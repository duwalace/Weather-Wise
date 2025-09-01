// src/app/actions.ts
'use server';

import { getWeatherTips } from '@/ai/flows/weather-tips';
import type { ProcessedForecast, RawForecastData, RawWeatherData } from '@/lib/types';
import { processForecastData } from '@/lib/weather-utils';

type ActionInput = { city: string } | { lat: number; lon: number };

export async function getWeatherAndTips(input: ActionInput) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  console.log('Usando a chave da API OpenWeather:', apiKey ? 'Chave encontrada' : 'Chave não encontrada');
  if (!apiKey) {
    return { error: 'A chave da API para o OpenWeatherMap não está configurada. Adicione-a ao seu arquivo .env.' };
  }

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lang=pt_br`;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric&lang=pt_br`;

  if ('city' in input) {
    weatherUrl += `&q=${input.city}`;
    forecastUrl += `&q=${input.city}`;
  } else {
    weatherUrl += `&lat=${input.lat}&lon=${input.lon}`;
    forecastUrl += `&lat=${input.lat}&lon=${input.lon}`;
  }

  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl),
    ]);

    if (!weatherResponse.ok) {
      if (weatherResponse.status === 401) {
        return { error: 'Chave de API inválida. Consulte https://openweathermap.org/faq#error401 para mais informações.' };
      }
      if (weatherResponse.status === 404) {
        return { error: 'Cidade não encontrada. Verifique a ortografia e tente novamente.' };
      }
      const errorData = await weatherResponse.json();
      return { error: `Falha ao buscar o clima atual: ${errorData.message}` };
    }

    if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        return { error: `Falha ao buscar a previsão: ${errorData.message}` };
    }

    const currentWeatherData: RawWeatherData = await weatherResponse.json();
    const forecastData: RawForecastData = await forecastResponse.json();
    
    const processedForecast: ProcessedForecast[] = processForecastData(forecastData.list, currentWeatherData.timezone);

    const tipsInput = {
      city: currentWeatherData.name,
      weatherDescription: currentWeatherData.weather[0].description,
      temperature: currentWeatherData.main.temp,
      humidity: currentWeatherData.main.humidity,
      windSpeed: currentWeatherData.wind.speed,
    };
    
    const weatherTips = await getWeatherTips(tipsInput);

    return {
      data: {
        currentWeather: currentWeatherData,
        forecast: processedForecast,
        tips: weatherTips.tips,
      },
    };
  } catch (err) {
    console.error(err);
    return { error: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.' };
  }
}
