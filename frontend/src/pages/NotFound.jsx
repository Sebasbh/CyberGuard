import React from 'react';

function NotFound() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <h1 className="display-4">Página no encontrada</h1>
            <p className="lead">Lo sentimos, la página que buscas no existe.</p>
            <p className="mb-5">Por favor, verifica la URL o regresa a la página de inicio.</p>
            <a href="/" className="btn btn-primary">Ir a la página de inicio</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;


