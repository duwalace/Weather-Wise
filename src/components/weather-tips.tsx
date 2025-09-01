import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface WeatherTipsProps {
  tips: string;
}

export default function WeatherTips({ tips }: WeatherTipsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-primary w-5 h-5" />
          Dicas Inteligentes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
         <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm">{tips}</p>
      </CardContent>
    </Card>
  );
}
