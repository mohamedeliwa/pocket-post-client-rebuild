import { Pagination, Container } from "react-bootstrap";

export default () => {
  return (

      <Pagination className=" justify-content-center mb-4">
        <Pagination.Item className="page-item">
          
            &larr; Older
         
        </Pagination.Item>
        <Pagination.Item className="page-item disabled">
          
            Newer &rarr;
          
        </Pagination.Item>
      </Pagination>
 
  );
};
