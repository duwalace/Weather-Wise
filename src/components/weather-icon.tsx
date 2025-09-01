import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Moon,
  Sun,
  type LucideProps,
} from "lucide-react";

interface WeatherIconProps extends Omit<LucideProps, "name"> {
  code: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  "01d": Sun,
  "01n": Moon,
  "02d": Cloud, // Alterado de Sun para Cloud
  "02n": Cloud, // Alterado de Moon para Cloud
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudDrizzle,
  "09n": CloudDrizzle,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
};

// A fallback component
const FallbackIcon = (props: LucideProps) => <Sun {...props} />;

export default function WeatherIcon({ code, ...props }: WeatherIconProps) {
  const IconComponent = iconMap[code] || FallbackIcon;
  
  // A lógica de sobreposição foi removida para simplificar.
  // Agora, os códigos '02d' e '02n' renderizarão diretamente o ícone da Nuvem.
  
  return <IconComponent {...props} className="text-primary" />;
}
