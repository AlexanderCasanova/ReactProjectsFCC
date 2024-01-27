
const audioclips = [{
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}]
const audioclips_2 = [{
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}]
const buttons = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
const App = () => {

    const [audios, setAudios] = React.useState(audioclips)
    const [encendido, setEncendido] = React.useState(false)
    const [position, setPosition] = React.useState("div-izq")
    const [position2, setPosition2] = React.useState("div-izq")
    const [idAudio,setIdAudio]= React.useState("")
    const [volumen,setVolumen]= React.useState(0.5)

        const handleVolumenChange = (event) => {
            setVolumen(event.target.value);
            setIdAudio("Volumen: "+event.target.value)
            setTimeout(()=>setIdAudio(""),500)
        };

    return (
        <div id="drum-machine">
            <ButtonSounds soundList={audios} encendido={encendido} setIdAudio={setIdAudio} volumen={volumen}/>
            <div className="controls">
                <div className="control">
                    <p>Power</p>
                    <div className="select">
                        <div id="powerDiv" className={position} onClick={() => {
                            setPosition((prevClass) => (prevClass === "div-izq" ? "div-rig" : "div-izq"))
                            setEncendido(!encendido)
                            setIdAudio("")
                        }}></div>
                    </div>
                </div>
                <p id="display">{idAudio}</p>
                <div class="volume-slider">
                    <input max="1" min="0" step="0.01" type="range" value={volumen} onChange={handleVolumenChange} disabled={!encendido}/>
                </div>
                <div className="control">
                    <p>Bank</p>
                    <div className="select">
                        <div id="bankDiv" className={position2} onClick={() => {
                            setPosition2((prevClass) => (prevClass === "div-izq" ? "div-rig" : "div-izq"))
                            setAudios((prevAudios) => (prevAudios === audioclips ? audioclips_2 : audioclips));
                        }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ButtonSounds = (props) => {
    const audioElements = React.useRef({});

    const handleButtonClick = (element) => {
        const audioElement = audioElements.current[element.keyTrigger];
        props.setIdAudio(element.id)
        if (audioElement) {
            audioElement.volume=props.volumen
            audioElement.play();
        }
    };

    return (
        <div className="buttons">
            {props.encendido ? 
                props.soundList.map((element) => (
                    <div key={element.keyTrigger} className="drum-pad" onClick={() => handleButtonClick(element)}>
                        {element.keyTrigger}
                        <audio ref={(audio) =>
                            audioElements.current[element.keyTrigger] = audio
                        } src={element.url} />
                    </div>
                )): buttons.map((element) => (
                    <div key={element} className="drum-pad" >
                        {element}
                    </div>
                ))}
        </div>
    );
};



ReactDOM.render(<App />, document.getElementById("root"))