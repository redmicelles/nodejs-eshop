import {Request, Response, NextFunction} from 'express';
import { prismaClient } from '..';
import {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets';
import { BadRequestsException } from '../exceptions/bad-requests';
import { UnprocessableEntity } from '../exceptions/validation'
import { ErrorCodes } from '../exceptions/root';
import { error } from 'console';
import { SignUpSchema } from '../schemas/users';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    SignUpSchema.parse(req.body)
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
    res.status(201).json(user);
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    let user: any = await prismaClient.user.findFirst({where: {email}});

    if (!user || !compareSync(password, user.password)) {
        next(new BadRequestsException('Invalid username or password!', ErrorCodes.INCORRECT_CREDENTIALS))
    }
    
    const token = jwt.sign({
        sub: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.createdAt
    }, JWT_SECRET)

    res.status(200).json({token});
}