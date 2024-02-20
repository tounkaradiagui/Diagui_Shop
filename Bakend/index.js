require("dotenv").config();
const express = require("express");
const nodemon = require("nodemon");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const connectDB = require("./config/dbconn");
const User = require("./models/User");
const Order = require("./models/Order");

const app = express();

const PORT = process.env.PORT || 8000;
const APP_URL = process.env.APP_URL || "http://192.168.8.106"; // for local testing use: http://localhost:8000

console.log(process.env.NODE_ENV);
connectDB();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to send a verification email to user
const sendVerificationEmail = async (email, verificationToken) => {
  //Create a nodemailer transport
  const transporter = nodemailer.createTransport({
    // Configure the email service: Service used is Gmail
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //  Setup an email template
  const mailOptions = {
    from: "contact@diagui-shop.com",
    to: email,
    subject: "Veuillez vérifier votre adresse email",
    text: `Cliquez sur le lien suivant pour valider votre compte : http://localhost:${PORT}/verify/${verificationToken}`,
  };

  //  Send the verification link via email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("La vérification de l'adresse email n'a pas pu être envoyée.");
  }
};

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone} = req.body;
    
    // Check if the emailis already registered
    const existingUser = await User.findOne({ email : email});
    if (existingUser) {
      return res.status(400).json({ message: "Cet e-mail est déjà utilisé" });
    }

    // Hashed user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    newUser.save();

    // Send the verification token to the user's email address
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    // Return a message saying that the account has been created but is not yet verified
    res.status(201).json({  message: `Un lien de vérification vous a été envoyé à l'adresse email ${email}. Cliquez sur le lien pour valider votre compte sur Diagui Shop.`,});
  } catch (error) {
    console.log("Erreur d'inscription", error);
    res.status(500).json({ message: "Inscription echouée" });
  }
});

// Verification endpoint
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // Find the user with the given verification token in the database
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Mauvais ou manquant jeton de vérification" });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({message: "Félicitions ! Votre adresse email est maintenant validée."});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Echec de vérification de l'adresse email" });
  }
});

// Generate a secret key
const generateSecretKey = () => {
  const secret = crypto.randomBytes(32).toString("hex");
  return secret;
}

// Create a secret key
const secretKey = generateSecretKey();

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    
    const { email, password } = req.body;
  
    // Check if user exist is correct
    const  user = await User.findOne({email}); // .select('+password')
    if(!user){
      return res.status(401).json({message : 'Utilisateur introuvable.'})
    }
    // Compare passwords
    const userPassword =  await bcrypt.compare(password, user.password);
    if(!userPassword) {
      return res.status(401).json({message : 'Mot de passe incorrect.'})
    }
    // Create a JWT
    const token = jwt.sign({userId:user._id}, secretKey)
    res.status(200).json({token});
  } catch (error) {
    console.log(error, "Echec de connection");
  }

});

// // User's add address endpoint
// app.post("/addresses",async (req,res) => {
//   try {
//     const {userId, address} = req.body;

//     // Get the user from the database using his id
//     const user = await  User.findById(userId);

//     if(!user) {
//       return res.status(404).json({message: "L'utilisateur n'existe pas."});
//     }

//     // Add the new adress to the users addresses list
//     user.addresses.push(address);

//     // Save this modification in the database
//     await user.save();

//     res.status(200).json({message: "Adresse ajoutée avec succés."});
    
//   } catch (error) {
//     res.status(500).json({message: "Erreur d'enregistrement ! Veuillez réessayer"})
//   }
// });

// // Retrieve an user's addresses by its ID
// app.get("/addresses/:userId", async (req ,res) => {
//   try {
//     const userId = req.params.userId;

//     // Find user  with given Id and return it along with its addresses
//     const user = await User.findById(userId);
    
//     if(!user) {
//       return res.status(404).json({message: "L'utilisateur n'existe pas."});
//     }

//     const addresses = user.addresses;

//     // Get all addresses of a specific user
//     res.status(200).json({addresses});
  
//   } catch (error) {
//     res.status(500).json({message: "L'adresse n'a pas été trouvé !"});
//   }
// });


//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});


// Mongo DB connection setup
mongoose.connection.once("open", () => {
  console.log("App connected to MongoDB");
  //Start the server
  app.listen(PORT, () => console.log(`Server is running on ${APP_URL}:${PORT}`))
});
