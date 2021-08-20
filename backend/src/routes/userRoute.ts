import { NextFunction, Request, Response, Router } from "express";
import { getUserRepository, User } from "../models/userModel";

export const router: Router = Router();

// add user
router.post("", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = await getUserRepository();
        const user = new User();
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        const newUser = await userRepository.save(user);
        res.send(newUser);
    } catch (err) {
        return next(err);
    }
});

// get user by id
router.get(
    "/:userId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const repository = await getUserRepository();
            const user = await repository.find({ userId: req.params.userId });
            res.send(user);
        } catch (err) {
            return next(err);
        }
    }
);

// validate user
router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const repository = await getUserRepository();
            const user = await repository.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password,
                },
            });
            user != null
                ? res.send({ success: true, user: user })
                : res.send({ success: false });
        } catch (err) {
            return next(err);
        }
    }
);

// edit user
router.put(
    ":/userId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRepository = await getUserRepository();
            const user = await userRepository.findOne({
                userId: req.params.userId,
            });
            user.email = req.body.email;
            user.username = req.body.username;
            user.password = req.body.password;
        } catch (err) {
            return next(err);
        }
    }
);

// delete user
router.delete(
    ":/userId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRepository = await getUserRepository();
            const userId = req.params.userId;
            const result = await userRepository.delete(userId);
            res.send(result);
        } catch (err) {
            return next(err);
        }
    }
);
