import styled from "styled-components";

export const HeadingComponent = ({type, value, className})=>{
    switch(type){
        case 'h1':
            return <h1 className={`${className?className:""}`}>{value} </h1>
            break;
        case 'h2':
            return <h2 className={`${className?className:""}`}>{value} </h2>
            break;
        case 'h3':
            return <h3 className={`${className?className:""}`}>{value} </h3>
            break;
        case 'h4':
            return <h4 className={`${className?className:""}`}>{value} </h4>
            break;
        case 'h5':
            return <h5 className={`${className?className:""}`}>{value} </h5>
            break;
        case 'h6':
            return <h6 className={`${className?className:""}`}>{value} </h6>
            break;
    }
}

export const Title = styled.h1`
    color: #001900;
    text-align: center;
`

export const Divider = styled.hr`
    border-color: #001900;
`
