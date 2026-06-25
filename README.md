# Is het te warm om te werken?

Een site die elke dag één vraag beantwoordt: is het te warm om te werken? Het
oordeel (JA of NEE) komt van de actuele temperatuur in De Bilt. Vanaf 25°C is
het officieel te warm.

## Ontwikkelen

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Hoe het werkt

- Temperatuur komt van de Open-Meteo API (meetstation De Bilt, geen API-sleutel nodig).
- De drempel staat op 25°C (`TEMP_THRESHOLD` in `src/lib/answers.ts`).
- De pagina ververst elke 5 minuten (ISR, `revalidate = 300`).

## Stack

- Next.js (App Router) + React
- Tailwind CSS v4
- lucide-react voor de iconen
- Inter en Archivo via `next/font`

## Deploy

Draait op Vercel.
