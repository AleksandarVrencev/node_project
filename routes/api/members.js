const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');
const min = 1;
const max = 100;

//gets all members
router.get('/', (req, res) => {
    res.json(members);
});

//get single member with id
router.get('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else { 
        res.status(400).json({ msg: `nema oglasa sa id: ${req.params.id}`});
    }
});

//get single member with cena
// router.get('/:cena', (req, res) =>{
//     const aca = members.some(member => member.cena === parseInt(req.params.cena));
//     if(aca){
//         res.json(members.filter(member => member.cena === parseInt(req.params.cena)));
//     }
//     else { 
//         res.status(400).json({ msg: `nema oglasa sa !!!: ${req.params.cena}`});
//     }
// });

//create member
router.post('/', (req, res) => {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
     const new_member = {
        id: getRandomInt(min,max),
        name: req.body.name, 
        email: req.body.email, 
        kategorija: req.body.kategorija, 
        tekst: req.body.tekst, 
        cena: req.body.cena, 
        valuta: req.body.valuta,
        datum: req.body.datum,
        tagovi: req.body.tagovi
     }

     if(!new_member.name || !new_member.email){
        return res.status(400).json({msg: 'please include a name and email'});
     }

    members.push(new_member);
    // res.json(members); 
    res.redirect('/');    
});

//update member 
router.put('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const update_member = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = update_member.name ? update_member.name : member.name;
                member.email = update_member.email ? update_member.email : member.email;
                member.id = update_member.id ? update_member.id : member.id;
                member.kategorija = update_member.kategorija ? update_member.kategorija : member.kategorija;
                member.tekst = update_member.tekst ? update_member.tekst : member.tekst;
                member.cena = update_member.cena ? update_member.cena : member.cena;
                member.valuta = update_member.valuta ? update_member.valuta : member.valuta;
                member.datum = update_member.datum ? update_member.datum : member.datum;
                member.tagovi = update_member.tagovi ? update_member.tagovi : member.tagovi;
                res.json({msg: 'member updated', member});
            }
        });
    }
    else { 
        res.status(400).json({ msg: `no member with id of ${req.params.id}`});
    }
});

//delete member
router.delete('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({ 
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id)),
            members: members.splice(members.indexOf(req.params.name))
        });
    } else { 
        res.status(400).json({ msg: `no member with id of ${req.params.id}`});
    }
});

module.exports = router;