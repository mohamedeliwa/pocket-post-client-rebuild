import {useState} from 'react';
import CollectionCard from "./CollectionCard";
import CollectionContent from "./CollectionContent";

const Collections = (props) => {
    const [state, setState] = useState("list");
    const handleChange = (e) => {
        e.preventDefault();
        state === "list" ? setState("one") : setState("list");
    }
    const collections = props.collectionsList.map((collection) => {
      return <CollectionCard fn={handleChange} collection={collection} key={collection._id} />
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
// collection = {
//   likesCount: 0,
//   _id: '5f40312d9870d215383b92bb',
//   name: '1st series',
//   description: 'Hello world',
//   owner: '5f3bf5f54ceb7008a4684ce8',
//   createdAt: '2020-08-21T20:40:13.992Z',
//   updatedAt: '2020-08-21T20:40:13.992Z',
//   __v: 0
// }