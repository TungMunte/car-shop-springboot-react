import Pagination from "react-bootstrap/Pagination";

function FooterComponent() {
  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
}

export default FooterComponent;
