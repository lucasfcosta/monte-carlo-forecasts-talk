const TOTAL_RUNS = 1_000_000;
const TOTAL_TASKS = 60;
const ALLOWED_TIME = 365;

const TASK_TIMES = [9, 2, 4, 8, 3, 10, 5, 3, 10];

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const run = () => {
  let successes = 0;

  for (let i = 0; i < TOTAL_RUNS; i++) {
    let currentDuration = 0;

    for (let _ = 0; _ < TOTAL_TASKS; _++) {
      const durationIndex = randomBetween(0, TASK_TIMES.length - 1);
      currentDuration += TASK_TIMES[durationIndex];
    }

    if (currentDuration <= ALLOWED_TIME) {
      successes += 1;
    }
  }

  const p = (successes / TOTAL_RUNS) * 100;

  console.log(`Total Simulations: ${TOTAL_RUNS}`);
  console.log(`Successes: ${successes}`);
  console.log(`Probability of succeeding: ${p.toFixed(2)}%`);
};

run();
