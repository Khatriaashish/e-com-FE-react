export const HeadingComponent = ({type, value})=>{
    switch(type){
        case 'h1':
            return <h1>{value} </h1>
            break;
        case 'h2':
            return <h2>{value} </h2>
            break;
        case 'h3':
            return <h3>{value} </h3>
            break;
        case 'h4':
            return <h4>{value} </h4>
            break;
        case 'h5':
            return <h5>{value} </h5>
            break;
        case 'h6':
            return <h6>{value} </h6>
            break;
    }
}
