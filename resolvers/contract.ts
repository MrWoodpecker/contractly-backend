import express from 'express';
import { isTokenValid } from '../validate';



export default {

    contracts: async (args: {}, req: express.Request) => { 

        const token = req.get('token');
        const tokenValid = await isTokenValid(token);


        if ('error' in tokenValid) {
            throw new Error(tokenValid.error.toString());
        }



        


        return [];


    },

};
