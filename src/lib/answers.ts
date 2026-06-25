import { cache } from "react";

// De Bilt = the national reference station, used as a stand-in for
// "the average Netherlands" so we never need the visitor's location.
export const DE_BILT = { latitude: 52.1, longitude: 5.18 } as const;

// At or above this temperature (°C) it's officially "te warm om te werken".
export const TEMP_THRESHOLD = 25;

// Advisory copy shown when it IS too warm (verdict JA).
export const warmLines = [
  "Veel te warm om iets nuttigs te doen. Scherm uit, gordijnen dicht en hangen maar tot het afkoelt.",
  "Hittegolf in de kantoortuin. De enige spreadsheet die vandaag telt is die van je ijscoboer.",
  "Je laptop draait warmer dan je ambitie. Klap 'm dicht, gordijnen dicht en wacht tot het afkoelt.",
  "Dit is geen werkweer, dit is voor-de-ventilator-hangen-weer. De thermometer heeft gesproken.",
  "Zweten achter je bureau is geen sport. Zoek de koelste hoek van het huis en blijf daar plakken.",
  "Officieel te warm om iets nuttigs te doen. Hydrateer, koel af en doe vooral even niets.",
  "De hitte sloopt je kop helemaal. Geef het gewoon op voor vandaag, niemand die het merkt.",
  "Productiviteit is geannuleerd wegens tropische omstandigheden. Een ijsje is nu een medische noodzaak.",
  "Het plakt overal waar je niet wil dat het plakt. Trek wat uit, ga plat en noem het powernappen.",
  "Je collega's ruiken je al van drie bureaus verderop, en dat is niet je parfum. Ga naar huis, doe iedereen een lol.",
  "Te warm om te denken, laat staan om te doen. Je hersenen zijn tot soep gesmolten, dus verwacht vandaag echt niks zinnigs.",
  "Bij deze temperatuur is een broek al te veel gevraagd. Werken kun je helemaal vergeten, luiwammes.",
  "De airco huilt, jij zweet en die deadline kan lekker de boom in. Pak een koud biertje, het is medisch verantwoord.",
  "Niemand presteert in een sauna, dus stop met doen alsof. Gordijnen dicht, kleren uit, klaar is Kees.",
  "Je stoel plakt aan je billen en je toetsenbord aan je vingers. Dit is geen kantoor meer, dit is een fonduepan.",
  "Het is zo heet dat ademen al te veel moeite is. Ga liggen, doe niks en schaam je nergens voor.",
  "Bij dit weer is 'even doorpakken' pure zelfkastijding. Wees lief voor jezelf en doe helemaal niks.",
  "Je laptop kan er net zo goed een eitje op bakken. Klap 'm dicht voor er brand uitbreekt en jij de schuld krijgt.",
  "Eén blik op de thermometer en zelfs je muis weigert dienst. Doe 'm na en leg het werk neer.",
  "Tropische toestanden in de tent. De enige actie van vandaag is je ijsje redden voor het smelt.",
] as const;

// Advisory copy shown when it is NOT too warm (verdict NEE).
export const coolLines = [
  "Het is gewoon lekker weer, jammer voor jou. Geen hittegolf, geen smoes, dus klap die laptop maar weer open.",
  "Prima werkweer, helaas voor jou. De zon is mild, dus je deadlines blijken ineens toch haalbaar.",
  "Geen excuus te bekennen. Zet koffie, open je inbox en doe alsof je het leuk vindt.",
  "De thermometer staat niet aan jouw kant vandaag. Aangenaam koeltje, dus aan de bak.",
  "Lekker fris om dingen gedaan te krijgen. Sorry, dit is precies het weer waar je baas van droomt.",
  "Niets aan de hand buiten. Je kunt met droge ogen 'het was te warm' niet volhouden.",
  "Niks mis met de temperatuur, dus er valt gewoon te werken vandaag.",
  "Het weer geeft niet thuis als smoes. Trek een vestje aan en knal die to-do-lijst doormidden.",
  "Lekker weertje, balen voor jou. Geen hitte om je luie reet achter te verschuilen, dus aan de bak.",
  "De thermometer lacht je vierkant uit. Het is prima werkweer, dus kom van die bank af.",
  "Geen zweetdruppel te bekennen, dus ook geen smoes. Bewijs maar eens dat je meer kan dan klagen over het weer.",
  "Het is heerlijk fris en jij hebt geen poot om op te staan. Stoppen met zeuren, beginnen met werken.",
  "Sorry hoor, het weer doet gewoon z'n werk vandaag. Mag jij dat ook even doen.",
  "Aangenaam koeltje buiten, dus die 'het-is-te-warm'-act trapt niemand in. Bek dicht, laptop open.",
  "Niks om over te janken vandaag. Geen hittegolf, geen drama, gewoon doorwerken jij.",
  "De zon doet aardig en de thermometer doet normaal. Tijd dat jij ook eens normaal doet en wat uitvoert.",
  "Lekker fris buiten, en je smoesjes zijn op. Helaas pindakaas.",
  "Perfect werkweer en jij staat met lege handen. Niks om over te zeuren, dus maak je eens nuttig.",
  "Het weer is je vriendje niet vandaag, schat. Aangenaam koel betekent gewoon: doorwerken.",
  "Niemand gaat geloven dat dit te warm is. Stop met rekken, pak die muis en ga ervoor.",
] as const;

// Icon names map to lucide-react components in the client component (answer.tsx).
// We store names — not component refs — because STATES crosses the
// server→client boundary as a prop, and only serializable data can.
export type IconName =
  | "sun"
  | "cloudSun"
  | "flame"
  | "circleCheck"
  | "iceCream"
  | "treePalm"
  | "cupSoda"
  | "snowflake"
  | "coffee"
  | "laptop"
  | "wind"
  | "footprints"
  | "thermometer";

type Chip = { icon: IconName; label: string };

export type Content = {
  markIcon: IconName;
  badgeIcon: IconName;
  badge: string;
  badgeColor: string;
  verdict: string;
  headline: string;
  chips: Chip[];
  taglineIcon: IconName;
  tagline: string;
  lines: readonly string[];
};

export const STATES: Record<"warm" | "cool", Content> = {
  warm: {
    markIcon: "sun",
    badgeIcon: "flame",
    badge: "WERKWEER: TE HEET",
    badgeColor: "#E53600",
    verdict: "JA.",
    headline: "Het is te warm om te werken.",
    chips: [
      { icon: "iceCream", label: "IJsje" },
      { icon: "treePalm", label: "Schaduw" },
      { icon: "cupSoda", label: "Koud drankje" },
      { icon: "snowflake", label: "Airco" },
    ],
    taglineIcon: "thermometer",
    tagline: "Niet wetenschappelijk. Wel waar.",
    lines: warmLines,
  },
  cool: {
    markIcon: "cloudSun",
    badgeIcon: "circleCheck",
    badge: "WERKWEER: PRIMA",
    badgeColor: "#0E8A45",
    verdict: "NEE",
    headline: "Het is niet te warm om te werken.",
    chips: [
      { icon: "coffee", label: "Koffie" },
      { icon: "laptop", label: "Aan de slag" },
      { icon: "wind", label: "Raam open" },
      { icon: "footprints", label: "Pauzewandeling" },
    ],
    taglineIcon: "coffee",
    tagline: "Geen excuus. Wel koffie.",
    lines: coolLines,
  },
};

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
// Wrapped in cache() so the page render and generateMetadata share one call.
export const getWeather = cache(async (): Promise<Weather | null> => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${DE_BILT.latitude}&longitude=${DE_BILT.longitude}&current=temperature_2m,apparent_temperature&daily=temperature_2m_max&timezone=Europe%2FAmsterdam&forecast_days=1`,
      { next: { revalidate: 300 } },
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
});
