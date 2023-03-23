import confetti from 'canvas-confetti';

const count = 200;
const defaults = {
  scalar: 1.3,
  spread: 70,
  origin: {
    y: 1,
    x: 0.55,
  },
  zIndex: 999999,
};
function fire(particleRatio: number, opts: confetti.Options) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    }),
  );
}

export const fireConfetti = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
