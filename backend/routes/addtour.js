const express = require("express")
const {admin} = require("../config");


router = express.Router();



router.get("/addtour", async (req, res) => {

    const db = admin.firestore();
    try {
       
        const addtourSnapshot = await db.collection('TourDate').get();
        const tourdate = [];
        
        addtourSnapshot.forEach((doc) => {
          tourdate.push(doc.data());
        });
    
        res.send(tourdate);
      } catch (error) {
        console.error('Error get comment:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
  });


router.post("/addtour", async (req, res) => {
    console.log(req.body.StartDate)
    console.log(req.body.EndDate)
    console.log(req.body.Tour)
    const db = admin.firestore();
    const {StartDate, EndDate, Tour} = req.body;
    try {
        await db.collection('TourDate').add({
          StartDate: StartDate,
          EndDate: EndDate,
          Tour : Tour
        });
        res.send({ msg: "Add Tour successfully" });
      } catch (error) {
        console.error('Error adding tour:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
  });



exports.router = router;