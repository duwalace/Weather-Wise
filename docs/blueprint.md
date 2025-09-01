# **App Name**: WeatherWise

## Core Features:

- Current Weather Display: Display current weather conditions, including temperature, description, and icon, for a specific location.
- 5-Day Forecast: Provide a 5-day weather forecast, including day of the week, weather icon, and min/max temperatures.
- City Search: Allow users to search for weather information by city name.
- Weather Data Fetching: Utilize the OpenWeatherMap API to fetch weather data. Users will need to provide their own API key.
- Loading State: Display a loading spinner while weather data is being fetched.
- Error Handling: Show an error message if the city is not found or if there is an API error.
- Weather-Aware Smart Tips: Based on weather conditions, a tool provides customized tips like what to wear. Weather information will influence the LLM's response to generate useful content.

## Style Guidelines:

- Primary color: A calm sky blue (#7EC4CF) to evoke a sense of serenity and clarity related to the weather.
- Background color: A very light, desaturated blue (#F0F8FF) to maintain a clean and airy feel.
- Accent color: A muted, darker teal (#4A777A) for interactive elements and highlights, providing contrast and visual interest.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern and neutral look.
- Use consistent and visually appealing weather icons from the react-icons library to represent different weather conditions.
- Employ a clean, centered layout that is fully responsive, adapting seamlessly to different screen sizes (desktops, tablets, and mobile phones).
- Incorporate subtle animations and transitions, such as a fade-in effect for weather cards, to enhance the user experience.