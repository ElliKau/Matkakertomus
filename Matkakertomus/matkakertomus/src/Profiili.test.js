import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { App } from './App'
import Profiili from './components/Profiili'
import Matkat from './components/Matkat';
import { UserContext } from './UserContext';
//import Modal from 'react-modal';
import { NavLink, MemoryRouter as Router, BrowserRouter, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import axios from 'axios';
import NavBar from './components/NavBar';
axios.defaults.adapter = require('axios/lib/adapters/http');

//server yhteyttä varten
const supertest = require('supertest')
const serveri = require('../backend/server')
const request = supertest(serveri);
global.scrollTo = jest.fn()

/**
 * Yksikkötestausta Matkojen osalta, kirjautumisesta, sekä profiilista
 * npm install --save-dev jest
 * npm install --save-dev jest supertest
 */

describe("Sisäänkirjautuminen", () => {
    test('Kirjautumiskomponentti löytyy', async () => {
        // id_kayttajatunnus, id_salasana, id_kirjaudubtn, id_submitkirjaudu
        //Paina kirjaudu, laita tiedot, kirjaudu, näkyykö teksti navbarissa

        for (let i = 0; i < 1; i++) {
            const history = createMemoryHistory();
            render(
                <Router location={history.location} navigator={history}>
                    <App />
                </Router>
            )
            const kirjaudu = screen.getByTestId('id_kirjaudubtn');
            fireEvent.click(kirjaudu)

        }
    });

    test('Kirjautuminen onnistuu ', async () => {
        for (let i = 0; i < 1; i++) {
            const history = createMemoryHistory();
            render(
                <Router location={history.location} navigator={history}>
                    <App />
                </Router>
            )
            try {
                let kirjaudu = screen.getByTestId('id_kirjaudubtn');
                fireEvent.click(kirjaudu);
                //userEvent.type(screen.getByPlaceholderText('Käyttäjätunnus'), 'ellikau')
                userEvent.type(screen.getByTestId('id_kayttajatunnus'), 'ellikau');
                userEvent.type(screen.getByTestId('id_salasana'), 'ek')
                const hyvaksy = screen.getByTestId('id_submitkirjaudu');
                fireEvent.click(hyvaksy);
            } catch (ex) {
                console.log(ex);
            }
        }

    });
});

describe("Navigointi", () => {
    test("Navigointi omalle sivulle", async () => {
        //testataan siis navigointia, johon tarvii contextia, lisäksi moduuli käytössä sivulla tuotta ongelmia
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <App />
            </Router>
        )
        //Contextin käyttö ei ole tiedossa tai opetettu testeissä
        const wrapper = mount(
            <UserContext.Provider
                value={{
                    dispatch: jest.fn(),
                    nimimerkki: 'ellikau'   ,   
                    salasana: 'ek'
                }}><div> <Profiili /></div>    
            </UserContext.Provider>);

        try {
            const kirjaudu = screen.getByTestId('id_kirjaudubtn');
            fireEvent.click(kirjaudu)
            let nimi = screen.getByLabelText(/Käyttäjätunnus/i);
            let salasana = screen.getByLabelText(/Salasana/i);
            userEvent.type(nimi, 'ellikau')
            userEvent.type(salasana, 'ek')
            fireEvent.click(kirjaudu);
        } catch (ex) {
            console.log(ex);
        }
        render(<NavBar />);

        const tulos = await screen.findByText('ellikau')
        console.log("tulos", tulos);
        expect(screen.getByText('ellikau')).toBeInTheDocument()
    })


    test("Tiedot näkyvät nimimerkillä ellikau", async () => {
        //Navigoidaan profiiliin nimimerkin kautta, katsotaan löytyykö esimerkiksi email
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <App />
            </Router>
        )
        fireEvent.click(screen.getByText("ellikau"));
        const email = screen.getByTestId("prof_email");
        expect(await screen.getByText(/ellikau@uef.fi.net.org/i)).toBeInTheDocument()
    })

})


describe('Profiilin tarkastelu', () => {

    const addItem = jest.fn()
    render(
        <UserContext.Provider value={{ addItem }}>
            <Profiili />
        </UserContext.Provider>
    )

    test("Tiedon haku onnistuu parametrillä ellikau", async () => {
        //testataan yhteyttä
        try{
        const res = await request.get('/get/kayttaja?nimimerkki=ellikau');
        expect(res.statusCode).toEqual(200);
        }catch(ex){console.log(ex)};
    });

    test("Sähköposti on oikein", async () => {
        //Haetaan esimerkkikäyttäjän tiedot, odotetaan oikean datan tulevan
        //prof_nimimerkki, prof_email,prof_etunimi,prof_sukunimi
        try{
            const res = await request.get('/get/kayttaja?nimimerkki=ellikau');
            const data = response.body;
            console.log("res", res);
            console.log("body", data);
        }catch (ex){console.log(ex)};

            expect(res.length).toBeGreaterThan(0);
            const a = asiakkaat[0];

            expect(a.etunimi).toBe('Elli');
            expect(a.nimimerkki).toBe('ellikau');
            expect(a.email).toBe('ellikau@uef.fi.net.org');

    });

})
describe("Matkat", () => {
    //testataan siis navigointia matkasivulle

    test("Navigointi matkat -sivulle, löytyykö otsikko", async () => {
        //id_matkabtn
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <App />
            </Router>
        )
        render(<Matkat />);
        console.log(history.location);
        fireEvent.click(screen.getByTestId('id_matkabtn'))
        const matka = await screen.findByText(/Viimeisimmät matkat/i)
        console.log("tulos", tulos);
        //expect(screen.getByText('Viimeisimmät matkat')).toBeInTheDocument();
    })

    test("Matkojen haku onnistuu, matkan tekijänä id 3", async () => {
        //testataan yhteyttä

        const res = await request.get('/api/matkat');
        expect(res.statusCode).toEqual(200);
        //const data = response.body;
        //expect(data.length).toBeGreaterThan(0);
        console.log(data[0]);
    });

    test("Matkat näkyvät sivulla", async () => {
        // id_matkanimi, id_matkaajanimim
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <App />
            </Router>
        )
        expect(await screen.getByText(/Lauantaimatka/i)).toBeVisible()

    })

})

