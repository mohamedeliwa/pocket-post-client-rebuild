import React from "react";

const Author = (props) => {
  return (
    <div>
      <h1>Public Author Profile</h1>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  console.log(context.query);
  console.log(context.params);
  const data = "asd";

  // Pass data to the page via props
  return { props: { data } };
}

export default Author;
