import React from "react";
import { Form, FormControl } from "react-bootstrap";

export const ToursGallery = () => {
  return (
    <div>
      <h2>Tours ToursGallery</h2>
      <Form className="d-flex mx-auto">
        <FormControl
          type="search"
          placeholder="🔍 ¿Qué le apetece visitar?"
          className="mr-2"
          aria-label="Buscar"
        />
      </Form>
    </div>
  );
};
