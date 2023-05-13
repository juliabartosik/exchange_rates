import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Chart } from "react-google-charts";


function GoldPrice() {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);

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
    };

    fetchCurrentPrice();
    fetchHistoricalData();
  }, []);

  return (
    <Container id="gp" className="mt-5">
      <h1 className="mb-5">Gold Price</h1>
      <Row>
        <Col md={5} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Current Price</Card.Title>
              {currentPrice ? (
                <h2 className="text-center">{currentPrice.toFixed(2)} PLN</h2>
              ) : (
                <p className="text-center">Loading...</p>
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
                  height={"450px"}
                  chartType="LineChart"
                  loader={<div>Loading Chart...</div>}
                  data={historicalData}
                  options={{
                    chartArea: { width: "80%", height: "70%" },
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
                <p className="text-center">Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GoldPrice;
