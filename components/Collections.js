import Link from "next/link";
import {useState} from 'react';
import {  Breadcrumb } from "react-bootstrap";
import CollectionCard from "./CollectionCard";
import CollectionContent from "./CollectionContent";

const Collections = () => {
    const [state, setState] = useState("list");
    const handleChange = (e) => {
        e.preventDefault();
        state=== "list" ? setState("one") : setState("list");
    }
    
  return state === "list" ?  (
    <div>
        <CollectionCard fn={handleChange}/>
        <CollectionCard  fn={handleChange}/>
        <CollectionCard  fn={handleChange}/>
    </div>
  ) : (
      <CollectionContent fn={handleChange}/>
  );
};

export default Collections;
