import Image from "next/image";
import styles from "./FilmeDetail.module.scss";
import BladeRunner from "/public/bladerunner.webp";

export function FilmDetail() {

    return (
    
            <main className={styles.container}>
                <div className={styles.image_container}>
                    <Image src={BladeRunner} alt="BladeRunner" fill />
                </div>
                <div className={styles.infos}>
                    <div>
                        <h1>BladeRunner</h1>  1/10
                    </div>
                    <p>Ano: 1982</p>
                    <p>Após descobrir um segredo que ameaça o que resta da sociedade, um novo policial parte em busca Ede Rick Deckard, que está desaparecido há 30 anos.</p>
                    <p><b>Elenco: </b>Harrison Ford, Anna de Armas, Ryan Gosling, Jared Leto.</p>
                </div>
            </main>
    
    );
}
