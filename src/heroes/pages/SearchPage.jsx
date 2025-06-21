import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search); // se le pone un valor por defecto a la q por si acaso
  const heroes = getHeroesByName(q);

  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
    //podria inicialisarse vacio, pero para no perder esa info, se recomienda colocar el query al 
    // momento de regresar a la pagina por ejemplo
    //y si en la url se cambia manualmente entonces tambien cambia el valor del input al mismo tiempo
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if ( searchText.trim().length <= 1 ) return;
    navigate(`?q=${searchText}`);
  };

  //! Se podria crear un custom hook para administrar la busqueda

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <section className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit} aria-label="form">
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </section>

        <section className="col-7">
          <h4>Results</h4>
          <hr />

          {/*  Esto destruye los componentes y la animacion de salida no funciona
          {
              ( q === '' )
                ? <div className="alert alert-primary">Search a hero</div>
                : ( heroes.length === 0 ) 
                  && <div className="alert alert-danger">No hero with <b>{ q }</b></div>
            }
             */}

          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Search a hero
          </div>

          <div
            aria-label="alert-danger"
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            No hero with <b>{q}</b>
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </section>
      </div>
    </>
  );
};
