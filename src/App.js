import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import config from './config.json';
import getCountryCodeByName from './shared/getCountryCodeByName';
import './styles.css';

const App = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState(null);
  const [timeData, setTimeData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTimeData(null);
    if (country) {
      try {
        const response = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${config.apiKey}&location=${country}`);
        setTimeData(response.data);
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Card className="blue-bg">
            <Card.Body>
              <h1 className="text-center mb-4 yellow-text">Chrono Guide</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label className="yellow-text">Country or city</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country or city"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="yellow-bg"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 yellow-bg">
                  Get current time
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          {timeData && (
            <Card className="blue-bg">
              <Card.Body>
                <h2 className="text-center mb-4 yellow-text">
                  Current time in {timeData.geo.city && timeData.geo.city + ", "} {timeData.geo.country + " "}
                  <img
                    src={`https://flagcdn.com/h20/${getCountryCodeByName(timeData.geo.country)}.png`}
                    alt={timeData.geo.country + " flag"}
                  />
                </h2>
                <p className="text-center yellow-text">{timeData.date_time_txt}</p>
              </Card.Body>
            </Card>
          )}
          {error && (
            <Card className="blue-bg">
              <Card.Body>
                <h2 className="text-center mb-4 yellow-text">Error</h2>
                <p className="text-center yellow-text">{error.message}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;