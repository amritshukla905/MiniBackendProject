import express from "express";
const router = express.Router();
// it is use to send the request to the correct place
let users = [];
// it is an empty array
router.get("/",(req,res)=>{
    res.json(users);
});

router.post("/",(req,res)=>{
    const user = {
        id:Date.now(),
        ...req.body
    };

    users.push(user);
    res.json(user);
});
// here you get to know what will happen if someone use post 
//method , it will create a new stuff and add to the arry of users and
// and send created user as JSON response and back to frontend

router.put("/:id",(req,res)=>{
    users = users.map(u=>u.id == req.params.id?{
        ...u,...req.body
    }
    :u
);
res.json({
    message:"updated"
});
});

router.delete("/:id",(req,res)=>{
    users = users.filter(
        u=>u.id!=req.params.id
    );
    res.json({
        message:"deleted"
    });
});

export default router;