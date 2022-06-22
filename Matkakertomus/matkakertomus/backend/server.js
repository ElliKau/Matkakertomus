const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt')
const saltRounds = 10
const multer = require("multer");
const path = require('path');
//Multer shows multiple images in a slider
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/uploads")
        console.log("TÄSSÄ DESTINATION LOG: " + req.username)
    },
    filename: (req, file, cb) => {
        console.log("Tässä tiedosto: " + file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });
const cookieParser = require('cookie-parser');
const session = require('express-session');

const jwt = require('jsonwebtoken');

const db = mysql.createPool({

    host: "localhost",
    port: "3307",
    user: "web",
    password: "",
    database: "matkakertomus"

})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({

    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true


}));
//cookies for logging in
app.use(cookieParser());
app.use(session({
    key: "idmatkaaja",
    secret: "matkaaja",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600 * 600 * 24,
    },
})
);

// OMAT matkat
app.get('/api/omatmatkat/:idmatkaaja', (req, res) => {
    let omaID = req.params.idmatkaaja;
    let query = "SELECT matka.idmatka, matka.nimi, kuva.kuva,DATE_FORMAT(matka.luomispvm,'%d.%m.%Y %H.%i') as luomispvm, matkaaja.nimimerkki, tarina.teksti FROM matka" +
        " LEFT JOIN tarina ON matka.idmatka = tarina.idmatka" +
        " LEFT JOIN kuva ON kuva.idtarina = tarina.idtarina" +
        " LEFT JOIN matkaaja ON matka.idmatkaaja = matkaaja.idmatkaaja" +
        " WHERE matkaaja.idmatkaaja = ?" +
        " GROUP BY matka.idmatka"

    db.query(query, [omaID], function (error, result, fields) {
        console.log("done")
        if (error) {
            console.log("SELECT matka.idmatka Virhe", error);
            res.json({ status: "NOT OK", message: "Matkojen haussa tapahtui virhe" });
        }
        else {
            res.statusCode = 200;
            res.send(result);
        }
    });
});

/* KAIKKIEN MATKAT sivun matkojen hakeminen */
app.get('/api/matkat', (req, res) => {
    let query = "SELECT matka.idmatka, matka.nimi, kuva.kuva,DATE_FORMAT(matka.luomispvm,'%d.%m.%Y %H.%i') as luomispvm, matkaaja.nimimerkki, tarina.teksti FROM matka" +
        " LEFT JOIN tarina ON matka.idmatka = tarina.idmatka" +
        " LEFT JOIN kuva ON kuva.idtarina = tarina.idtarina" +
        " LEFT JOIN matkaaja ON matka.idmatkaaja = matkaaja.idmatkaaja" +
        " WHERE matka.yksityinen = 0" +
        " GROUP BY matka.idmatka"
    db.query(query, function (error, result, fields) {
        if (error) {
            console.log("Matkahaku Virhe", error);
            res.json({ status: "NOT OK", message: "Matkojen haussa oli ongelmia" });
        } else {
            res.statusCode = 200;
            res.send(result);
        }
    });
});

// Jäsenet sivu - Haetaan kaikki jäsenet
app.get("/api/jasenet", (req, res) => { // haetaan matkaajat
    const sqlSelect = "SELECT * from matkaaja";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => { //POST matkaaja

    const etunimi = req.body.etunimi;
    const sukunimi = req.body.sukunimi;
    const nimimerkki = req.body.nimimerkki;
    const email = req.body.email;
    const password = req.body.password;
    const paikkakunta = req.body.paikkakunta;
    const kuva = "empty_icon.png";


    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.send({ err: err })
        }
        db.query("INSERT INTO matkaaja (etunimi, sukunimi, nimimerkki, email, password, paikkakunta, kuva) VALUES (?,?,?,?,?,?,?)", [etunimi, sukunimi, nimimerkki, email, hash, paikkakunta, kuva], (err, result) => {
            if (err) {
                res.send({ err: err })
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        }
        );
    })


});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })

    } else {
        res.send({ loggedIn: false })
    }

})

//Token login not in use
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send("No token")
    } else {
        jwt.verify(token, "asd123", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Failed to authenticate" })
            } else {
                req.idmatkaaja = decoded.id
                next();
            }
        });
    }

}

app.get("/authentication", (req, res) => {
    res.send("Verified");
})

app.post("/login", (req, res) => {
    const nimimerkki = req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM matkaaja WHERE nimimerkki = ?;",
        nimimerkki,
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;

                        const idmatkaaja = result[0].idmatkaaja;
                        const token = jwt.sign({ idmatkaaja }, "asd123", {
                            expiresIn: 300
                        })
                        res.json({ auth: true, token: token, result: result })
                    } else {
                        res.json({ auth: false, message: "Väärä käyttäjänimi/salasana yhdistelmä!" });
                    }
                })
            } else {
                res.json({ auth: false, message: "Käyttäjää ei ole olemassa" });
            }
        }
    );

});
app.delete("/logout", (req, res) => {

    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.send('Logout successful')
            }
        });
    } else {
        res.end()
    }


})


//Profiili, Käyttäjän tietojen hakeminen
app.post("/get/kayttaja", (req, res) => {
    const username = req.body.kirjautunut;
    console.log("kayttaja ", username)
    const sqlSelect = `SELECT * FROM matkaaja WHERE nimimerkki = ?`;

    db.query(sqlSelect, [username], (err, result) => {
        if (err) {
            console.log(err);
            res.statusCode = 400;
            res.send("Käyttäjähaussa oli ongelmia: ", err.message);
        } else {
            console.log(result);
            res.statusCode = 200;
            res.send(result);
        }
    })
});

//Matkahaku
app.get("/get/matkat/:idmatkaaja", (req, res) => {
    let idmatkaaja = req.params.idmatkaaja;
    const sqlSelect = "SELECT * FROM matka where idmatkaaja=?";
    db.query(sqlSelect, [idmatkaaja], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: err.message })
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

//Tietojen päivitys
app.put("/update/:idmatkaaja", upload.array("file"), (req, res) => {

    const etunimi = req.body.etunimi;
    const sukunimi = req.body.sukunimi;
    const nimimerkki = req.body.nimimerkki;
    const paikkakunta = req.body.paikkakunta;
    const esittely = req.body.esittely;
    const idmatkaaja = req.params.idmatkaaja;
    const kuvaosoite = []

    if (req.files.length > 0) { // jos on kuvia, laitetaan ne arrayyn
        for (let i = 0; i < req.files.length; i++) {
            kuvaosoite.push(req.files[i].filename);
        }
    } else {
        kuvaosoite.push(req.body.kuvaosoite);
    }

    const sqlUpdate = "UPDATE matkaaja m SET m.etunimi = ?, m.sukunimi = ?, m.nimimerkki = ?, m.paikkakunta = ?, m.esittely = ?, m.kuva = ?, m.email = m.email, m.password = m.password  WHERE idmatkaaja = ?";
    //virhetarkistus
    var virheet = [];
    if (!etunimi) virheet.push("etunimi");
    if (!sukunimi) virheet.push("sukunimi");
    if (!nimimerkki) virheet.push("nimimerkki");
    virheet.join(',');
    console.log("params: " + req.params.idmatkaaja)

    db.query(sqlUpdate, [etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuvaosoite[0], idmatkaaja], (err, result) => {
        console.log("query ", sqlUpdate);
        if (err) {
            console.log(err.message);
            res.statusCode = 400;
            res.send("Päivityksessä oli virheellisiä kenttiä: " + err);
            res.json({ message: "Ongelmia lisäyksessä" })
        } else {
            console.log(result);
            //console.log("result ", result);
            res.statusCode = 204;
            console.log(result.affectedRows)
            res.send(result);
        }
    })

});

// Matkat
app.post("/api/insertMatka", (req, res) => { // Tällä voit tehdä POST requestin matka tauluun

    const idmatkaaja = req.body.idmatkaaja;
    const alkupvm = req.body.alkupvm;
    const loppupvm = req.body.loppupvm;
    const yksityinen = req.body.yksityinen;
    const nimi = req.body.nimi;
    const sqlInsert = "INSERT INTO matka (idmatkaaja, alkupvm, loppupvm, yksityinen, nimi, luomispvm) VALUES (?,?,?,?,?,Now())";

    db.query(sqlInsert, [idmatkaaja, alkupvm, loppupvm, yksityinen, nimi], (err, result) => {
        if (err) {
            console.log("Virhe", err);
            res.statusCode = 400;
            res.json({ status: "NOT OK" });
        } else {
            console.log("R:", result);
            res.statusCode = 201;
            res.send();
        }
    })

});

app.post("/api/insertTarina", upload.array("file"), (req, res) => {  //tarina tauluun tietoja
    const pvm = req.body.pvm;
    const idmatkakohde = req.body.idmatkakohde;
    const teksti = req.body.teksti;
    const idmatka = req.body.idmatka;
    console.log("TÄSSÄ FILES" + req.files)
    const kuvat = []
    if (req.files.length > 0) { // jos on kuvia, laitetaan ne array muuttujaan
        for (let i = 0; i < req.files.length; i++) {
            kuvat.push(req.files[i].filename);
        }
    }

    const sqlInsert = "INSERT INTO tarina (idmatkakohde,pvm, teksti, idmatka) VALUES (?,?,?,?)";

    db.query(sqlInsert, [idmatkakohde, pvm, teksti, idmatka], (err, result) => {
        if (err) {
            console.log("INSERT INTO tarina Virhe", err);
            res.statusCode = 400;
            res.json({ status: err });
        } else {
            console.log("R:", result);
            res.statusCode = 201;
            res.send();
            if (kuvat != null) { // jos kuvia on, loopataan kuvat tietokanta queryllä tietokantaan
                for (let i = 0; i < kuvat.length; i++) {
                    let kuva = kuvat[i];
                    db.query("INSERT INTO kuva (kuva, idtarina) VALUES (?,?)", [kuva, result.insertId], (err, result) => { }
                    );
                }
            }
        }
    })

});

app.delete("/api/deletetarina/:idtarina", (req, res) => {
    const id = req.params.idtarina;
    const sqlInsert = "DELETE FROM tarina WHERE idtarina=?"

    db.query(sqlInsert, [id], (err, result) => {
        if (err) {
            console.log("Virhe", err);
            res.statusCode = 400;
            res.json({ status: "NOT OK" });
        } else {
            console.log("R:", result);
            res.statusCode = 204;
            res.send();
        }
    })
})
app.delete("/api/deletematka/:idmatka", (req, res) => {
    const id = req.params.idmatka;
    const sqlInsert = "DELETE FROM matka WHERE idmatka=?"

    db.query(sqlInsert, [id], (err, result) => {
        if (err) {
            console.log("DELETE FROM matka Virhe", err);
            res.statusCode = 400;
            res.json({ status: "NOT OK" });
        } else {
            console.log("R:", result);
            res.statusCode = 204;
            res.send();
        }
    })
})

app.put('/UpdateMatka/:idmatka', (req, res) => {
    //matkan muokkaaminen
    const alkupvm = req.body.alkupvm;
    const loppupvm = req.body.loppupvm;
    const yksityinen = req.body.yksityinen;
    const nimi = req.body.nimi;
    // HUOM! url:ssa oleva muuttuja löytyy params-muuttujasta, huomaa nimeäminen
    let id = req.params.idmatka;
    let query = "UPDATE matka SET alkupvm=?, loppupvm=?, yksityinen=?, nimi=? where idmatka=?";

    console.log("UPDATE matka SET query:" + query);
    db.query(query, [alkupvm, loppupvm, yksityinen, nimi, id], function (error, result, fields) {
        if (error) {
            console.log("UPDATE matka SET Virhe", error);
            res.statusCode = 400;
            res.json({ status: "NOT OK" });
        } else {
            console.log("R:", result);
            res.statusCode = 204;
            res.send();
        }
    });
});

app.put('/Updatetarina/:idtarina', upload.array("file"), (req, res) => {
    //tarinan muokkaaminen
    const pvm = req.body.pvm;
    const idmatkakohde = req.body.idmatkakohde;
    const teksti = req.body.teksti;
    const idmatka = req.body.idmatka;
    let id = req.params.idtarina;
    const kuvat = []

    if (req.files.length > 0) { // jos on kuvia, laitetaan ne array muuttujaan
        for (let i = 0; i < req.files.length; i++) {
            kuvat.push(req.files[i].filename);
        }
    }

    let query = "UPDATE tarina SET pvm=?, idmatkakohde=?, teksti=?, idmatka=? where idtarina=?";
    db.query(query, [pvm, idmatkakohde, teksti, idmatka, id], function (error, result, fields) {
        if (error) {
            console.log("UPDATE tarina SET Virhe", error);
            res.statusCode = 400;
            res.json({ status: "NOT OK" });
        } else {
            console.log("R:", result);
            res.statusCode = 204;   // 204 -> No content -> riittää palauttaa vain statuskoodi
            // HUOM! Jotain pitää aina palauttaa, jotta node "lopettaa" tämän suorituksen.
            // Jos ao. rivi puuttuu, jää kutsuja odottamaan että jotain palautuu api:sta
            res.send();
            if (kuvat != null) { // jos kuvia on, loopataan kuvat tietokanta queryllä tietokantaan
                for (let i = 0; i < kuvat.length; i++) {
                    let kuva = kuvat[i];
                    db.query("INSERT INTO kuva (kuva, idtarina) VALUES (?,?)", [kuva, id], (err, result) => {
                    });
                }
            }
        }
    });
});
app.get("/api/matkakohteet", (req, res) => { // haetaan matkakohteet
    const sqlSelect = "SELECT idmatkakohde, kohdenimi, maa, paikkakunta FROM matkakohde";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
});

app.get("/api/matkahaku", (req, res) => { // haetaan matkat profiilia varten 
    let id = req.params.id;
    const sqlSelect = "SELECT * FROM matka ";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
    });
});
app.get("/getmatka/:idmatka", (req, res) => { // haetaan matkat profiilia varten 
    let id = req.params.idmatka;
    const sqlSelect = "SELECT DATE_FORMAT(alkupvm,'%Y-%m-%d') as alkupvm,DATE_FORMAT(loppupvm,'%Y-%m-%d') as loppupvm,nimi, yksityinen FROM matka where idmatka=?";

    db.query(sqlSelect, [id], function (err, result) {
        if (err) {
            console.log("SELECT DATE_FORMAT Virhe", err);
            res.statusCode = 400;
            res.json({ status: "NOT OK" });
        }        else {
            console.log("R:", result);
            res.statusCode = 201;
            res.send(result);
        }
    });
});
app.get("/gettarina/:idtarina", (req, res) => { // haetaan matkat profiilia varten 
    let id = req.params.idtarina;
    const sqlSelect = "SELECT DATE_FORMAT(pvm,'%Y-%m-%d') as pvm,teksti,idmatkakohde, idmatka FROM tarina where idtarina=?";

    db.query(sqlSelect, [id], function (err, result) {
        if (err) {
            console.log("SELECT DATE_FORMAT 2 Virhe", err);
            res.statusCode = 400;
            res.json({ status: "NOT OK" });
        }        else {
            console.log("R:", result);
            res.statusCode = 201;
            res.send(result);
        }
    });
});

app.get("/api/matkattarinalle/:idmatkaaja", (req, res) => { // haetaan Matkat tarinoita varten
    let idmatkaaja = req.params.idmatkaaja;
    const sqlSelect = "SELECT idmatka, nimi,DATE_FORMAT(luomispvm,'%d.%m.%Y') as luomispvm FROM matka where idmatkaaja=?";

    db.query(sqlSelect, [idmatkaaja], (err, result) => {
        res.send(result);
        console.log(result);
    });
});

app.post("/api/insertmatkakohde", upload.array('file'), (req, res) => {  //tällä olisi tarkoitus viedä matkakohde tauluun tietoja
    const kohdenimi = req.body.kohdenimi;
    const maa = req.body.maa;
    const paikkakunta = req.body.paikkakunta;
    const Kuvausteksti = req.body.Kuvausteksti;
    const kuvat = []

    if (req.files.length > 0) { // jos on kuvia, laitetaan ne array muuttujaan
        for (let i = 0; i < req.files.length; i++) {
            kuvat.push(req.files[i].filename);
        }
    }

    const sqlInsert = "INSERT INTO matkakohde (kohdenimi,maa,paikkakunta,kuvausteksti, kuva) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [kohdenimi, maa, paikkakunta, Kuvausteksti, kuvat[0]], (err, result) => {
        if (err) {
            console.log("INSERT INTO matkakohde Virhe", err);
            res.statusCode = 400;
            res.json({ status: "NOT OK" });
        }        else {
            console.log("R:", result);
            res.statusCode = 201;
            res.send();
        }
    })

});

//Matkalla tarina haku
app.get("/api/matkat/:matkaid", (req, res) => { // haetaan matkat 
    let matkaid = req.params.matkaid;
    const sql = "SELECT matkakohde.maa, matkakohde.kohdenimi, matkakohde.paikkakunta, tarina.teksti, DATE_FORMAT(tarina.pvm,'%d.%m.%Y') as pvm, tarina.idtarina, matkaaja.idmatkaaja FROM tarina" +
        " LEFT JOIN matkakohde ON matkakohde.idmatkakohde = tarina.idmatkakohde" +
        " LEFT JOIN matka ON tarina.idmatka = matka.idmatka" +
        " LEFT JOIN matkaaja ON matkaaja.idmatkaaja = matka.idmatkaaja" +
        " WHERE tarina.idmatka =? " +
        " GROUP BY tarina.idtarina";

    db.query(sql, [matkaid], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: err.message })
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/api/matkat/otsikko/:matkaid", (req, res) => { // haetaan matkat 
    let matkaid = req.params.matkaid;
    const sql = "SELECT matka.nimi as nimi, DATE_FORMAT(matka.alkupvm,'%d.%m.%Y') as alkupvm, DATE_FORMAT(matka.loppupvm,'%d.%m.%Y') as loppupvm, matkaaja.etunimi, matkaaja.sukunimi, matkaaja.nimimerkki, matkaaja.idmatkaaja FROM tarina" +
        " LEFT JOIN matka ON tarina.idmatka = matka.idmatka" +
        " LEFT JOIN matkaaja ON matkaaja.idmatkaaja = matka.idmatkaaja" +
        " WHERE matka.idmatka =?" +
        " GROUP BY matka.idmatka"

    db.query(sql, [matkaid], (err, result) => {
        console.log("Request", req.params)
        if (err) {
            console.log(err);
            res.json({ message: err.message })
        } else {
            res.send(result);
            console.log(result, "Tämä on matka");
        }
    });
});

app.get("/api/matkat/kuvat/:matkaid", (req, res) => { // haetaan matkat 
    let matkaid = req.params.matkaid;
    //pitää etsiä tarinat jotka on matkaid:llä req.params, 
    // sitten etsiä kuvat jotka ovat niillä tarinaid:llä
    const sql = "SELECT kuva.kuva, kuva.idtarina FROM kuva" +
        " INNER JOIN tarina ON tarina.idtarina = kuva.idtarina" +
        " INNER JOIN matka ON matka.idmatka = tarina.idmatka" +
        " WHERE matka.idmatka = ?"

    db.query(sql, [matkaid], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: err.message })
        } else {
            res.json(result);
            console.log(result);
        }
    });
});

app.get("/api/matkakohteet/tiedot", (req, res) => { // haetaan matkat 
    //pitää etsiä tarinat jotka on matkaid:llä req.params, 
    // sitten etsiä kuvat jotka ovat niillä tarinaid:llä
    const sql = "SELECT * FROM matkakohde"

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: err.message })
        } else {
            res.json(result);
            console.log(result);
        }
    });
});

app.listen(3004, () => {
    console.log('running on port 3004');
})

