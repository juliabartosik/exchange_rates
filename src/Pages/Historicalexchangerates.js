import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Chart } from "react-google-charts";

function Historicalexchangerates () {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
        const response = await fetch(
            "http://api.nbp.pl/api/exchangerates/rates/A/USD/last/14/?format=json"
        );
        const data = await response.json();
        const chartData = [["Date", "Exchange Rate"]];
        data.rates.forEach((item) => {
            chartData.push([item.effectiveDate, item.mid]);
        });
        setData(chartData);
        };

        fetchExchangeRates();
    }, []);



    return (
        <Container id='her'className="mt-5">
        <h1 className="mb-5">Currency Exchange Rates</h1>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>USD Exchange Rates</Card.Title>
                {data ? (
                  <Chart
                    width={"100%"}
                    height={"400px"}
                    chartType="LineChart"
                    loader={<div>Loading Chart...</div>}
                    data={data}
                    options={{
                      chartArea: { width: "80%", height: "70%" },
                      hAxis: {
                        title: "Date",
                        format: "dd/MM/yy",
                        titleTextStyle: { italic: false },
                      },
                      vAxis: {
                        title: "Exchange Rate (PLN)",
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

export default Historicalexchangerates;