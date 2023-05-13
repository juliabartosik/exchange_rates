import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";


const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A?format=json')
      .then(response => response.json())
      .then(data => {
        setCurrencies(data[0].rates);
        setFromCurrency(data[0].rates[0].code);
        setToCurrency(data[0].rates[1].code);
      })
      .catch(error => console.log(error));
  }, []);

  const convertCurrency = () => {
    fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${fromCurrency}/?format=json`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[0].mid;
        setConvertedAmount((amount * rate).toFixed(2));
      })
      .catch(error => console.log(error));
  };

  return (
    <Container id='cc'className="mt-5 margin-bottom spacer">
      <h1>Currency Converter</h1>
      <Row className="mt-3 align-items-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Currency Converter</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>From:</Form.Label>
                  <Form.Control as="select" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>{currency.currency}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>To:</Form.Label>
                  <Form.Control as="select" value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>{currency.currency}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </Form.Group>
                <br />
                <Button variant="secondary" onClick={convertCurrency}>Convert</Button>
              </Form></Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="mt-4">
            <Card.Body>
              <h4>Converted Amount:</h4>
              <h2>{convertedAmount} {toCurrency}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CurrencyConverter;
