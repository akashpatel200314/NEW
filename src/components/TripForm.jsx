import { Button, Card, Form } from 'react-bootstrap'

function TripForm({ trip, onTripChange, onSave }) {
  function handleChange(event) {
    const { name, value } = event.target
    onTripChange({
      ...trip,
      [name]: value,
    })
  }

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>Build a Trip</Card.Title>
        <Form onSubmit={onSave}>
          <Form.Group className="mb-3" controlId="destination">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              name="destination"
              value={trip.destination}
              onChange={handleChange}
              placeholder="Madison, WI"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="dates">
            <Form.Label>Dates</Form.Label>
            <Form.Control
              name="dates"
              value={trip.dates}
              onChange={handleChange}
              placeholder="May 10 - May 14"
            />
          </Form.Group>   


          <Button type="submit" variant="success">
            Save Draft
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TripForm
