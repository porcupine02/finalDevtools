const express = require("express")
const {admin} = require("../config");


router = express.Router();


router.get("/users", async (req, res) => {
     console.log(admin)
     
     res.send({msg:"User"})
});

router.post("/register", async (req, res) => {
    const {email, password} = req.body
  const userResponse = await admin.auth().createUser({
    email : email,
    password : password,
    emailVerified : false,
    disabled : false
  })

  await admin.firestore().collection('Users').doc(userResponse.uid).set({
    email: email,
    password : password
    // You can add more fields here as needed
  });
  res.status(200).json(userResponse)
});

router.post("/login", async (req, res) => {

    const users = [];
    const { email, password } = req.body;


    const user = await admin.firestore().collection('Users').get();

    user.forEach((doc) => {
        const emailDb = doc.data().email;
        const passwordDb = doc.data().password

        if(email === emailDb && password === passwordDb){
            console.log("email is valid")
            users.push(doc.data());
        }
   
      });
    console.log("user " + users)


    try {
        const emailCorrect =  users[0].email
        
        const userRecord = await admin.auth().getUserByEmail(emailCorrect);

        res.status(200).json(userRecord); 
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(400).send({ message: 'Login failed', error: error.message });
      }
   
//   res.send({ msg: "login" });
});

router.post("/forgot", async (req, res) => {

  res.send({ msg: "Deleted" });
});



exports.router = router;