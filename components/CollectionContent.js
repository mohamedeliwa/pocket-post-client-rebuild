import {  Button } from "react-bootstrap";


const CollectionContent = (props) => {
    return (
        <div>
            Content of collection
            <Button onClick={props.fn}>Back</Button>
        </div>
    )
}

export default CollectionContent
