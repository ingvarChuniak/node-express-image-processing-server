const { workerData, parentPort } = require("worker_threads");
const gm = require("gm");

gm(workerData.source)
  .monochrome()
  .write(workerData.destination, function (err) {
    if (err) {
      throw err;
    }
    parentPort.postMessage({ monochrome: true });
  });
