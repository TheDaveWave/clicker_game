import { useEffect } from "react";
import { useState } from "react";

function HomePage() {
  const [clicks, setClicks] = useState(0);
  const [count, setCount] = useState(0);
  const [points, setPoints] = useState(160);
  const [miliseconds, setMiliseconds] = useState(5000);
  const [multiplier, setMultiplier] = useState(1);
  const [upgrade, setUpgrade] = useState(false);
  const [upgradeTwo, setUpgradeTwo] = useState(false);
  const [upgradeThree, setUpgradeThree] = useState(false);

  let interval;

  const handleClick = () => {
    setClicks(clicks + multiplier);
    setCount(count + multiplier);
    console.log("clicks:", clicks);
    // since react state is update on the next render
    // and a point needs to be added every 10 clicks.
    // we check if the next count is 10 and add a point.
    // does not work if count is an odd number.
    if (clicks + multiplier === 10) {
      setClicks(0);
      setPoints(points + 1);
    }
  };

  const buyUpgrade = (id) => {
    switch (id) {
      case 1:
        setPoints(points - 10);
        setUpgrade(true);
        break;
      case 2:
        setPoints(points - 50);
        setMultiplier(2);
        setUpgradeTwo(true);
        break;
      case 3:
        setPoints(points - 100);
        setMiliseconds(4000);
        setUpgradeThree(true);
        break;
      default:
        console.log("Error upgrading or not enough points");
    }
  };

  const cancelUpgrade = (id) => {
    if (id === 1) {
      setPoints(points + 10);
      setUpgrade(false);
    }
    clearInterval(interval);
  };

  // the interval seems to reset on every click of the click button,
  // or when state is updated.
  useEffect(() => {
    // console.log("setting count", count);
    if (upgrade) {
      // create interval where every n seconds,
      // count is incremented by 1.
      interval = setInterval(() => handleClick(), miliseconds);
      // setInterval creates an interval id and this useEffect constructs and
      // then deconstructs the setInterval so it has a different Id everytime.
      // This means that using a loop to clear out multiple intervals may not be possible.
      // console.log(interval);
    }
    // cleanup function to clear the interval.
    // seems to have fixed bug where the setCount in interval was
    // grabbing the wrong instance of the count state.
    return () => clearInterval(interval);
  });

  return (
    <div>
      <h1>This is the game</h1>
      <p>Points: {points}</p>
      <p>Count: {count}</p>
      <button onClick={() => handleClick()}>Click Me!</button>
      <div>
        <h4>Upgrades</h4>
        <div>
          <p>Auto Clicker (Every 5s) | Cost: 10pts</p>
          {upgrade ? (
            <button onClick={() => cancelUpgrade(1)}>Stop</button>
          ) : (
            <button onClick={() => buyUpgrade(1)}>Buy</button>
          )}
          <p>Click Multiplier (x2) | Cost: 50pts</p>
          {upgradeTwo ? (
            <p>Bought</p>
          ) : (
            <button onClick={() => buyUpgrade(2)}>Buy</button>
          )}
          {(upgrade || upgradeThree) && (
            <>
              <p>Auto Click -1s | Cost: 100pts</p>
              {upgradeThree ? (
                <p>Bought</p>
              ) : (
                <button onClick={() => buyUpgrade(3)}>Buy</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
