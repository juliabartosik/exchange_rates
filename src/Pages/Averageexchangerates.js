import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap'


function Averageexchangerates () {
    const [table, setTable] = useState(null);
    const [publicationDate, setPublicationDate] = useState(null);

    useEffect(() => {
        const url = 'http://api.nbp.pl/api/exchangerates/tables/A?format=json';

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const table = data[0];
            setTable(table);

            const publicationDate = new Date(table.effectiveDate);
            setPublicationDate(publicationDate);
        });
    }, []);

    if (!table || !publicationDate) {
        return <p>Data loading...</p>;
    }
    
    return (
        <Container id="aer">
            <h2>Table of exchange rates of type A for the day {publicationDate.toLocaleDateString()}</h2>

            <Table>
                <thead>
                <tr>
                    <th>Currency code</th>
                    <th>Currency name</th>
                    <th>Average exchange rate</th>
                </tr>
                </thead>
                <tbody>
                {table.rates.map(rate => (
                    <tr key={rate.code}>
                    <td>{rate.code}</td>
                    <td>{rate.currency}</td>
                    <td>{rate.mid}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Averageexchangerates;