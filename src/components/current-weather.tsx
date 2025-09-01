import { formatTemperature, formatTime, formatWindSpeed } from "@/lib/weather-utils";
import type { RawWeatherData } from "@/lib/types";
import WeatherIcon from "./weather-icon";
import { Droplets, Gauge, Sunrise, Sunset, Wind, Star } from "lucide-react";
import { Button } from "./ui/button";

interface CurrentWeatherProps {
  data: RawWeatherData;
  isAuthenticated: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CurrentWeather({ data, isAuthenticated, isFavorite, onToggleFavorite }: CurrentWeatherProps) {
  const { main, name, sys, weather, wind, timezone } = data;
  const weatherDetails = weather[0];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 rounded-2xl bg-card text-card-foreground shadow-lg">
      <div>
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-1">
                <p className="text-xl font-bold tracking-tight">{name}, {sys.country}</p>
                 {isAuthenticated && (
                    <Button variant="ghost" size="icon" onClick={onToggleFavorite} className="text-muted-foreground hover:text-primary w-8 h-8">
                        <Star className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                  <Sunrise className="w-5 h-5 text-muted-foreground" />
                  <p className="font-semibold text-xs">{formatTime(sys.sunrise, timezone)}</p>
              </div>
              <div className="flex flex-col items-center">
                  <Sunset className="w-5 h-5 text-muted-foreground" />
                  <p className="font-semibold text-xs">{formatTime(sys.sunset, timezone)}</p>
              </div>
            </div>
        </div>

        <div className="flex flex-col items-center text-center my-8">
            <WeatherIcon code={weatherDetails.icon} size={120} />
            <p className="text-7xl font-bold tracking-tighter drop-shadow-md mt-4">{formatTemperature(main.temp)}</p>
            <p className="text-xl capitalize font-medium drop-shadow">{weatherDetails.description}</p>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-foreground">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Gauge className="w-5 h-5" />
              </div>
              <div>
                  <p className="text-xs text-muted-foreground">Sensação</p>
                  <p className="font-bold text-base">{formatTemperature(main.feels_like)}</p>
              </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Droplets className="w-5 h-5" />
              </div>
              <div>
                  <p className="text-xs text-muted-foreground">Umidade</p>
                  <p className="font-bold text-base">{main.humidity}%</p>
              </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Wind className="w-5 h-5" />
              </div>
              <div>
                  <p className="text-xs text-muted-foreground">Vento</p>
                  <p className="font-bold text-base">{formatWindSpeed(wind.speed)}</p>
              </div>
          </div>
      </div>
    </div>
  );
}
