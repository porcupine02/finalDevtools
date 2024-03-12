const express = require("express")
const {admin} = require("../config");


router = express.Router();


router.get("/", async (req, res) => {
    const db = admin.firestore();
    let customRef = db.collection("Users");

    customRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is a function to retrieve the data of the document
        console.log(doc.id, " => ", doc.data());
      });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
    
 
     res.send({msg:"User"})
});

router.post("/create", async (req, res) => {
  
  res.send({ msg: "User Added" });
});

router.post("/update", async (req, res) => {


  res.send({ msg: "Updated" });
});

router.post("/delete", async (req, res) => {

  res.send({ msg: "Deleted" });
});



exports.router = router;