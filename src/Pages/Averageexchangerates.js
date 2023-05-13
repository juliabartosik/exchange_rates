import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function Averageexchangerates() {
  const [table, setTable] = useState(null);
  const [publicationDate, setPublicationDate] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    const url = 'http://api.nbp.pl/api/exchangerates/tables/A?format=json';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const table = data[0];
        setTable(table);

        const publicationDate = new Date(table.effectiveDate);
        setPublicationDate(publicationDate);
      });
  }, []);

  const handleSort = (type) => {
    let sortedRates;
    if (type === 'mid') {
      sortedRates = table.rates.sort((a, b) =>
        sortOrder === 'asc' ? a.mid - b.mid : b.mid - a.mid
      );
    } else {
      sortedRates = table.rates.sort((a, b) =>
        sortOrder === 'asc'
          ? a.currency.localeCompare(b.currency)
          : b.currency.localeCompare(a.currency)
      );
    }
    setTable({ ...table, rates: sortedRates });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortType(type);
  };

  if (!table || !publicationDate) {
    return (
      <p>
        Data loading...
        <br />
        <Spinner animation='border' role='status'></Spinner>
      </p>
    );
  }

  return (
    <Container id='aer' className='spacer'>
      <h2>
        Table of exchange rates of type A for the day{' '}
        {publicationDate.toLocaleDateString()}
      </h2>

      <Table>
        <thead>
          <tr>
            <th>Currency code</th>
            <th>
              Currency name{' '}
              <Button
                onClick={() => handleSort('currency')}
                variant='secondary'
                active={sortType === 'currency'}
              >
                {sortType === 'currency' && sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faSortDown} />
                ) : (
                  <FontAwesomeIcon icon={faSortUp} />
                )}
              </Button>
            </th>
            <th>
              Average exchange rate{' '}
              <Button
                onClick={() => handleSort('mid')}
                variant='secondary'
                active={sortType === 'mid'}
              >
                {sortType === 'mid' && sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faSortDown} />
                ) : (
                  <FontAwesomeIcon icon={faSortUp} />
                )}
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rates.map((rate) => (
            <tr key={rate.code}>
              <td>{rate.code}</td>
              <td>{rate.currency}</td>
              <td>{rate.mid.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
            </Table>
        </Container>
    );
}

export default Averageexchangerates;
