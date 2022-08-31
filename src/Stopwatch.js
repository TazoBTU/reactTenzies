function Stopwatch({time}) {

    /*
    The time is calculated by dividing the time by the number of milliseconds for each unit of time.
    We then use the remainder operator % to calculate if the time is divisible by 60 for seconds, 60 for minutes and, 100 for milliseconds. For example 1 minute 20 seconds is 80000 milliseconds so to calculate the seconds
    we do (80000 / 1000) % 60 = 20. Without the remainder operator (80000 / 1000) = 80 we just get the total seconds.
    */

    return (
        <div className="time-count">
            <p>Time:
                <span> {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </p>
        </div>
     );
}

export default Stopwatch;