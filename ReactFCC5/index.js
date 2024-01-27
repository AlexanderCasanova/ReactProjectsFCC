
const buzzURL = "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"

function convertirEnteroATime(minutos, segundos) {
    const min = String(minutos).padStart(2, '0');
    const seg = String(segundos).padStart(2, '0');
    return `${min}:${seg}`;
}

const App = () => {
    const [breakLen, setBreakLen] = React.useState(5)
    const [sessionLen, setSessionLen] = React.useState(25)
    const [timeLabel, setTimeLabel] = React.useState("Session")
    const [timerMin, setTimerMin] = React.useState(sessionLen)
    const [timerSec, setTimerSec] = React.useState(0)
    const [on, setOn] = React.useState(false)


    React.useEffect(() => {
        if (on) {
            let interval = setInterval(() => {
                setTimerSec((prevState) => {
                    if(prevState==0){
                        setTimerMin((prevState)=>prevState-1)
                        return 59
                    }else{
                        return prevState - 1
                        }})
                if (timerMin == 0 && timerSec == 0) {
                    const buzz= new Audio(buzzURL)
                    buzz.play()
                    setTimeLabel((prevState) => {
                        setTimerMin(prevState == "Session" ? breakLen : sessionLen)
                        setTimerSec(0)
                        return prevState == "Session" ? "Break" : "Session"
                    })
                }
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timerMin, timerSec, on])

    return (
        <>
            <div className="title">25 + 5 Clock</div>
            <div className="controls">
                <div className="controls-box">
                    <div className="controls-title">
                        <div id="break-label">Break Length</div>
                    </div>
                    <div className="controls-actions">
                        <button id="break-decrement" onClick={() => {
                            if (!on) {
                                setBreakLen((prevState) => {

                                    let newState = prevState == 1 ? prevState : prevState - 1
                                    if (timeLabel == "Break") {
                                        setTimerMin(newState)
                                        setTimerSec(0)
                                    }
                                    return newState
                                })
                            }
                        }}>
                            <i class="fa fa-arrow-down fa-2x"></i>
                        </button>
                        <div id="break-length" >{breakLen}</div>
                        <button id="break-increment" onClick={() => {
                            if (!on) {
                                setBreakLen((prevState) => {
                                    let newState = prevState == 60 ? prevState : prevState + 1
                                    if (timeLabel == "Break") {
                                        setTimerMin(newState)
                                        setTimerSec(0)
                                    }
                                    return newState
                                })
                            }
                        }}>
                            <i class="fa fa-arrow-up fa-2x"></i>
                        </button>
                    </div>
                </div>
                <div className="controls-box">
                    <div className="controls-title">
                        <div id="session-label">Session Length</div>
                    </div>
                    <div className="controls-actions">
                        <button id="session-decrement" onClick={() => {
                            if (!on) {
                                setSessionLen((prevState) => {
                                    let newState = prevState == 1 ? prevState : prevState - 1
                                    if (timeLabel == "Session") {
                                        setTimerMin(newState)
                                        setTimerSec(0)
                                    }
                                    return newState
                                })
                            }
                        }}>
                            <i class="fa fa-arrow-down fa-2x"></i>
                        </button>
                        <div id="session-length" >{sessionLen}</div>
                        <button id="session-increment" onClick={() => {
                            if (!on) {
                                setSessionLen((prevState) => {
                                    let newState = prevState == 60 ? prevState : prevState + 1
                                    if (timeLabel == "Session") {
                                        setTimerMin(newState)
                                        setTimerSec(0)
                                    }
                                    return newState
                                })
                            }
                        }}>
                            <i class="fa fa-arrow-up fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="timer-box">
                <div id="timer-label">{timeLabel}</div>
                <div id="time-left">{convertirEnteroATime(timerMin, timerSec)}</div>
            </div>
            <div className="controlTimer">
                <button id="start_stop" onClick={() => {
                    setOn((prevState) => !prevState)
                }}>
                    <i class="fa fa-play fa-2x"></i>
                    <i class="fa fa-pause fa-2x"></i>
                </button>
                <button id="reset" onClick={() => {
                    setTimeLabel("Session")
                    setSessionLen(25)
                    setBreakLen(5)
                    setTimerMin(25)
                    setTimerSec(0)
                }}>
                    <i class="fa fa-refresh fa-2x"></i>
                </button>
            </div>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))