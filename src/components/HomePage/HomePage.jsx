import { useEffect } from "react";
import { useState } from "react";

function HomePage() {
    const [count, setCount] = useState(0);
    const [points, setPoints] = useState(10);
    const [multiplier, setMultiplier] = useState(1);
    const [upgrade, setUpgrade] = useState(false);

    const handleClick = () => {
        setCount(count + multiplier);
        if((count + 1)%10 === 0 && count !== 0) {
            setPoints(points + 1);
        }
    }

    const buyUpgrade = (id) => {
        if(id === 1){
            setPoints(points - 10);
            setUpgrade(true);
        }
    }

    useEffect(() => {
        let interval;
        if(upgrade) {
            interval = setInterval(() => handleClick(), 5000);
        } else {
            clearInterval(interval);
        }
    });

    return (
        <div>
            <h1>This is the home page</h1>
            <p>Points: {points}</p>
            <p>Clicks: {count}</p>
            <button onClick={() => handleClick()}>Click Me!</button>
            <div>
                <h4>Upgrades</h4>
                <div>
                    <p>Auto Click Every 5 Seconds: 10 points</p>
                    <button onClick={() => buyUpgrade(1)}>Buy</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;