import jwt from 'jsonwebtoken';
import { next } from 'sucrase/dist/parser/tokenizer';
const SECRET = 'NINGUEM_ACREDITARIA_SE_EU_DISSESSE';

function VerifyToken(req, res, next) {
    const token = req.headers.authorization;

    jwt.verify(token, SECRET, (err)=> {
        if(err) {
            return res.status(401).json({message: 'Invalid token'})
        }
        return next();
    });
}

export default VerifyToken;