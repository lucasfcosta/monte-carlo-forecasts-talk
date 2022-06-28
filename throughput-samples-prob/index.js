const TOTAL_RUNS = 1_000_000;
const TOTAL_STORIES = 300;
const ALLOWED_TIME = 365;

const THROUGHPUT_SAMPLES = [1, 0, 3, 0, 2, 0, 0, 1, 1];

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const run = () => {
  let successes = 0;

  for (let i = 0; i < TOTAL_RUNS; i++) {
    let storiesCompleted = 0;

    for (let _ = 0; _ < ALLOWED_TIME; _++) {
      const throughputIndex = randomBetween(0, THROUGHPUT_SAMPLES.length - 1);
      storiesCompleted += THROUGHPUT_SAMPLES[throughputIndex];
    }

    if (storiesCompleted >= TOTAL_STORIES) {
      successes += 1;
    }
  }

  const p = (successes / TOTAL_RUNS) * 100;

  console.log(`Total Simulations: ${TOTAL_RUNS}`);
  console.log(`Successes: ${successes}`);
  console.log(`Probability of succeeding: ${p.toFixed(2)}%`);
};

run();
