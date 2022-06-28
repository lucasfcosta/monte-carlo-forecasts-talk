const TOTAL_RUNS = 1_000_000;
const TOTAL_TASKS = 60;
const MAX_TASK_TIME = 10;
const MIN_TASK_TIME = 2;
const ALLOWED_TIME = 365;

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const run = () => {
  let successes = 0;

  for (let i = 0; i < TOTAL_RUNS; i++) {
    let currentDuration = 0;

    for (let _ = 0; _ < TOTAL_TASKS; _++) {
      currentDuration += randomBetween(MIN_TASK_TIME, MAX_TASK_TIME);
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
