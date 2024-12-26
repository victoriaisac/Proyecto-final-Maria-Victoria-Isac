
import { Link } from 'react-router-dom';

const Home = () => {

return(
    <>
        <body>
            <div className="home">
                    <header>
                        <h1 className="titulo">
                            ANISSA & TAM
                        </h1>
                
                        <h2 className="beauty">
                            Beauty
                        </h2>
                
                        <h2 className="grown">
                            grown
                        </h2>
                
                        <div className="login-home">
                            <Link to="/login" className="link-login-home">LOG IN</Link>
                        </div>
                    </header>
                </div>

                    <main>
                        <div className="border">
                            <div className="introduccion">
                                <h2 className="parrafo">
                                    Beauty that doesn't come at the expense of the earth
                                </h2>
                    
                                <p className="parrafo1">
                                Each piece of our jewelry reflects elegance and environmental awareness.
                                We are committed to using sustainable materials and responsible processes 
                                to buy accessories that beautify without harming the planet. Because we believe that 
                                true beauty is in harmony with nature
                                </p>
                            </div>
                        </div>

                        <div className="img-fondo">
                            <p className="font-fondo">Upcoming <br />
                                Collection
                            </p>

                            <p className="font-fondo">02.05.2025</p>
                        </div>

                        <section>
                        <article className="coleccion2">
                            <div className="productos2">
                                <h4>
                                    SUSTAINABLY SOURCED
                                </h4>
                                <p>
                                Each piece of jewelry begins with a commitment: to use materials obtained in a way 
                                ethical and environmentally friendly. We work with suppliers who share 
                                our vision of sustainability, ensuring that each piece is as 
                                responsible as well as beautiful.
                                </p>
                            </div>
                    
                            <div className="productos3">
                                <h4>
                                    ETHICALLY CRAFTED
                                </h4>
                                <p>
                                Each piece of jewelry tells a story of care and respect. We make sure that our 
                                manufacturing processes comply with ethical standards, promoting conditions 
                                fair for those who participate in the creation of each piece. Beauty has no 
                                why compromise values.
                                </p>
                            </div>
                    
                        </article>
                        </section>
                    </main>
            
                    <footer>
                        <div className="fondo"></div>

                        <div className="contenedor-final">
                            
                            <p className="titulo-final">ANISSA <br /> & TAM</p>

                            <div className="contenedor-final-dos">
                                <p className="contacto">Contact</p>

                                <p className="info">LOCATION
                                <br /> Calle 123 Buenos Aires 
                                </p>

                                <p className="info">EMAIL
                                    <br /> anissa&tam@gmail.com
                                </p>

                                <p className="info">PHONE NUMBER 
                                    <br /> (123) 456-789
                                </p>
                            </div>
                        </div>
                    </footer>
            
        </body>
    </>
    );
        }

export default Home;