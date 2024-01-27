const App =()=>{
    const [quotes,setQuotes]=React.useState([]);
    const [randomQuotes,setRandomQuotes]=React.useState([]);
    const [color,setColor]=React.useState(["#27AE60"]);
    React.useEffect(()=>{
      async function fetchData(){
        const response= await fetch("https://type.fit/api/quotes")
        const data= await response.json()
        setQuotes(data)
        let randIndex=Math.floor(Math.random()*data.length)
        setRandomQuotes(data[randIndex])
      }
      fetchData();
    },[])
    
    const getNewQuote=()=>{
      
      const colors=[
        "#16A085",
        "#27AE60",
        "#2E3C58",
        "#F39C12",
        "#E74C3C",
        "#9B59B6",
        "#FB6964",
        "#342224"
      ]
      
      let randIndex=Math.floor(Math.random()*quotes.length)
      let randColorIndex=Math.floor(Math.random()*colors.length)
      setRandomQuotes(quotes[randIndex])
      setColor(colors[randColorIndex])
    }
    
    return (
      <div style={{backgroundColor:color,minHeight:"100vh"}}>
      <div className="container pt-5">
        <div className="jumbotron">
          <div className="card">
            <div className="card-header">Quotes</div>
            <div className="card-body">
              {
                randomQuotes?(
                  <>
                    <h5 className="card-title">{randomQuotes.author || "No author..."}</h5>
                    <p className="card-text">"{randomQuotes.text}"</p>
                  </>
                ):(<h2>Loading...</h2>)
              }
              <div className="col">
                <button onClick={getNewQuote} className="btn btn-primary">new Quote</button>
                <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="+ encodeURIComponent('"'+randomQuotes.text+'" '+randomQuotes.author)}className="btn btn-warning mx-1">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="" className="btn btn-danger">
                  <i className="fa fa-tumblr"></i>
                </a>
              </div>
            </div>
          </div>
         </div>
      </div></div>
    )
  }
  
  ReactDOM.render(<App />,document.getElementById("root"))