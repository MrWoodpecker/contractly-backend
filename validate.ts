import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';



dotenv.config();


const client = jwksClient({

    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,

});


const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {

    client.getSigningKey(header.kid, (error, key) => {

      const signingKey = 'publicKey' in key ? key.publicKey : key.rsaPublicKey;

      callback(null, signingKey);

    });

};


export const isTokenValid = async (token: string | undefined) => {

    type IsTokenValidReturn = { error: jwt.VerifyErrors } | { decoded: string | jwt.JwtPayload };


    if (token) {

        const bearerToken = token.split(" ");
  
        const result = new Promise<IsTokenValidReturn>((resolve, reject) => {

            jwt.verify(
                bearerToken[1],
                getKey,
                {
                    audience: process.env.API_IDENTIFIER,
                    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                    algorithms: ["RS256"]
                },
                (error, decoded) => {
                    if (error) {
                        resolve({ error });
                    }
                    if (decoded) {
                        resolve({ decoded });
                    }
                }
            );
        });
  

      return result;
      
    }
  

    return { error: "No token provided" };

};