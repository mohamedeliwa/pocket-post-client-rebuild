import {useState} from 'react';
import CollectionCard from "./CollectionCard";
import CollectionContent from "./CollectionContent";
import EmptySection from './EmptySection';

const Collections = (props) => {
    const [state, setState] = useState("list");
    const [focusedCollection, setFocusedCollection] = useState({
      id: ""
    })
    const handleChange = (e) => {
        e.preventDefault();
        setFocusedCollection({
          id: e.target.id
        })
        state === "list" ? setState("one") : setState("list");
    }
    const collections = props.collectionsList.map((collection) => {
      return <CollectionCard fn={handleChange} collection={collection} key={collection._id} />
    })
  return state === "list" ?  (
    <div>
        {collections.length === 0 ? <EmptySection /> : collections}
    </div>
  ) : (
      <CollectionContent fn={handleChange} collection={focusedCollection}/>
  );
};

export default Collections;
