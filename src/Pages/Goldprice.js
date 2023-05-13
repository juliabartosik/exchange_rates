import '../App.css';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Chart } from "react-google-charts";


function GoldPrice() {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [lowestPrice, setLowestPrice] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);

  useEffect(() => {
    const fetchCurrentPrice = async () => {
      const response = await fetch(
        "http://api.nbp.pl/api/cenyzlota?format=json"
      );
      const data = await response.json();
      setCurrentPrice(data[0].cena);
    };

    const fetchHistoricalData = async () => {
      const response = await fetch(
        "http://api.nbp.pl/api/cenyzlota/last/30/?format=json"
      );
      const data = await response.json();
      const chartData = [["Date", "Price"]];
      data.forEach((item) => {
        chartData.push([item.data, item.cena]);
      });
      setHistoricalData(chartData);
      const prices = data.map(item => item.cena);
      const lowest = prices.reduce((a, b) => Math.min(a, b));
      const highest = prices.reduce((a, b) => Math.max(a, b));
      setLowestPrice(lowest);
      setHighestPrice(highest);
    };

    fetchCurrentPrice();
    fetchHistoricalData();
  }, []);

  return (
    <Container id="gp" className="mt-5 spacer">
      <h1 className="mb-5">Gold Price</h1>
      <Row  className="align-items-center">
        <Col md={5} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Current Price</Card.Title>
              {currentPrice ? (
                <h2 className="text-center">{currentPrice.toFixed(2)} PLN</h2>
              ) : (
                <p>Data loading...
                  <br/>
                  <Spinner animation="border" role="status"></Spinner>
                </p>
              )}
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Lowest and Highest Price (Last 30 days)</Card.Title>
              {lowestPrice && highestPrice ? (
                <>
                  <h5 className="text-center lowest-price">Lowest: {lowestPrice.toFixed(2)} PLN</h5>
                  <h5 className="text-center highest-price">Highest: {highestPrice.toFixed(2)} PL</h5>

                </>
              ) : (
                <p>Data loading...
                  <br/>
                  <Spinner animation="border" role="status"></Spinner>
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Historical Prices</Card.Title>
              {historicalData ? (
                <Chart
                  width={"100%"}
                  height={"400px"}
                  chartType="LineChart"
                  loader={<div>Loading Chart...</div>}
                  data={historicalData}
                  options={{
                    chartArea: { width: "80%", height: "65%" },
                    hAxis: {
                      title: "Date",
                      format: "dd/MM/yy",
                      titleTextStyle: { italic: false },
                    },
                    vAxis: {
                      title: "Price (PLN)",
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

export default GoldPrice;
