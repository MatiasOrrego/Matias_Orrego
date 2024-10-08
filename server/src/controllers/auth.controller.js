import { createJwt } from "../helpers/createJwt.js";
import { hash, genSalt, compare } from "bcrypt";
import crypto from "crypto";
import { createUser, getUserByCredentials } from "../models/user.model.js";


export const signInCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await getUserByCredentials(email, password);


    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createJwt(user.id);

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUpCtrl = async (req, res) => {
  try {
    // ! Completar la función signUpCtrl
    const {username, email, password} = req.body

    createUser(username, email, password)

    res.json({message:"creado correctamente"})
  

} catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const signOutCtrl = (req, res) => {
  try {
    // ! Completar la función signOutCtrl
    const { username } = req.body

    const findedUser = usersCollection.find((user) => user.username === username)


    res.status(200).json({ message: "Sign out success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeCtrl = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
