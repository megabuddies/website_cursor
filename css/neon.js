:root {
  --glow-intensity: 0.8;
}

.neon-glow {
  box-shadow: 0 0 10px rgba(0, 255, 65, var(--glow-intensity)),
              0 0 20px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.5)),
              0 0 30px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.3)),
              0 0 40px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.1));
}

.neon-text {
  text-shadow: 0 0 10px rgba(0, 255, 65, var(--glow-intensity)),
               0 0 20px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.5)),
               0 0 30px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.3));
}

.neon-border {
  border-color: var(--accent-color);
  box-shadow: 0 0 10px rgba(0, 255, 65, var(--glow-intensity)),
              0 0 20px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.5));
}

.neon-pulse {
  animation: neonPulse 2s infinite alternate;
}

@keyframes neonPulse {
  from {
    box-shadow: 0 0 10px rgba(0, 255, 65, var(--glow-intensity)),
                0 0 20px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.5));
  }
  to {
    box-shadow: 0 0 15px rgba(0, 255, 65, calc(var(--glow-intensity) * 1.5)),
                0 0 30px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.8)),
                0 0 45px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.4));
  }
}

.neon-flicker {
  animation: neonFlicker 3s infinite;
}

@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 10px rgba(0, 255, 65, var(--glow-intensity)),
                 0 0 20px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.5)),
                 0 0 30px rgba(0, 255, 65, calc(var(--glow-intensity) * 0.3));
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}

.neon-button {
  position: relative;
  overflow: hidden;
}

.neon-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.4), transparent);
  transition: 0.5s;
}

.neon-button:hover::before {
  left: 100%;
}

.terminal-effect {
  position: relative;
  overflow: hidden;
}

.terminal-effect::after {
  content: '';
  position: absolute;
  right: -5px;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: var(--accent-color);
  animation: cursorBlink 1s step-end infinite;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.glitch-effect {
  position: relative;
  display: inline-block;
}

.glitch-effect::before,
.glitch-effect::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-color);
}

.glitch-effect::before {
  left: 2px;
  text-shadow: -1px 0 var(--secondary-color);
  clip: rect(24px, 550px, 90
  .glitch-effect::before {
  left: 2px;
  text-shadow: -1px 0 var(--secondary-color);
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}

.glitch-effect::after {
  left: -2px;
  text-shadow: 1px 0 var(--accent-color);
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch-anim-2 2s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0% { clip: rect(24px, 550px, 90px, 0); }
  20% { clip: rect(125px, 550px, 140px, 0); }
  40% { clip: rect(24px, 550px, 50px, 0); }
  60% { clip: rect(34px, 550px, 115px, 0); }
  80% { clip: rect(74px, 550px, 140px, 0); }
  100% { clip: rect(49px, 550px, 70px, 0); }
}

@keyframes glitch-anim-2 {
  0% { clip: rect(85px, 550px, 140px, 0); }
  20% { clip: rect(24px, 550px, 30px, 0); }
  40% { clip: rect(125px, 550px, 140px, 0); }
  60% { clip: rect(25px, 550px, 50px, 0); }
  80% { clip: rect(85px, 550px, 95px, 0); }
  100% { clip: rect(120px, 550px, 145px, 0); }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--accent-color);
  opacity: 0.1;
  z-index: 999;
  animation: scanline 6s linear infinite;
}

@keyframes scanline {
  0% { top: 0; }
  100% { top: 100%; }
}

  
