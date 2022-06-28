const TOTAL_ROLLS = 1_000_000;

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const run = () => {
  let sevens = 0;

  for (let i = 0; i < TOTAL_ROLLS; i++) {
    const firstDie = randomBetween(1, 6);
    const secondDie = randomBetween(1, 6);
    if (firstDie + secondDie == 7) {
      sevens++;
    }
  }

  const p = (sevens / TOTAL_ROLLS) * 100;

  console.log(`Total Rolls: ${TOTAL_ROLLS}`);
  console.log(`Total Sevens: ${sevens}`);
  console.log(`Probability of rolling a seven: ${p.toFixed(2)}%`);
};

run();
