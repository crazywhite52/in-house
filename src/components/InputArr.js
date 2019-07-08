import React from "react"
import CatInputs from "./CatInputs"
class InputArr extends React.Component {
  state = {
    cats: [{name:"", age:""}]
  }
handleChange = (e) => {
    if (["name", "age"].includes(e.target.className) ) {
      let cats = [...this.state.cats]
      cats[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ cats }, () => console.log(this.state.cats))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }
addCat = (e) => {
    this.setState((prevState) => ({
      cats: [...prevState.cats, {name:"1", age:"2"}],
    }));
  }
handleSubmit = (e) => { e.preventDefault() 

console.log(this.state);
}
render() {
    let {cats} = this.state
    return (
        <div>
        <br/>
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        <button onClick={this.addCat}>Add new cat </button>
        <CatInputs cats={cats} />
        <input type="submit" value="Submit" /> 
      </form>
      </div>
    )
  }
}
export default InputArr