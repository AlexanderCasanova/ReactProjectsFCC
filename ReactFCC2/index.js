
const initialice = `this is a paragraph
    **this is bolded text**
`;
const App = () => {

    const [markdown, setMarkdown] = React.useState(initialice)
    const changeTextarea = () => {
        setMarkdown(event.target.value)
    }
    marked.setOptions({
        gfm: true,
        breaks: true
      })
    const result = marked.parse(markdown)
    
    return (
        <div className="container p-5">
            <div className="row justify-content-center mb-4">
                <div style={{border:"2px solid #000"}} className="col-8 px-0">
                    <div style={{backgroundColor:"#1FA7A5",color:"#fff",fontSize:"14px"}} >
                        <h4 style={{marginBottom:"0px",padding:"3px"}}>Editor</h4>
                    </div>
                    <div>
                        <textarea className="form-control" style={{ minHeight: "300px" }} onChange={changeTextarea} value={markdown} type="text"></textarea>
                    </div>

                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div style={{border:"2px solid #000"}} className="col-10 px-0">
                    <div style={{backgroundColor:"#1FA7A5",color:"#fff",fontSize:"14px"}}>
                        <h4 style={{marginBottom:"0px",padding:"3px"}}>Previewer</h4>
                    </div>
                    <div className="preview"
                        dangerouslySetInnerHTML={{ __html: result } }
                    />
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))