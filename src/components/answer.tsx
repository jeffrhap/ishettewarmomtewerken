"use client";

import { Fragment, useState } from "react";
import { Thermometer } from "@/components/thermometer";
import type { Content, Weather } from "@/lib/answers";

const KOFI_URL = "https://ko-fi.com/jeffreyh91";

type Props = {
  weather: Weather | null;
  isWarm: boolean;
  content: Content;
  initialLine: string | null;
};

// Pick a random line, avoiding an immediate repeat of the current one.
const pick = (lines: readonly string[], exclude: string | null): string => {
  if (lines.length <= 1) return lines[0];
  let next = lines[Math.floor(Math.random() * lines.length)];
  while (next === exclude) next = lines[Math.floor(Math.random() * lines.length)];
  return next;
};

const round = (n: number) => Math.round(n);

export const Answer = ({ weather, isWarm, content, initialLine }: Props) => {
  const [line, setLine] = useState(initialLine);

  if (!weather || line === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-800 p-8 text-center font-body text-slate-100">
        <h1 className="text-5xl font-black">¯\_(ツ)_/¯</h1>
        <p className="text-xl">
          Kon de temperatuur even niet ophalen. Probeer het zo nog eens.
        </p>
      </main>
    );
  }

  const stats = [
    { value: `${round(weather.temperature)}°C`, label: "Temperatuur · De Bilt" },
    { value: `${round(weather.feelsLike)}°C`, label: "Gevoelstemperatuur" },
    { value: `${round(weather.maxTemp)}°C`, label: "Max vandaag" },
  ];

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden font-body text-white"
      style={{
        backgroundImage: isWarm
          ? "linear-gradient(152deg,#FF7A18 16%,#E53600 84%)"
          : "linear-gradient(152deg,#2E9BE6 16%,#1452C9 84%)",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-[1280px] flex-col px-5 sm:px-8 lg:px-14">
        {/* Status bar */}
        <header className="flex items-center justify-between border-b border-white/20 py-4 lg:py-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">{content.mark}</span>
            <span className="font-bold tracking-[0.2px]">
              ishettewarmomtewerken.nl
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-white" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Vandaag {weather.time} · De Bilt
            </span>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-10 py-8 lg:flex-row lg:gap-16 lg:py-10">
          {/* Bulletin */}
          <section className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-6">
              <span
                className="w-fit rounded-full bg-white px-4 py-2 text-sm font-bold tracking-wider"
                style={{ color: content.badgeColor }}
              >
                {content.badge}
              </span>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold tracking-[2px] text-white/70">
                  HET OORDEEL · VANDAAG
                </p>
                <h1 className="font-display text-7xl font-extrabold leading-none sm:text-8xl lg:text-[110px]">
                  {content.verdict}
                </h1>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">
                  {content.headline}
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {line}
                </p>
              </div>

              <div className="h-px w-full bg-white/25" />

              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                {stats.map((stat, i) => (
                  <Fragment key={stat.label}>
                    {i > 0 && (
                      <div className="hidden h-[42px] w-px bg-white/20 sm:block" />
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-3xl font-extrabold">
                        {stat.value}
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-white/70">
                        {stat.label}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {content.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-medium"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLine(pick(content.lines, line))}
              className="mt-2 flex w-fit items-center gap-2 rounded-full border-[1.5px] border-white/40 bg-white/15 px-6 py-3.5 text-base font-semibold transition hover:bg-white/25 lg:mt-auto"
            >
              nog een keer 🎲
            </button>
          </section>

          {/* Thermometer */}
          <aside className="flex items-center justify-center lg:w-[340px]">
            <div className="h-[541px] overflow-hidden sm:h-[595px] lg:h-[660px]">
              <div className="mx-auto w-[300px] origin-top scale-[0.82] sm:scale-90 lg:scale-100">
                <Thermometer temperature={weather.temperature} isWarm={isWarm} />
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-3 border-t border-white/20 py-4 text-center sm:flex-row sm:justify-between sm:text-left lg:py-5">
          <span className="text-xs font-medium text-white/70">
            Bron: Open-Meteo · meetstation De Bilt
          </span>
          <span className="text-xs font-medium text-white/70">{content.tagline}</span>
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#FF5E5B] transition hover:-translate-y-0.5"
          >
            <span>🍦</span> Trakteer me op een ijsje
          </a>
        </footer>
      </div>
    </main>
  );
};
