.neon-glow {
  box-shadow: 0 0 10px rgba(66, 245, 197, var(--glow-intensity)),
              0 0 20px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.5)),
              0 0 30px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.3)),
              0 0 40px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.1));
}

.neon-text {
  text-shadow: 0 0 10px rgba(66, 245, 197, var(--glow-intensity)),
               0 0 20px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.5)),
               0 0 30px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.3));
}

.neon-border {
  border-color: var(--accent-color);
  box-shadow: 0 0 10px rgba(66, 245, 197, var(--glow-intensity)),
              0 0 20px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.5));
}

.neon-pulse {
  animation: neonPulse 2s infinite alternate;
}

@keyframes neonPulse {
  from {
    box-shadow: 0 0 10px rgba(66, 245, 197, var(--glow-intensity)),
                0 0 20px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.5));
  }
  to {
    box-shadow: 0 0 15px rgba(66, 245, 197, calc(var(--glow-intensity) * 1.5)),
                0 0 30px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.8)),
                0 0 45px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.4));
  }
}

.neon-flicker {
  animation: neonFlicker 3s infinite;
}

@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 10px rgba(66, 245, 197, var(--glow-intensity)),
                 0 0 20px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.5)),
                 0 0 30px rgba(66, 245, 197, calc(var(--glow-intensity) * 0.3));
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
  background: linear-gradient(90deg, transparent, rgba(66, 245, 197, 0.4), transparent);
  transition: 0.5s;
}

.neon-button:hover::before {
  left: 100%;
}
