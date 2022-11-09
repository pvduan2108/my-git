import React, {useState} from "react";
import { Button, Form, InputGroup} from "react-bootstrap";
import {validateSearch} from "../../../components/validation/Validation";
import {FaSearch} from "react-icons/fa";

export default function UserFilter({ filter, setFilter, onFilter, type }) {
    const [touched, setTouched] = useState(false);
    const handleChange = evt => {
        setFilter(evt.target.value)
    }

    const handleBlur = () => {
        setTouched(true)
    }
    const errorInput = validateSearch(filter)
    const formValid = !errorInput
  return (
      <InputGroup className="m-3">
        <Form.Control
            id="dhv-page-header-functions-search-input"
            placeholder="Type to search..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          // onChange={(e) => setFilter(e.target.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched && Boolean(errorInput)}
        />
          <Button disabled={!formValid} onClick={() => {
              onFilter(filter, type)
          }} variant="outline-secondary"
                  id="button-addon2"  type="submit"><FaSearch/></Button>
          <Form.Control.Feedback type="invalid">{errorInput}</Form.Control.Feedback>
      </InputGroup>
  );
}
