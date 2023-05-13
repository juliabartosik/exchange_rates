import '../App.css';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, DropdownButton, Dropdown, Spinner } from "react-bootstrap";
import { Chart } from "react-google-charts";

function Historicalexchangerates () {
  const [data, setData] = useState(null);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const fetchExchangeRates = async () => {
    const response = await fetch(
      `http://api.nbp.pl/api/exchangerates/rates/A/${currency}/last/14/?format=json`
    );
    const data = await response.json();
    const chartData = [["Date", "Exchange Rate"]];
    data.rates.forEach((item) => {
      chartData.push([item.effectiveDate, item.mid]);
    });
    setData(chartData);
  };

  fetchExchangeRates();
    }, [currency]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <Container id="her" className="mt-5 spacer">
      <h1 className="mb-5">Currency Exchange Rates</h1>
      <Row className="align-items-center">
        <Col md={5} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Chose currency</Card.Title>
              <DropdownButton
                id="currency-dropdown"
                title="Select currency"
                onSelect={handleCurrencyChange}
                className='mx-auto'
                variant='secondary'
              >
                <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
                <Dropdown.Item eventKey="GBP">GBP</Dropdown.Item>
              </DropdownButton>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Card>
            <Card.Body>
              <Card.Title>{`${currency} Exchange Rates`}</Card.Title>
                {data ? (
                  <Chart
                    width={"100%"}
                    height={"400px"}
                    chartType="LineChart"
                    loader={<div>Loading Chart...</div>}
                    data={data}
                    options={{
                      chartArea: { width: "85%", height: "75%" },
                      hAxis: {
                        title: "Date",
                        format: "dd/MM/yy",
                        titleTextStyle: { italic: false },
                      },
                      vAxis: {
                        title: `Exchange Rate (${currency})`,
                        titleTextStyle: { italic: false },
                      },
                      legend: "none",
                    }}
                  />
                ) : (
                  <p>Data loading...
                    <br/>
                    <Spinner animation="border" role="status"></Spinner>
                  </p>
                )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Historicalexchangerates;