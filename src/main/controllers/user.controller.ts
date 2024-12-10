import bcrypt from 'bcrypt'
import User from '../../models/user.model'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const userCreate = async (req: Request, res: Response): Promise<Response> => {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    const userExist = await User.findOne({ where: { email } })

    if (userExist) {
      return res.status(400).send('User already exists')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const userCreate = await User.create({
      fullName,
      email,
      password: hashPassword
    })
    
    console.log(userCreate.id);
    return res.status(201).json(userCreate);

  } catch (err) {
    console.error(err)
    return res.status(500).send('Internal server error')
  }
}

export const Login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ where: { email } });

    if (!userExist) {
      return res.status(400).send('Email or password is incorrect');
    }

    const isMatch = await bcrypt.compare(userExist.password, password);

    if (!isMatch) {
      return res.status(400).send('Email or password is incorrect');
    }

    const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY!, {
      expiresIn: '1h',
    });

    res.cookie('access_token', token, { httpOnly: true });

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Login error');
  }
};
