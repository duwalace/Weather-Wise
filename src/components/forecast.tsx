import { formatTemperature, formatDay } from "@/lib/weather-utils";
import type { ProcessedForecast } from "@/lib/types";
import WeatherIcon from "./weather-icon";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ForecastProps {
  data: ProcessedForecast[];
}

export default function Forecast({ data }: ForecastProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="p-6 pb-4">
        <CardTitle>Previsão para 5 dias</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-2">
          {data.map((day, index) => (
            <div
              key={day.dt}
              className="flex items-center justify-between text-sm"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <p className="font-medium w-16">{formatDay(day.dt)}</p>
              <div className="flex items-center gap-2">
                <WeatherIcon code={day.icon} size={32} />
                <span className="w-28 text-muted-foreground capitalize">{day.description}</span>
              </div>
              <div>
                <span className="font-semibold">{formatTemperature(day.temp_max)}</span>
                <span className="text-muted-foreground text-xs"> / {formatTemperature(day.temp_min)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
