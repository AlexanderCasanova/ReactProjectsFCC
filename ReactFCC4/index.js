const calculatorButtons = [
    {
        id: "button-AC",
        class: "button",
        value: "AC"
    }, {
        id: "button-divide",
        class: "button",
        value: "/"
    },
    {
        id: "button-multiply",
        class: "button",
        value: "*"
    },

    {
        id: "button-7",
        class: "button",
        value: "7"
    },
    {
        id: "button-8",
        class: "button",
        value: "8"
    },
    {
        id: "button-9",
        class: "button",
        value: "9"
    },
    {
        id: "button-subtract",
        class: "button",
        value: "-"
    },
    {
        id: "button-4",
        class: "button",
        value: "4"
    },
    {
        id: "button-5",
        class: "button",
        value: "5"
    },
    {
        id: "button-6",
        class: "button",
        value: "6"
    },
    {
        id: "button-add",
        class: "button",
        value: "+"
    }, {
        id: "button-1",
        class: "button",
        value: "1"
    },
    {
        id: "button-2",
        class: "button",
        value: "2"
    },
    {
        id: "button-3",
        class: "button",
        value: "3"
    },
    {
        id: "button-equals",
        class: "button",
        value: "="
    },
    {
        id: "button-0",
        class: "button",
        value: "0"
    }, {
        id: "button-dot",
        class: "button",
        value: "."
    }
];

const App = () => {
    const [result, setResult] = React.useState("0");
    const [formula, setFormula] = React.useState("");
    const [sumaAux, setSumaAux] = React.useState(0)
    return (
        <>
            <div className="screenDiv">{formula}</div>
            <div className="screenDiv">{result}</div>
            <ButtonsCalulator resultChange={setResult} formulaChange={setFormula} setSumaAux={setSumaAux} sumaAux={sumaAux} />
        </>
    );
};

const ButtonsCalulator = (props) => {
    const handleButtonClick = (value) => {
        props.formulaChange((prevFormula) => {
            if (["+", "-", "/", "*"].some((item) => item == value)) {
                return prevFormula.includes("=") ? props.sumaAux : prevFormula
            } else {
                if (prevFormula.includes("=")) {
                    props.resultChange("")
                }
                return prevFormula.includes("=") ? "" : prevFormula
            }

        })
        switch (value) {
            case "AC":
                props.formulaChange("");
                props.resultChange("0")
                props.setSumaAux(0)
                return;
            case "+":
            case "-":
            case "/":
            case "*":
                props.resultChange("");
                break;
            case "=":
                let res = 0
                props.formulaChange((prevFormula) => {
                    res = eval(prevFormula)
                    props.resultChange(res);
                    props.setSumaAux(res);
                    return prevFormula + value + res
                })
                return;
            default:
                break;
        }

        props.formulaChange((prevFormula) => prevFormula + value);
        props.resultChange((prevResult) => ["0", "+", "-", "/", "*"].some((item) => prevResult == item) ? value : prevResult + value)
    };

    return (
        <div className="buttons-container">
            {calculatorButtons.map((item) => (
                <button key={item.id} id={item.id} value={item.value} onClick={() => handleButtonClick(item.value)}>
                    {item.value}
                </button>
            ))}
        </div>
    );
};


ReactDOM.render(<App />, document.getElementById("root"));
