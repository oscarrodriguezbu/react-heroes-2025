import { Link } from 'react-router-dom';

const CharactersByHero = ({ alter_ego, characters}) => { //parte de la opcion 2
    // if ( alter_ego === characters ) return (<></>);
    // return <p>{ characters }</p>
    return ( alter_ego === characters )
     ? <></>
     : <p>{ characters }</p>;
}


export const HeroCard = ({ 
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters ,
}) => {

    const heroImageUrl = `/assets/heroes/${ id }.jpg`;

    // const charactesByHero =  (<p>{ characters }</p>); //es un jsx que se crea, opcion 3.


    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">

                <div className="row no-gutters">
                    
                    <div className="col-4">
                        <img src={ heroImageUrl } className="card-img" alt={ superhero } />
                    </div>

                    <div className="col-8">

                        <div className="card-body">

                            <h5 className="card-title">{ superhero }</h5>
                            <p className="card-text">{ alter_ego }</p>

                            {/* Opcion 1:
                            {
                                ( alter_ego !== characters ) && charactesByHero
                                ( alter_ego !== characters ) && <p>{ characters }</p>
                            } 
                             */}

                            {/* Opcion 2: pequeño componente para mostrar los personaes si el alterigo es diferente al arreglo */}
                            <CharactersByHero characters={ characters } alter_ego={ alter_ego } />

                            <p className="card-text">
                                <small className="text-muted">{ first_appearance }</small>
                            </p>

                            <Link to={`/hero/${ id }`}>
                                Más..
                            </Link>

                            
                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}
