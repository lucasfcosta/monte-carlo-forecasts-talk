const fs = require("fs");
const path = require("path");
const { DateTime, Duration } = require("luxon");
const ProgressBar = require("progress");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const TOTAL_RUNS = 100_000;
const TOTAL_STORIES = 50;

const THROUGHPUT_SAMPLES = [1, 0, 3, 0, 2, 0, 0, 1, 1];

const PROJECT_START = DateTime.now();
const ONE_DAY = Duration.fromObject({ days: 1 });

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const run = () => {
  console.log("Starting simulation...");
  const progress = new ProgressBar("[:bar] :percent [ETA: :etas]", {
    total: TOTAL_RUNS,
    width: 50,
  });
  const outcomes = {};

  for (let i = 0; i < TOTAL_RUNS; i++) {
    progress.tick();
    let storiesCompleted = 0;
    let currentDate = PROJECT_START;

    while (storiesCompleted < TOTAL_STORIES) {
      const throughputIndex = randomBetween(0, THROUGHPUT_SAMPLES.length - 1);
      storiesCompleted += THROUGHPUT_SAMPLES[throughputIndex];
      currentDate = currentDate.plus(ONE_DAY);
    }

    const outcomeKey = currentDate.toFormat("yyyy-MM-dd");
    outcomes[outcomeKey] = (outcomes[outcomeKey] || 0) + 1;
  }

  plotHistogram(outcomes);
};

const plotHistogram = async (outcomes) => {
  const width = 900;
  const height = 900;
  const backgroundColour = "white";
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColour,
  });

  const sortedDates = Object.keys(outcomes).sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  const configuration = {
    type: "bar",
    data: {
      labels: sortedDates,
      datasets: [
        {
          label: "Simulation Result Count",
          data: sortedDates.map((d) => outcomes[d]),
          backgroundColor: "blue",
        },
      ],
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Completion Date" } },
        y: { title: { display: true, text: "Result Count" } },
      },
    },
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync(path.join(__dirname, "..", "histogram.png"), image, {
    encoding: "binary",
  });
  console.log("Finished!");
};

run();
