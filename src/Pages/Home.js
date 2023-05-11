import '../App.css';
import { Container } from 'react-bootstrap';
import Averageexchangerates from './Averageexchangerates';
import GoldPrice from './Goldprice';
import Historicalexchangerates from './Historicalexchangerates';
import Currencyconverter from './Currencyconverter';

function Home() {
    return (
        <Container className='spacer'>

            <Averageexchangerates />
            <GoldPrice />
            <Historicalexchangerates />
            <Currencyconverter />
        </Container>
  );
}

export default Home;
