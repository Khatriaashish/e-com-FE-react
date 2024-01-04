// const HomePage = ()=>{
//     return (
//         <div>
//             <h1>Home Page</h1>
//             <h>Content</h>
//         </div>
//     )
// }

import React from "react";

class HomePage extends React.Component{
    constructor(props){
        super(props);
        //state create
        this.state = {          //!!! important for interviews
            title: null,
            content: null
        }
    }

    componentDidMount = ()=>{  //!!! important for interviews
        //API Call
        this.setState({
            ...this.state,
            title: "HomePage",
            content: "I am a dummy content"
        })
    }

    componentDidUpdate = ()=>{
        
    }

    render = ()=>{
        return (<div>
            <h1>{this.state.title}</h1>     {/* !!! important for interviews */}
            <div>{this.state.content}</div>
        </div>)
    }
}

export default HomePage;