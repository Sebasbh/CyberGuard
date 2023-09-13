import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import validator from "validator";
import { submitForm } from "../context/Api.js"; 
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ReCAPTCHA from "react-google-recaptcha";

function Form() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [recaptchaValue, setRecaptchaValue] = useState(null); // Nuevo estado para almacenar el valor de reCAPTCHA

  const onSubmit = async (formData, res) => {
    // Verificar si los campos ocultos están llenos y, si es así, no realizar la petición
    if (formData.field1 || formData.field2) {
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Verifica si se completó reCAPTCHA antes de enviar el formulario
    if (!recaptchaValue) {
      return;
    }

    try {
      const response = await submitForm(formData); // Llama a la función submitForm
      alert("formulario creado exitosamente")
    } catch (error) {
      alert("Error al enviar el formulario")
    }
  };

  return (
    <div>
      <Header />

      <div className="container my-5" style={{ minHeight: "65vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Contact Us</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    validate: (value) =>
                      validator.isEmail(value) || "Invalid email address",
                  }}
                  render={({ field }) => (
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Name is required",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Only letters are allowed for the name field.",
                    },
                    maxLength: {
                      value: 80,
                      message: "Name must not exceed 80 characters",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      {...field}
                    />
                  )}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Subject:
                </label>
                <Controller
                  name="subject"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Subject is required",
                    maxLength: {
                      value: 120,
                      message: "Subject must not exceed 120 characters",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${
                        errors.subject ? "is-invalid" : ""
                      }`}
                      {...field}
                    />
                  )}
                />
                {errors.subject && (
                  <div className="invalid-feedback">
                    {errors.subject.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message:
                </label>
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Message is required",
                    maxLength: {
                      value: 400,
                      message: "Message must not exceed 400 characters",
                    },
                  }}
                  render={({ field }) => (
                    <textarea
                      className={`form-control ${
                        errors.message ? "is-invalid" : ""
                      }`}
                      {...field}
                      rows={4}
                    />
                  )}
                />
                {errors.message && (
                  <div className="invalid-feedback">
                    {errors.message.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                {/* Agrega el componente ReCAPTCHA con la clave del sitio */}
                <ReCAPTCHA
                  sitekey="6LdFrxsoAAAAAEd2JZrF6h_rMakL4FRijftbHOPz"
                  onChange={(value) => setRecaptchaValue(value)}
                />
              </div>

              {/* Agregar campos ocultos */}
              <input type="hidden" name="field1" defaultValue="" />
              <input type="hidden" name="field2" defaultValue="" />

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Form;
