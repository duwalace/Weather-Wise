import WeatherPage from "@/components/weather-page";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Home() {
  return (
    <main>
      <AuthProvider>
        <WeatherPage />
      </AuthProvider>
    </main>
  );
}
