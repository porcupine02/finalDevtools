const express = require("express")
const {admin} = require("../config");

router = express.Router();

router.get("/place/:id", async (req, res) => {
    const db = admin.firestore();
    const placeId = req.params.id;
    try {
        const placeDoc = await db.collection('listTrips').doc(placeId).get();
        if (!placeDoc.exists) {
            return res.status(404).send({ error: 'place not found' });
        }
        const placeData = placeDoc.data();
        res.send(placeData);
    } catch (error) {
        console.error('Error fetching place:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get("/places", async (req, res) => {
    const db = admin.firestore();
    try {
        const placesSnapshot = await db.collection('place').get();
        const places = [];
        
        placesSnapshot.forEach((doc) => {
            places.push(doc.data());
        });
    
        res.send(places);
      } catch (error) {
        console.error('Error get places:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
  });

  router.get("/place/:name", async (req, res) => {

    const db = admin.firestore();
    const namePlace = req.params.name;
    try {
       
        const placesSnapshot = await db.collection('place').get();
        const places = [];
        
        placesSnapshot.forEach((doc) => {
            places.push(doc.data());
        });
    
        res.send(places);
      } catch (error) {
        console.error('Error get places:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
  });

  router.post("/trip", async (req, res) => {
    console.log(req.body.trip)
    const db = admin.firestore();
    // const {trip} = req.body;
    try {
      const docRef = await db.collection('listTrips').add(req.body);
        res.send({ msg: "trip added successfully" , id: docRef.id});
      } catch (error) {
        console.error('Error adding trip:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
  });

exports.router = router;