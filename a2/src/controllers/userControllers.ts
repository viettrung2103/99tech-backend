import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { AuthenticatedRequest, UserType } from "../types/types";

// Interface for signup request body
interface SignUpRequest  {
  name: string;
  username: string;
  password: string;
}

// Interface for login request body
interface LoginRequestBody {
  username: string;
  password: string;
}

// Interface for auth response
interface AuthResponse {
  username: string;
  token: string;
}

// Interface for error response
interface ErrorResponse {
  error: string;
}

// Generate JWT
const generateToken = (_id: string): string => {
  return jwt.sign({ _id }, process.env.SECRET!, {
    expiresIn: "3d",
  });
};

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
export const signupUser = async (
req: Request<{}, AuthResponse | ErrorResponse, SignUpRequest>,
  res: Response<AuthResponse | ErrorResponse>
): Promise<void> => {
  const {
    name,
    username,
    password,
  } = req.body;

  try {
    if (
      !name ||
      !username ||
      !password 
    ) {
      res.status(400).json({ error: "Please add all fields" });
      return;
    }

    // Check if user exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(user._id.toString());
      res.status(201).json({ username, token });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    res.status(400).json({ error: errorMessage });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (
  req: Request<LoginRequestBody>,
  res: Response<AuthResponse | ErrorResponse>
): Promise<void> => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ error: "Please provide username and password" });
      return;
    }

    // Check for user username
    const user = await User.findOne({ username }).select('+password');

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id.toString());
      res.status(200).json({ username, token });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    res.status(400).json({ error: errorMessage });
  }
};
