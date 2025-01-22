import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    productType: "",
    loanTerm: "",
    loanAmount: "",
    secured: "",
    coApplicant: "",
    creditScore: "",
    residency: "",
    citizenshipStatus: "",
    visaSubclass: "",
    visaTimeLeft: "",
    age: "",
    loanPurpose: "",
    repaymentFrequency: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const features = Object.values(formData).map(Number);

    try {
      const response = await fetch("https://stoik-api.onrender.com/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features }),
      });

      if (!response.ok) throw new Error("Failed to fetch prediction");

      const data = await response.json();
      setPrediction(data.predicted_interest_rate);
      setError(null);
    } catch (err) {
      setError("Error fetching prediction. Please try again.");
      setPrediction(null);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center">
              <h2 className="mb-0">STOIK Loan Prediction Calculator</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Product Type</Form.Label>
                      <Form.Select name="productType" value={formData.productType} onChange={handleChange} required>
                        <option value="">Select Product Type</option>
                        <option value="0">Unsecured</option>
                        <option value="1">Secured</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Loan Term (Months)</Form.Label>
                      <Form.Control
                        type="number"
                        name="loanTerm"
                        value={formData.loanTerm}
                        onChange={handleChange}
                        placeholder="E.g., 60"
                        min="12"
                        max="84"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Loan Amount ($)</Form.Label>
                      <Form.Control
                        type="number"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        placeholder="E.g., 20000"
                        min="1000"
                        max="500000"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Credit Score</Form.Label>
                      <Form.Control
                        type="number"
                        name="creditScore"
                        value={formData.creditScore}
                        onChange={handleChange}
                        placeholder="E.g., 750"
                        min="300"
                        max="850"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Secured</Form.Label>
                      <Form.Select name="secured" value={formData.secured} onChange={handleChange} required>
                        <option value="">Select Option</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Co-Applicant</Form.Label>
                      <Form.Select name="coApplicant" value={formData.coApplicant} onChange={handleChange} required>
                        <option value="">Select Option</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Residency</Form.Label>
                      <Form.Select name="residency" value={formData.residency} onChange={handleChange} required>
                        <option value="">Select Residency</option>
                        <option value="0">Resident</option>
                        <option value="1">Non-Resident</option>
                        <option value="2">Permanent Resident</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Citizenship Status</Form.Label>
                      <Form.Select name="citizenshipStatus" value={formData.citizenshipStatus} onChange={handleChange} required>
                        <option value="">Select Citizenship</option>
                        <option value="0">Non-Citizen</option>
                        <option value="1">Citizen</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="E.g., 30"
                        min="18"
                        max="75"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Visa Subclass</Form.Label>
                      <Form.Control
                        type="number"
                        name="visaSubclass"
                        value={formData.visaSubclass}
                        onChange={handleChange}
                        placeholder="E.g., 75"
                        min="0"
                        max="100"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Label>Visa Time Left (Months)</Form.Label>
                      <Form.Control
                        type="number"
                        name="visaTimeLeft"
                        value={formData.visaTimeLeft}
                        onChange={handleChange}
                        placeholder="E.g., 12"
                        min="0"
                        max="36"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100">
                  Get Interest Rate
                </Button>
              </Form>

              {prediction && <Alert variant="success" className="mt-4">Predicted Interest Rate: {prediction}%</Alert>}
              {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoanForm;
