import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const count = useSelector((store) => store.countReducer);
  const points = useSelector((store) => store.pointReducer);

  const dispatch = useDispatch();

  const [clicks, setClicks] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [multiplier, setMultiplier] = useState(1);
  const [upgrade, setUpgrade] = useState(false);
  const [upgradeTwo, setUpgradeTwo] = useState(false);
  const [upgradeThree, setUpgradeThree] = useState(false);

  const [time, setTime] = useState(seconds);
  const [timeVal, setTimeVal] = useState(0);

  let timer;

  const handleClick = () => {
    setClicks(clicks + multiplier);
    dispatch({
      type: "INCREMENT_COUNT",
      payload: multiplier,
    });
    if (clicks + multiplier >= 10) {
      setClicks(0);
      dispatch({
        type: "INCREMENT_POINTS",
      });
    }
  };

  const buyUpgrade = (id) => {
    switch (id) {
      case 1:
        if (points < 10) {
          break;
        }
        dispatch({
          type: "REDUCE_POINTS",
          payload: 10,
        });
        setUpgrade(true);
        break;
      case 2:
        if (points < 50) {
          break;
        }
        dispatch({
          type: "REDUCE_POINTS",
          payload: 50,
        });
        setMultiplier(2);
        setUpgradeTwo(true);
        break;
      case 3:
        if (points < 100) {
          break;
        }
        dispatch({
          type: "REDUCE_POINTS",
          payload: 100,
        });
        setSeconds(4);
        setUpgradeThree(true);
        break;
      default:
        console.log("Error upgrading or not enough points");
    }
  };

  const cancelUpgrade = (id) => {
    if (id === 1) {
      console.log("canceled");
      // setPoints(points + 10);
      setUpgrade(false);
    }
    return clearInterval(timer);
  };

  // dispatch to count saga to 
  // run intervalCount
  const runAutoClicker = () => {
    dispatch({
      type: "AUTO_CLICKER",
      payload: multiplier,
    });
  };

  const checkInterval = () => {
    if (upgrade) {
      // create timer where every n seconds,
      // count is incremented by 1.
      /* timer =
        !timer &&
        setInterval(() => {
          setTimeVal(timeVal + 1);
          // console.log(timeVal);
          if (timeVal === 1000) {
            setTimeVal(0);
            if (time === 1) {
              handleClick();
              setTime(seconds + 1);
            }
            setTime((prevTime) => prevTime - 1);
          }
        }, 1); */
      // setInterval creates an interval id and this useEffect constructs and
      // then deconstructs the setInterval so it has a different Id everytime.
      // This means that using a loop to clear out multiple intervals may not be possible.
      // console.log(timer);
    }
  };

  // the interval seems to reset on every click of the click button,
  // or when state is updated.
  /* useEffect(() => {
    // console.log("setting count", count);
    checkInterval();
    // cleanup function to clear the interval.
    // seems to have fixed bug where the setCount in interval was
    // grabbing the wrong instance of the count state.
    // return () => {
    //   clearInterval(timer);
    // };
  }); */
  // does count and upgrade need to be in the dependencies?

  return (
    <div>
      <h1>This is the game</h1>
      <p>Points: {points}</p>
      {upgrade && <p>Timer: {time}s</p>}
      <p>Count: {count}</p>
      <button onClick={() => handleClick()}>Click Me!</button>
      <div>
        <h4>Upgrades</h4>
        <div>
          <p>Auto Clicker (Every {seconds}s) | Cost: 10pts</p>
          {upgrade ? (
            <button onClick={() => cancelUpgrade(1)}>Stop</button>
          ) : (
            // <button onClick={() => buyUpgrade(1)}>Buy</button>
            <button onClick={() => runAutoClicker()}>Buy</button>
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
