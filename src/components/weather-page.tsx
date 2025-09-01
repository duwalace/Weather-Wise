// src/components/weather-page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getWeatherAndTips } from "@/app/actions";
import type { RawWeatherData, ProcessedForecast } from "@/lib/types";
import SearchBar from "./search-bar";
import CurrentWeather from "./current-weather";
import Forecast from "./forecast";
import WeatherTips from "./weather-tips";
import ErrorMessage from "./error-message";
import { Sun, Loader2, LogOut, User, Cloud, Star, History, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme-switcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import Link from "next/link";

type WeatherData = {
  currentWeather: RawWeatherData;
  forecast: ProcessedForecast[];
  tips: string;
};

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const storedFavorites = localStorage.getItem(`favorites_${user?.email}`);
      const storedHistory = localStorage.getItem(`history_${user?.email}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }
  }, [isAuthenticated, user?.email]);

  const updateLocalStorage = (key: string, data: string[]) => {
    if (isAuthenticated && user?.email) {
      localStorage.setItem(`${key}_${user.email}`, JSON.stringify(data));
    }
  };

  const handleSearch = useCallback(async (input: { city: string } | { lat: number; lon: number }) => {
    setIsLoading(true);
    setError(null);
    // Don't clear weather data here, so the old data persists while new data loads
    // setWeatherData(null);

    const result = await getWeatherAndTips(input);

    if (result.error) {
      setError(result.error);
      setWeatherData(null); // Clear data on error
    } else if (result.data) {
      setWeatherData(result.data);
      setError(null);
      
      if(isAuthenticated && 'city' in input) {
        const newHistory = [result.data.currentWeather.name, ...history.filter(h => h.toLowerCase() !== result.data.currentWeather.name.toLowerCase())].slice(0, 5);
        setHistory(newHistory);
        updateLocalStorage('history', newHistory);
      }
    }
    
    setIsLoading(false);
  }, [history, isAuthenticated, user?.email]);

  const handleCitySearch = (city: string) => {
    handleSearch({ city });
  };

  const handleToggleFavorite = (city: string) => {
    const newFavorites = favorites.includes(city)
      ? favorites.filter((f) => f !== city)
      : [city, ...favorites];
    setFavorites(newFavorites);
    updateLocalStorage('favorites', newFavorites);
  };
  
  const handleLoginClick = () => {
    router.push('/login');
  }

  const renderAuthenticatedView = () => (
    <div className="w-full mt-10 animate-in fade-in-50">
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="favorites">
              <Star className="mr-2 h-4 w-4" />
              Localizações Favoritas
              </TabsTrigger>
            <TabsTrigger value="history">
              <History className="mr-2 h-4 w-4" />
              Histórico
              </TabsTrigger>
          </TabsList>
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Suas Localizações Favoritas</CardTitle>
                <CardDescription>
                  Acesse rapidamente o clima para as cidades que você mais se importa.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                 {favorites.length > 0 ? (
                    favorites.map(fav => (
                      <Button key={fav} variant="ghost" className="w-full justify-start" onClick={() => handleCitySearch(fav)}>{fav}</Button>
                    ))
                 ) : (
                    <p className="text-sm text-muted-foreground">Você ainda não salvou nenhuma localização.</p>
                 )}
              </CardContent>
              {favorites.length > 0 && (
                 <CardFooter>
                   <Button variant="outline" size="sm" onClick={() => {setFavorites([]); updateLocalStorage('favorites', [])}}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Limpar Favoritos
                   </Button>
                 </CardFooter>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Seu Histórico de Buscas</CardTitle>
                <CardDescription>
                  Veja as últimas cidades que você pesquisou recentemente.
                </CardDescription>
              </CardHeader>
               <CardContent className="space-y-2">
                  {history.length > 0 ? (
                      history.map(hist => (
                        <Button key={hist} variant="ghost" className="w-full justify-start" onClick={() => handleCitySearch(hist)}>{hist}</Button>
                      ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Seu histórico de buscas está vazio.</p>
                  )}
              </CardContent>
               {history.length > 0 && (
                 <CardFooter>
                   <Button variant="outline" size="sm" onClick={() => {setHistory([]); updateLocalStorage('history', [])}}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Limpar Histórico
                   </Button>
                 </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
  
  const renderUnauthenticatedInitialView = () => (
    <div className="text-center animate-in fade-in-50 flex flex-col items-center justify-center flex-grow">
        <Cloud size={96} className="text-primary drop-shadow-lg mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Previsão do Tempo na Ponta dos Dedos
        </h2>
        <p className="text-muted-foreground mb-6 text-lg max-w-2xl">
          Use a barra de pesquisa acima para encontrar a previsão do tempo de qualquer cidade.
        </p>
    </div>
  );

  const renderLoadingState = () => (
     <div className="flex flex-col items-center justify-center text-center text-muted-foreground animate-in fade-in flex-grow">
        <Loader2 size={48} className="mx-auto animate-spin text-primary" />
        <p className="mt-4 text-lg">
          Buscando dados do tempo...
        </p>
    </div>
  );

  const renderWeatherDisplay = () => (
    weatherData && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in-50">
            <div className="lg:col-span-2">
                <CurrentWeather 
                  data={weatherData.currentWeather}
                  isAuthenticated={isAuthenticated}
                  isFavorite={favorites.includes(weatherData.currentWeather.name)}
                  onToggleFavorite={() => handleToggleFavorite(weatherData.currentWeather.name)}
                />
            </div>
            <div className="space-y-8">
                <Forecast data={weatherData.forecast} />
                <WeatherTips tips={weatherData.tips} />
            </div>
        </div>
    )
  );
  
  const renderContent = () => {
    if (isLoading && !weatherData) return renderLoadingState();
    if (error) return <ErrorMessage message={error}/>;
    if (!weatherData && !isAuthenticated) return renderUnauthenticatedInitialView();
    
    return (
      <div className="w-full">
        {weatherData && renderWeatherDisplay()}
        {isAuthenticated && (!weatherData ? renderAuthenticatedView() : <div className="mt-8">{renderAuthenticatedView()}</div>)}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-full min-h-screen flex flex-col">
        <header className="flex justify-between items-center mb-8 w-full max-w-7xl mx-auto p-6 md:p-8">
            <Link href="/" aria-label="Ir para a página principal" className="flex items-center gap-3 group">
                <Sun className="text-primary w-8 h-8 transition-transform duration-300 group-hover:rotate-90"/>
                 <h1 className="text-2xl font-bold tracking-tight">
                    WeatherWise
                </h1>
            </Link>
            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                     <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-foreground">{user?.email}</p>
                            <p className="text-xs text-muted-foreground">Usuário</p>
                        </div>
                        <Button onClick={logout} variant="ghost" size="icon" className="h-10 w-10">
                            <LogOut />
                            <span className="sr-only">Sair</span>
                        </Button>
                     </div>
                 ) : (
                      <Button onClick={handleLoginClick} variant="ghost">
                         <User className="mr-2"/>
                         Entrar
                     </Button>
                 )}
                <ThemeSwitcher />
            </div>
        </header>
        
         <main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="w-full max-w-2xl my-8 md:my-12">
                <SearchBar 
                    onSearch={handleCitySearch}
                    isSearching={isLoading}
                />
            </div>
           {renderContent()}
        </main>
        
        {!isAuthenticated && (
          <footer className="w-full max-w-7xl mx-auto mt-auto py-6 px-6 md:px-8 border-t">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <p className="text-center text-sm text-muted-foreground">
                    <Link href="/signup" className="text-primary underline">Crie uma conta</Link> ou <Link href="/login" className="text-primary underline">faça login</Link> para salvar suas cidades favoritas e ver seu histórico.
                  </p>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                © 2024 WeatherWise. Todos os direitos reservados.
              </p>
          </footer>
        )}
      </div>
    </div>
  );
}
