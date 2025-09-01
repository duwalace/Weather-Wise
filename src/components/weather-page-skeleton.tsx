import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function WeatherPageSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Current Weather Skeleton */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-[100px] w-[100px] rounded-full" />
              <div>
                <Skeleton className="h-16 w-32" />
                <Skeleton className="h-4 w-24 mt-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full md:w-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg space-y-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="text-center space-y-1">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Tips Skeleton */}
      <Card>
        <CardHeader>
            <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  );
}
