const express = require("express")
const { admin } = require("../config");

router = express.Router();

router.get("/bills", async (req, res) => {
    const db = admin.firestore();
    try {
        const billsCollectionRef = db.collection('Bills');
        const billsSnapshot = await billsCollectionRef.get();
        const bills = [];
        billsSnapshot.forEach((doc) => {
            const billData = doc.data();
            const billId = doc.id;
            bills.push({ id: billId, ...billData });
        });
        res.send(bills);
    } catch (error) {
        console.error('Error get bills:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get("/bill/:id", async (req, res) => {
    const db = admin.firestore();
    const billId = req.params.id;
    try {
        const billDoc = await db.collection('Bills').doc(billId).get();
        if (!billDoc.exists) {
            return res.status(404).send({ error: 'Bill not found' });
        }
        const billData = billDoc.data();
        res.send(billData);
    } catch (error) {
        console.error('Error fetching Bill:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post("/bills", async (req, res) => {
    const db = admin.firestore();
    const { bills } = req.body;
    console.log('Bills in backend', bills)
    try {
        await db.collection('Bills').add(bills[0]);
        res.send({ msg: "Bills added successfully" });
    } catch (error) {
        console.error('Error adding bills:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


router.delete("/bill/:id", async (req, res) => {
    const db = admin.firestore();
    const billId = req.params.id;
    try {
        const billDoc = await db.collection('Bills').doc(billId).get();
        if (!billDoc.exists) {
            return res.status(404).send({ error: 'Bill not found' });
        }
        await db.collection('Bills').doc(billId).delete();

        res.send({ msg: "Bill deleted successfully" });
    } catch (error) {
        console.error('Error deleting Bill:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.get("/memberBill", async (req, res) => {
    const db = admin.firestore();
    try {
        const billsCollectionRef = db.collection('BillsMember');
        const billsSnapshot = await billsCollectionRef.get();
        const bills = [];
        billsSnapshot.forEach((doc) => {
            const memberData = doc.data();
            const memberId = doc.id;
            bills.push({ id: memberId, ...memberData });
        });
        res.send(bills);
    } catch (error) {
        console.error('Error get bills:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.post("/memberBill", async (req, res) => {
    const db = admin.firestore();
    const member = req.body;
    console.log("member", member)
    try {
        await db.collection('BillsMember').add(member);
        res.send({ msg: "Bills Member added successfully" });
    } catch (error) {
        console.error('Error adding bills member:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.delete("/memberBill/:id", async (req, res) => {
    const db = admin.firestore();
    const billId = req.params.id;
    try {
        const billDoc = await db.collection('BillsMember').doc(billId).get();
        if (!billDoc.exists) {
            return res.status(404).send({ error: 'Bill not found' });
        }
        await db.collection('BillsMember').doc(billId).delete();

        res.send({ msg: "Bill deleted successfully" });
    } catch (error) {
        console.error('Error deleting Bill:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

exports.router = router;