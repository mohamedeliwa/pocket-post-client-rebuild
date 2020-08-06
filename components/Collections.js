import {useState} from 'react';
import CollectionCard from "./CollectionCard";
import CollectionContent from "./CollectionContent";

const Collections = (props) => {
    const [state, setState] = useState("list");
    const handleChange = (e) => {
        e.preventDefault();
        state === "list" ? setState("one") : setState("list");
    }
    const collections = props.collectionsList.map((collection, index) => {
      return <CollectionCard fn={handleChange} collection={collection} key={index} />
    })
  return state === "list" ?  (
    <div>
        {collections}
    </div>
  ) : (
      <CollectionContent fn={handleChange}/>
  );
};

export default Collections;
