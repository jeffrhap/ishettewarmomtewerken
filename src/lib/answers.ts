// De Bilt = the national reference station, used as a stand-in for
// "the average Netherlands" so we never need the visitor's location.
export const DE_BILT = { latitude: 52.1, longitude: 5.18 } as const;

// At or above this temperature (°C) it's officially "te warm om te werken".
export const TEMP_THRESHOLD = 25;

// Advisory copy shown when it IS too warm (verdict JA).
export const warmLines = [
  "Het werkklimaat is op dit moment gevaarlijk gezellig. Vermijd beeldschermen, zoek schaduw en stel alle productiviteit uit tot het afkoelt.",
  "Hittegolf in de kantoortuin. De enige spreadsheet die vandaag telt is die van je ijscoboer.",
  "Je laptop draait warmer dan je ambitie. Klap 'm dicht, gordijnen dicht en wacht tot het afkoelt.",
  "Dit is geen werkweer, dit is voor-de-ventilator-hangen-weer. De thermometer heeft gesproken.",
  "Zweten achter je bureau telt niet als cardio. Zoek de koelste kamer van het huis en blijf daar.",
  "Officieel te warm om iets nuttigs te doen. Hydrateer, koel af en doe vooral even niets.",
  "De hitte sloopt je concentratie sneller dan je 'deadline' kunt zeggen. Geef het op voor vandaag.",
  "Productiviteit is geannuleerd wegens tropische omstandigheden. Een ijsje is nu een medische noodzaak.",
] as const;

// Advisory copy shown when it is NOT too warm (verdict NEE).
export const coolLines = [
  "Het werkklimaat is teleurstellend aangenaam. Geen hittegolf, geen smoes — de thermometer geeft je vandaag niets om achter te schuilen. Tijd om die laptop weer open te klappen en gewoon aan de slag te gaan.",
  "Prima werkweer, helaas voor jou. De zon is mild, dus je deadlines blijken ineens toch haalbaar.",
  "Geen excuus te bekennen. Zet koffie, open je inbox en doe alsof je het leuk vindt.",
  "De thermometer staat niet aan jouw kant vandaag. Aangenaam koeltje, dus aan de bak.",
  "Lekker fris om dingen gedaan te krijgen. Sorry, dit is precies het weer waar je baas van droomt.",
  "Niets aan de hand buiten. Je kunt met droge ogen 'het was te warm' niet volhouden.",
  "Comfortabele temperatuur, ongemakkelijke waarheid: er valt gewoon te werken vandaag.",
  "Het weer geeft niet thuis als smoes. Trek een vestje aan en knal die to-do-lijst doormidden.",
] as const;

export const STATES = {
  warm: {
    mark: "☀️",
    badge: "🔥 WERKWEER: TE HEET",
    badgeColor: "#E53600",
    verdict: "JA.",
    headline: "Het is te warm om te werken.",
    chips: ["🍦 IJsje", "🌳 Schaduw", "🥤 Koud drankje", "❄️ Airco"],
    tagline: "Niet wetenschappelijk. Wel waar. 🌡️",
    lines: warmLines,
  },
  cool: {
    mark: "🌤️",
    badge: "✅ WERKWEER: PRIMA",
    badgeColor: "#0E8A45",
    verdict: "NEE",
    headline: "Het is niet te warm om te werken.",
    chips: ["☕ Koffie", "💻 Aan de slag", "🪟 Raam open", "🚶 Pauzewandeling"],
    tagline: "Geen excuus. Wel koffie. ☕",
    lines: coolLines,
  },
} as const;

export type Content = (typeof STATES)[keyof typeof STATES];

export type Weather = {
  temperature: number;
  feelsLike: number;
  maxTemp: number;
  time: string; // "HH:MM" in Europe/Amsterdam
};

export const pickRandom = <T,>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

// Current weather for De Bilt via Open-Meteo (free, no API key).
// Returns null on failure so the UI can degrade gracefully.
export const getWeather = async (): Promise<Weather | null> => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${DE_BILT.latitude}&longitude=${DE_BILT.longitude}&current=temperature_2m,apparent_temperature&daily=temperature_2m_max&timezone=Europe%2FAmsterdam&forecast_days=1`,
      { next: { revalidate: 600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();

    const temperature = data?.current?.temperature_2m;
    if (typeof temperature !== "number") return null;

    const feelsLike = data?.current?.apparent_temperature;
    const maxTemp = data?.daily?.temperature_2m_max?.[0];
    const time = String(data?.current?.time ?? "").split("T")[1]?.slice(0, 5) ?? "";

    return {
      temperature,
      feelsLike: typeof feelsLike === "number" ? feelsLike : temperature,
      maxTemp: typeof maxTemp === "number" ? maxTemp : temperature,
      time,
    };
  } catch {
    return null;
  }
};
