import { useState } from "react";
import { FaTrophy, FaBolt, FaPalette } from "react-icons/fa";

const styles = `
  .flip-card { perspective: 1000px; width: 500px; height: 320px; cursor: pointer; }
  .flip-card-inner {
    width: 100%; height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.999s;
  }
  .flip-card-inner.flipped { transform: rotateY(180deg); }
  .flip-card-front, .flip-card-back {
    position: absolute; width: 100%; height: 100%;
    backface-visibility: hidden;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
    font-size: 24px; color: #fff;
    border-radius: 16px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: radial-gradient(ellipse at top, #2a2a2a, #1a1a1a);
  }
  .flip-card-front {
    border: 1px solid #333;
    transform: rotateY(0deg);
    justify-content: flex-start;
    padding-top: 32px;
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  .flip-card-back {
    border: 1px solid #333;
    transform: rotateY(180deg);
    transition: border-color 0.3s ease;
    background: radial-gradient(ellipse at bottom, #1e2a10, #1a1a1a);
  }
  .flip-card:hover .flip-card-front {
    border-color: #89E900;
    box-shadow: 0 0 24px rgba(137, 233, 0, 0.15);
    transform: rotateY(0deg) translateY(-4px);
  }
  .flip-card:hover .flip-card-front .icon-wrap {
    background: rgba(137, 233, 0, 0.12);
    box-shadow: 0 0 0 1px rgba(137, 233, 0, 0.25), 0 0 20px rgba(137, 233, 0, 0.15);
  }
  .flip-card:hover .flip-card-front svg {
    color: #89E900;
    transition: color 0.3s ease;
  }
  .flip-card:hover .flip-card-back {
    border-color: #89E900;
    box-shadow: 0 0 24px rgba(137, 233, 0, 0.15);
  }
  .icon-wrap {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    margin-bottom: 4px;
  }
  .card-number {
    position: absolute;
    top: 16px; left: 20px;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: #444;
    font-weight: 600;
  }
  .accent-bar {
    position: absolute;
    bottom: 0; left: 10%; right: 10%;
    height: 2px;
    background: #89E900;
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  .flip-card:hover .accent-bar {
    transform: scaleX(1);
  }
  .flip-hint {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
    color: #555;
    transition: color 0.3s ease;
  }
  .flip-card:hover .flip-hint {
    color: #89E900;
  }
  .section-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #89E900;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .section-divider {
    width: 40px; height: 2px;
    background: #89E900;
    border-radius: 2px;
    margin: 0 auto 40px;
  }
`;

function Card({ front, back, icon: Icon, number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flip-card" onClick={() => setFlipped(!flipped)}>
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <span className="card-number">{number}</span>
          <div className="icon-wrap">
            <Icon className="text-3xl text-white" />
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-2">
            <h1 className="text-xl font-semibold text-center px-4">{front}</h1>
            <span className="flip-hint">See More</span>
          </div>
          <div className="accent-bar" />
        </div>
        <div className="flip-card-back">
          <p className="text-sm text-center py-2 px-6 font-sans font-light leading-relaxed">{back}</p>
          <span className="flip-hint">Back</span>
        </div>
      </div>
    </div>
  );
}

export default function FlipCard() {
  return (
    <>
      <style>{styles}</style>
      <div className="flex flex-col items-center mt-14">
        <div className="section-divider" />
        <div className="flex flex-row gap-6">
          <Card
            number="01"
            icon={FaTrophy}
            front="Curated Premium Selection"
            back="Every sneaker is carefully chosen, focusing on quality, style, and relevance so you always get the best drops and classics."
          />
          <Card
            number="02"
            icon={FaBolt}
            front="Streetwear Meets Performance"
            back="STRYDE blends fashion and function, giving you shoes that look good on the street and perform when it matters."
          />
          <Card
            number="03"
            icon={FaPalette}
            front="Built for Expression"
            back="It's not just footwear—it's identity. STRYDE helps you express your individuality through bold, modern sneaker culture."
          />
        </div>
      </div>
    </>
  );
}