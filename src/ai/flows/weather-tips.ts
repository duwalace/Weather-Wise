// weather-tips.ts
'use server';

/**
 * @fileOverview A flow to provide personalized tips based on current weather conditions.
 *
 * - getWeatherTips - A function that generates weather-based tips.
 * - WeatherTipsInput - The input type for the getWeatherTips function.
 * - WeatherTipsOutput - The return type for the getWeatherTips function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WeatherTipsInputSchema = z.object({
  city: z.string().describe('A cidade para a qual gerar dicas de tempo.'),
  weatherDescription: z.string().describe('A descrição do tempo atual (por exemplo, ensolarado, chuvoso).'),
  temperature: z.number().describe('A temperatura atual em Celsius.'),
  humidity: z.number().describe('A porcentagem de umidade atual.'),
  windSpeed: z.number().describe('A velocidade atual do vento em km/h.'),
});
export type WeatherTipsInput = z.infer<typeof WeatherTipsInputSchema>;

const WeatherTipsOutputSchema = z.object({
  tips: z.string().describe('Dicas personalizadas com base nas condições climáticas.'),
});
export type WeatherTipsOutput = z.infer<typeof WeatherTipsOutputSchema>;

export async function getWeatherTips(input: WeatherTipsInput): Promise<WeatherTipsOutput> {
  return weatherTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherTipsPrompt',
  input: { schema: WeatherTipsInputSchema },
  output: { schema: WeatherTipsOutputSchema },
  prompt: `Você é um assistente prestativo que fornece dicas personalizadas com base nas condições climáticas atuais.

  O tempo atual em {{{city}}} é descrito como "{{{weatherDescription}}}" com uma temperatura de {{{temperature}}}°C, {{{humidity}}}% de umidade e uma velocidade do vento de {{{windSpeed}}} km/h.

  Com base nessas condições, forneça algumas dicas curtas e práticas. Por exemplo, sugira o que vestir, atividades para fazer ou precauções a tomar.
  As dicas devem ser concisas e fáceis de entender.
  `, 
});

const weatherTipsFlow = ai.defineFlow(
  {
    name: 'weatherTipsFlow',
    inputSchema: WeatherTipsInputSchema,
    outputSchema: WeatherTipsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
