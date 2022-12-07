import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const count = useSelector((store) => store.countReducer.count);
  const points = useSelector((store) => store.countReducer.points);
  const upgrades = useSelector((store) => store.upgrades);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: "ADD_CLICK",
    });
  };

  const buyUpgrade = (id) => {
    dispatch({
      type: "BUY_UPGRADE",
      payload: id,
    });
  };

  return (
    <div>
      <h1>This is the game</h1>
      <p>Points: {points}</p>
      <p>Count: {count}</p>
      <button onClick={() => handleClick()}>Click Me!</button>
      <div>
        <h4>Upgrades</h4>
        <div>
          <p>Auto Clicker (Every 1s) | Cost: 10pts</p>
          {upgrades.autoClicker.bought ? (
            <p>Bought</p>
          ) : (
            <button onClick={() => buyUpgrade(1)}>Buy</button>
          )}
          <p>
            Click Multiplier (x{upgrades.multiplier.value * 2}) | Cost:{" "}
            {upgrades.multiplier.cost}pts
          </p>
          <button onClick={() => buyUpgrade(2)}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
