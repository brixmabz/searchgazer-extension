window.saveDataAcrossSessions = true;

webgazer
  .setGazeListener((data, timestamp) => {
    if (data === null) return;
  })
  .begin();
