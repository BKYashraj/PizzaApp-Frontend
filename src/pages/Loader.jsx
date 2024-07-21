import { Container} from "react-bootstrap";

const Loader = ({show}) => {
  return show && (
    <Container className='text-center p-5 text-black'>
      <h1>Loading....</h1>
    </Container>
  )
};

export default Loader;