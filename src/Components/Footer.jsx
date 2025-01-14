
import './css/Footer.css'

export function Footer(){
    return (
        <footer>
        <ul className="contact-footer container">
            <li className="box-contact mail"><a className="link-contact-mail" href="marinozzitomas@hotmail.com" target="_blank"><i className="fas fa-2x fa-envelope"></i></a></li>
            <li className="box-contact instagram"><a className="link-contact-instagram" href="https://www.instagram.com/tomimarinozzi" target="_blank"><i className="fa-brands fa-2x fa-instagram"></i></a></li>
            <li className="box-contact twitter"><a className="link-contact-twitter" href="https://x.com/tomiimarinozzi" target="_blank"><i className="fa-solid fa-2x fa-x"></i></a></li>
        </ul>
        <div className="footer-tomas"><p className="p-footer">Pagina hecha por Tomas Marinozzi</p></div>
    </footer>
        );
}