'use client';

import { useEffect, useRef, useState } from 'react';
import { Baby, Church, Clock3, Gift, Heart, MapPin, Navigation, Sparkles, Volume2, VolumeX } from 'lucide-react';

const details = [
  { icon: Church, eyebrow: 'Ceremonia', title: 'Santa misa', place: 'Iglesia Nuestra Señora del Rosario', city: 'Iles, Nariño', time: '9:00 a. m.', mapsUrl: 'https://maps.app.goo.gl/Hu5AB1oem8j6uXgg6?g_st=ic' },
  { icon: Gift, eyebrow: 'Celebración', title: 'Recepción', place: 'Casa de los Cristales', city: 'Ipiales, Nariño', time: '12:00 p. m.', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+de+los+Cristales%2C+Cra.+6+%2300-63%2C+Ipiales%2C+Nari%C3%B1o' },
];

const eventDate = new Date('2026-09-26T09:00:00-05:00');

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, eventDate.getTime() - Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (remaining === null) return <div className="countdown-loading">Preparando el contador…</div>;

  const totalSeconds = Math.floor(remaining / 1000);
  const values = [
    { label: 'Días', value: Math.floor(totalSeconds / 86400) },
    { label: 'Horas', value: Math.floor((totalSeconds % 86400) / 3600) },
    { label: 'Min', value: Math.floor((totalSeconds % 3600) / 60) },
    { label: 'Seg', value: totalSeconds % 60 },
  ];

  if (remaining === 0) return <p className="countdown-finished">¡Hoy celebramos a Miguel Ángel!</p>;

  return (
    <div className="countdown" aria-label="Tiempo restante para la ceremonia" aria-live="off">
      {values.map(({ label, value }) => (
        <div className="countdown-item" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!opened) return;
    const timer = window.setTimeout(() => setShowInvite(true), 850);
    return () => window.clearTimeout(timer);
  }, [opened]);

  const openInvitation = () => {
    if (opened) return;
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      void audioRef.current.play().catch(() => setMusicPlaying(false));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play().catch(() => setMusicPlaying(false));
    else audio.pause();
  };

  return (
    <main className={`site-shell ${showInvite ? 'invitation-visible' : ''}`}>
      <audio
        ref={audioRef}
        src="/musica-invitacion.mp3"
        preload="auto"
        loop
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />
      <section className={`opening-screen ${opened ? 'is-opening' : ''}`} aria-hidden={showInvite}>
        <div className="opening-copy">
          <span className="tiny-cross" aria-hidden="true">✦</span>
          <p>Una bendición muy especial está por comenzar</p>
        </div>

        <button className="envelope" type="button" onClick={openInvitation} aria-label="Abrir invitación">
          <span className="envelope-back" />
          <span className="envelope-letter">
            <span className="letter-small">Bautizo y primer añito</span>
            <strong>Miguel Ángel</strong>
          </span>
          <span className="envelope-front" />
          <span className="envelope-flap" />
          <span className="seal"><Heart size={22} fill="currentColor" /></span>
        </button>

        <button className="open-hint" type="button" onClick={openInvitation}>
          Toca el sobre para abrir <Sparkles size={16} aria-hidden="true" />
        </button>
      </section>

      <article className="invitation" aria-hidden={!showInvite}>
        <header className="hero">
          <div className="leaf leaf-one" aria-hidden="true" />
          <div className="leaf leaf-two" aria-hidden="true" />
          <p className="kicker">Con la bendición de Dios</p>
          <div className="cross-mark" aria-hidden="true">✦</div>
          <p className="intro">Te invitamos a celebrar el</p>
          <h1><span>Bautizo de</span>Miguel Ángel</h1>
          <p className="surname">Lucero Cabrera</p>
          <img className="animal-hero" src="/animales-bautizo.png" alt="Tiernos animales bebés de safari en acuarela" />
          <div className="celebration-pill"><Baby size={18} /> y su primer cumpleaños</div>
          <div className="event-date">
            <span>Sábado</span>
            <strong>26</strong>
            <span>Septiembre · 2026</span>
          </div>
          <p className="countdown-title">Faltan</p>
          <Countdown />
          <p className="scroll-note">Desliza para descubrir los detalles</p>
        </header>

        <section className="quote-section section-pad">
          <span className="quote-mark">“</span>
          <p>Que este primer encuentro con Jesús sea para mí una fuente de luz en el camino de la vida.</p>
          <span className="quote-leaf" aria-hidden="true">❧</span>
        </section>

        <section className="details-section section-pad">
          <p className="section-kicker">Acompáñanos</p>
          <h2>En un día lleno de fe y alegría</h2>
          <div className="event-grid">
            {details.map(({ icon: Icon, eyebrow, title, place, city, time, mapsUrl }) => (
              <article className="event-card" key={title}>
                <div className="event-icon"><Icon size={25} strokeWidth={1.8} /></div>
                <p className="event-eyebrow">{eyebrow}</p>
                <h3>{title}</h3>
                <div className="event-line"><Clock3 size={18} /><strong>{time}</strong></div>
                <div className="event-line place-line"><MapPin size={18} /><span><strong>{place}</strong>{city}</span></div>
                <a className="maps-button" href={mapsUrl} target="_blank" rel="noreferrer" aria-label={`Abrir en Google Maps: ${place}`}>
                  <Navigation size={17} aria-hidden="true" /> Cómo llegar
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="family-section section-pad">
          <div className="family-ornament" aria-hidden="true">✦</div>
          <p className="section-kicker">Con mucho amor</p>
          <h2>Mi familia</h2>
          <div className="family-list">
            <div><span>Mis padres</span><strong>Junior Lucero<br />y Daniela Cabrera</strong></div>
            <i aria-hidden="true" />
            <div><span>Mi madrina</span><strong>Ana Milena Caicedo</strong></div>
          </div>
        </section>

        <footer className="footer">
          <Heart size={22} fill="currentColor" />
          <p>Será una alegría compartir este momento contigo</p>
          <strong>Miguel Ángel · 1 añito</strong>
        </footer>
      </article>

      {showInvite && (
        <button
          className="music-control"
          type="button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? 'Pausar música' : 'Reproducir música'}
          title={musicPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {musicPlaying ? <Volume2 size={21} /> : <VolumeX size={21} />}
          <span>{musicPlaying ? 'Música' : 'Sin música'}</span>
        </button>
      )}
    </main>
  );
}
