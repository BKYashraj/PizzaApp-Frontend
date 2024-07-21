import { Container, Spinner } from "react-bootstrap";

const Loader = ({ show }) => {
  return show && (
    <Container className='flex justify-center items-center p-5'>
      <Spinner animation="border" role="status" className="text-blue-500">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Loader;