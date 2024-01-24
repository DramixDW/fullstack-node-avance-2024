import express, { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

export const jwt_secret = `MIICXQIBAAKBgQC5CE2UBc/+Ewh56sAbSNX9e3+bcGSIWalB1lHFkYls3WtXE3ZB
wd4NbN6J2Fw2qwxo/YDVgASGyY2LPkcJKD1ZP3gsG+LjTgixLC7X+pEFbeF0qh3t
Bes0lTFcsTqVyuiENUmM6YyF7RSBFFLPiSuUJylOC6yhd+/f0YXSWKrtHQIDAQAB
AoGABS8CXV88UHXgCupUr27+77cCACzJ5Df+0eVbLRnCq9YYJ7xX18fCnMWsBliV
XMK1+kr/zPtlJRGIcZoxC0ShU06OEaDxm7ixC1UkxlmquaWcBmo31tRlXlaMqnzb
NC/MIK+QRVle4JONkeV/PGJw8gt/tzFRbzIudonnqFoXalECQQDaImYyDxawYBT+
hZsSjtZwQvtSeIcYUMpw/KjyKSrEHAvaYbzEVYq70nSeL8Tkx8ndKm35/gVsFx9a
vUT89uajAkEA2Sbl14dMBCzKKky5f4/xl+DXSWNwfgdZa7wWQMjEZz4uODFOhavV
fEC7KZHEsQhBBkOotZGJIwpKLExrpnjZPwJBALpcf0EvYOwI+obFMMp3HD/HCh7Y
eFrO01YalmBlyXLIn1vQ+swmZSO4Vwe6uhXXluAMWu8lFg7V5mTIpUMV0c8CQQDZ
BB6/ft9hbMG99F+ONHTlrDZ7iX1q9j1PhfFXXU2rQGFAl0Y6ILiCLM7fhGZl5jHV
6Ng6XPAIrMfj7ZvICw5RAkAUCkhrs3NF7rZB4EoFkaJdipSCNysPhzURJMFMv6Yb
A1HcaoKtL/QcZd68Tt7DIiY+KgpVDxzxSRw0O5izT0K5`;

const users = [{
    email: "test@test.com",
    id: 1,
  },{
    email: "test@banane.com",
    id: 2,
  },{
    email: "test@orange.com",
    id: 3,
}];

const application = express();

application.use(express.json());
// La route qui va générer le jsonWebToken
application.post('/login', (request, response) => {
    const id = users.find(user => user.email === request.body.email)?.id;
    const token = JWT.sign({
        id,
        //issuedAt: à quel moment il a été généré
        iat: new Date().getTime() / 1000,
        // à quelle moment le token expire
        exp: (new Date().getTime() / 1000) + 300,
    }, jwt_secret);

    response.send({
        token,
    })
})

const isLoggedMiddleWare = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization?.split(" ")[1];  
  if (!token) {
    throw new Error("Access Forbidden");
  }
  const payload = JWT.verify(token, jwt_secret);
  console.log(payload);
  next();
}

application.get('/', isLoggedMiddleWare, (request, response) => {
    response.send("Ok");
});

application.listen(8001, () => {
    console.log('Tu peux te logger :)');
})