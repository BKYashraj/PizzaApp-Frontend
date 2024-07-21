import { Container, Spinner } from "react-bootstrap";

const Loader = ({show}) => {
  return show && (
    <Container className='text-center p-5 text-black'>
      <Spinner size='lg'/>
    </Container>
  )
};

export default Loader;