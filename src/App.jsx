import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import photo1 from "./assets/WhatsApp Image 2026-01-12 at 16.09.53 (1).jpeg";
import photo2 from "./assets/WhatsApp Image 2026-01-12 at 16.09.53 (2).jpeg";
import photo3 from "./assets/WhatsApp Image 2026-01-12 at 16.09.53 (3).jpeg";
import photo4 from "./assets/WhatsApp Image 2026-01-12 at 16.09.53 (4).jpeg";
import photo5 from "./assets/WhatsApp Image 2026-01-12 at 16.09.53 (5).jpeg";
import song from "./assets/sounds/Nadhif_Basalamah_-_bergema_sampai_selamanya_(mp3.pm).mp3";

export default function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  const audioRef = useRef(null);
  const [musicReady, setMusicReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const photos = useMemo(() => [photo1, photo2, photo3, photo4, photo5], []);

  const timeline = useMemo(
    () => [
      { icon: "calendar", title: "Pertama kenal", desc: "Hari itu rasanya biasa… tapi ternyata jadi awal semuanya." },
      { icon: "chat", title: "Pertama chat", desc: "Dari chat sederhana, aku mulai nungguin notif kamu tiap hari." },
      { icon: "spark", title: "1 tahun bersama", desc: "Satu tahun yang penuh cerita. Dan aku mau lanjut terus." },
    ],
    []
  );

  const openLightbox = (src) => {
    setActiveImg(src);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImg(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleMusic = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      // Banyak HP tidak mengizinkan autoplay tanpa interaksi user.
      if (!musicReady) {
        await a.play();
        setMusicReady(true);
        setPlaying(true);
        return;
      }

      if (a.paused) {
        await a.play();
        setPlaying(true);
      } else {
        a.pause();
        setPlaying(false);
      }
    } catch {
      // kalau browser blokir, tetap aman (user tinggal klik lagi)
      setPlaying(false);
    }
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      {/* Background sparkles */}
      <div className="sparkles" aria-hidden="true" />

      {/* Top floating controls */}
      <div className="topbar">
        <button className="pill" onClick={() => scrollToId("surat")}>
          <Icon name="mail" /> Surat
        </button>
        <button className="pill" onClick={() => scrollToId("timeline")}>
          <Icon name="timeline" /> Timeline
        </button>
        <button className="pill" onClick={() => scrollToId("galeri")}>
          <Icon name="gallery" /> Galeri
        </button>

        <button className="pill gold" onClick={toggleMusic} title="Play music">
          <Icon name={playing ? "pause" : "play"} /> Music
        </button>
        {/* Ganti src musik sesuai file kamu */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          src={song}
        />
      </div>

      {/* 1) Pembuka */}
      <header className="hero" id="home">
        <div className="heroCard">
          <div className="badge">
            <Icon name="spark" /> One Year of Us <Icon name="spark" />
          </div>
          <h1 className="title">
            happy 1st anniversary <span className="name">gina</span>{" "}
            <span className="inlineIcon"><Icon name="heart" /></span>
          </h1>
          <p className="subtitle">terima kasih sudah bertahan satu tahun bersamaku</p>

          <div className="heroActions">
            <button className="btnPrimary" onClick={() => scrollToId("surat")}>
              <Icon name="mail" /> Buka surat
            </button>
            <button className="btnGhost" onClick={() => scrollToId("timeline")}>
              <Icon name="timeline" /> Lihat timeline
            </button>
          </div>

          <div className="hint">
            Scroll ke bawah ya… <Icon name="down" />
          </div>
        </div>
      </header>

      {/* 2) Surat cinta digital */}
      <section className="section" id="surat">
        <div className="sectionHeader">
          <h2 className="h2">
            <Icon name="mail" /> Surat cinta digital
          </h2>
          <p className="desc">Ditulis seperti surat, biar terasa hangat dan dekat.</p>
        </div>

        <div className="letter">
          <article className="letterCard">
            <div className="letterHeader">
              <span className="letterTo">Untuk: Bubu</span>
              <span className="letterDate">Happy 1st Anniversary <Icon name="heart" /></span>
            </div>
            <p>
              happy 1st anniversary bubu{" "}
              <span className="inlineIcon"><Icon name="heart" /></span>
            </p>
            <p>
              nggak kerasa ya, satu tahun sudah kita lewati bersama. banyak cerita, tawa, capek, dan diam yang akhirnya jadi kenangan.
              terima kasih karena sudah memilih bertahan, bahkan di saat semuanya nggak selalu mudah.
            </p>
            <p>
              aku bangga sama kamu, apalagi sekarang kamu lagi berjuang jalani pkl sampai maret.
              aku tahu hari-harimu capek, kadang lelah, kadang pengen menyerah.
              tapi kamu tetap jalan, tetap kuat, dan itu bikin aku makin yakin sama kamu.
            </p>
            <p>
              maaf kalau selama satu tahun ini aku belum selalu jadi yang terbaik.
              aku masih belajar, masih sering salah, tapi satu hal yang pasti: perasaanku ke kamu selalu serius.
            </p>
            <p>
              terima kasih sudah hadir di hidupku, bubu.
              terima kasih sudah jadi tempat pulang, tempat cerita, dan tempat aku belajar sabar.
              semoga ke depannya kita bisa terus tumbuh, saling ngerti, dan saling jaga.
            </p>
            <p>
              ini aniversary pertama kita, dan aku berharap ini bukan yang terakhir.
              aku ingin lebih banyak tahun, lebih banyak cerita, dan lebih banyak kenangan bersama kamu.
            </p>
            <p className="letterClose">
              aku sayang kamu, bubu. selalu. <span className="inlineIcon"><Icon name="heart" /></span>
            </p>
            <div className="letterSign">— Dari aku</div>
          </article>
        </div>
      </section>

      {/* 3) Timeline */}
      <section className="section" id="timeline">
        <div className="sectionHeader">
          <h2 className="h2">
            <Icon name="timeline" /> Timeline hubungan
          </h2>
          <p className="desc">Scroll enak di HP — satu per satu momen kita.</p>
        </div>

        <div className="timeline">
          {timeline.map((t, i) => (
            <div className="tCard" key={i}>
              <div className="tIcon">
                <Icon name={t.icon} />
              </div>
              <div className="tBody">
                <div className="tTitle">{t.title}</div>
                <div className="tDesc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4) Galeri */}
      <section className="section" id="galeri">
        <div className="sectionHeader">
          <h2 className="h2">
            <Icon name="gallery" /> Galeri foto
          </h2>
          <p className="desc">Klik foto → fullscreen. (Ganti fotonya pakai foto kalian.)</p>
        </div>

        <div className="grid">
          {photos.slice(0, 6).map((src, idx) => (
            <button key={idx} className="photoCard" onClick={() => openLightbox(src)}>
              <img src={src} alt={`photo-${idx + 1}`} loading="lazy" />
              <span className="photoOverlay">Tap to view</span>
            </button>
          ))}
        </div>
      </section>

      {/* 5) Penutup */}
      <section className="section" id="penutup">
        <div className="closing">
          <h2 className="h2">
            <Icon name="heart" /> Penutup
          </h2>
          <p className="closingText">
            aku mungkin gak sempurna, tapi aku serius sama kamu, gina{" "}
            <span className="inlineIcon"><Icon name="heart" /></span> selamat satu tahun, semoga selamanya
          </p>

          <button
            className="bigLove"
            onClick={() => {
              // efek lucu + optional: auto play kalau belum
              toggleMusic();
              confettiHearts();
            }}
          >
            aku sayang kamu
          </button>

          <div className="smallNote">
            *Kalau musik belum jalan di HP, klik tombol <b>Music</b> sekali lagi ya.
          </div>
        </div>
      </section>

      <footer className="footer">
        my first experience
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={closeLightbox}>
          <button className="lbClose" onClick={closeLightbox} aria-label="Close">
            ✕
          </button>
          <div className="lbInner" onClick={(e) => e.stopPropagation()}>
            <img src={activeImg} alt="fullscreen" />
          </div>
        </div>
      )}
    </div>
  );
}

function Icon({ name }) {
  const icons = {
    heart: (
      <path d="M12 21s-6.7-4.6-9.2-8.2C1.4 10.1 2 6.8 4.6 5.4c1.8-1 4.1-.6 5.4 1 1.3-1.6 3.6-2 5.4-1 2.6 1.4 3.2 4.7 1.8 7.4C18.7 16.4 12 21 12 21z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
    timeline: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </>
    ),
    gallery: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 13l3-3 4 4 3-2 3 3" />
        <circle cx="8.5" cy="9" r="1.2" />
      </>
    ),
    play: <path d="M8 6l10 6-10 6z" />,
    pause: (
      <>
        <rect x="7" y="6" width="4" height="12" />
        <rect x="13" y="6" width="4" height="12" />
      </>
    ),
    down: <path d="M6 10l6 6 6-6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 9h18" />
      </>
    ),
    chat: (
      <>
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M8 19l3-2h10" />
      </>
    ),
    spark: (
      <path d="M12 2l2.2 5.4L20 9l-5.8 1.6L12 16l-2.2-5.4L4 9l5.8-1.6L12 2z" />
    ),
  };

  const isFill = name === "heart" || name === "spark" || name === "play" || name === "pause";
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={isFill ? "currentColor" : "none"}
      stroke={isFill ? "none" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name] || icons.heart}
    </svg>
  );
}

/** mini effect: hearts floating (tanpa library) */
function confettiHearts() {
  const count = 18;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "heartPop";
    el.innerHTML =
      Math.random() > 0.5
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.7-4.6-9.2-8.2C1.4 10.1 2 6.8 4.6 5.4c1.8-1 4.1-.6 5.4 1 1.3-1.6 3.6-2 5.4-1 2.6 1.4 3.2 4.7 1.8 7.4C18.7 16.4 12 21 12 21z"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 5.4L20 9l-5.8 1.6L12 16l-2.2-5.4L4 9l5.8-1.6L12 2z"/></svg>';
    el.style.left = `${Math.random() * 100}vw`;
    el.style.animationDuration = `${900 + Math.random() * 900}ms`;
    const size = 16 + Math.random() * 18;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 2000);
  }
}
