import {Request, Response, NextFunction} from 'express';
import { prismaClient } from '..';
import {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErrorCodes } from '../exceptions/root';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}});
    if (user) {
        next(new BadRequestsException('User already exists', ErrorCodes.USER_ALREADY_EXISTS))
    }
    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password, 10)
        }
    });
    res.json(user);
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}});

    if (!user || !compareSync(password, user.password)) {
        //next(new BadRequestsException('Invalid username or password!', ErrorCodes.INCORRECT_CREDENTIALS))
        throw Error('Invalid username or password!')
    }
    
    const token = jwt.sign({
        sub: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.createdAt
    }, JWT_SECRET)

    res.json({token});
}