import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }

                req.user = user;
                next();
            });
        } else {
            return res.status(401).json({ message: 'No token provided' });
        }
    }
}