import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import config from './config.json'

const App = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState(null);
  const [timeData, setTimeData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTimeData(null);
    if(country){
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
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Chrono Guide</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Country or city</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country or city"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Get current time
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          { timeData && (
            <Card>
              <Card.Body>
                  <h2 className="text-center mb-4">Current time in {timeData.geo.city && (timeData.geo.city + ", ")} {timeData.geo.country}</h2>
                  <p className="text-center">{timeData.date_time_txt}</p>
              </Card.Body>
            </Card>
          )}
          { error && (
            <Card>
              <Card.Body>
                  <h2 className="text-center mb-4">Error</h2>
                  <p className="text-center">{error.message}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;