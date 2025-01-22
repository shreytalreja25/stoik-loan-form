import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

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
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Loan Interest Prediction</h2>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Product Type</Form.Label>
              <Form.Select name="productType" value={formData.productType} onChange={handleChange} required>
                <option value="">Select Product Type</option>
                <option value="0">Unsecured</option>
                <option value="1">Secured</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>Secured</Form.Label>
              <Form.Select name="secured" value={formData.secured} onChange={handleChange} required>
                <option value="">Select Option</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Co-Applicant</Form.Label>
              <Form.Select name="coApplicant" value={formData.coApplicant} onChange={handleChange} required>
                <option value="">Select Option</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>Residency</Form.Label>
              <Form.Select name="residency" value={formData.residency} onChange={handleChange} required>
                <option value="">Select Residency</option>
                <option value="0">Resident</option>
                <option value="1">Non-Resident</option>
                <option value="2">Permanent Resident</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Citizenship Status</Form.Label>
              <Form.Select name="citizenshipStatus" value={formData.citizenshipStatus} onChange={handleChange} required>
                <option value="">Select Citizenship</option>
                <option value="0">Non-Citizen</option>
                <option value="1">Citizen</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>Loan Purpose</Form.Label>
              <Form.Select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} required>
                <option value="">Select Loan Purpose</option>
                <option value="0">Personal</option>
                <option value="1">Business</option>
                <option value="2">Car</option>
                <option value="3">Home Renovation</option>
                <option value="4">Debt Consolidation</option>
                <option value="5">Education</option>
                <option value="6">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Repayment Frequency</Form.Label>
              <Form.Select name="repaymentFrequency" value={formData.repaymentFrequency} onChange={handleChange} required>
                <option value="">Select Repayment Frequency</option>
                <option value="0">Weekly</option>
                <option value="1">Fortnightly</option>
                <option value="2">Monthly</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Get Interest Rate
            </Button>
          </Form>

          {prediction && (
            <Alert variant="success" className="mt-4">
              <strong>Predicted Interest Rate: {prediction}%</strong>
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoanForm;
