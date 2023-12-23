import { body } from "express-validator";

export const registerValidation = [
    body("name", "Invalid name")
        .notEmpty()
        .isLength({ min: 5, max: 32 })
        .withMessage("Name is required"),
    body("email", "Invalid email format").isEmail(),
    body("password", "Password must be at least 8 characters").isLength({ min: 8, max: 32 }),
    body("birthDate", "Birth date is not found").notEmpty()
];

export const loginValidation = [
    body("email", "Invalid email format").isEmail(),
    body("password", "Password is required").notEmpty(),
];
