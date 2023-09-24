const db = require("../models"); 
const auth = require("../middleware/auth")
const fs = require("fs");
const xss = require("xss");

// CREATION d'un POST
exports.createPost = async (req, res, next) => {
    try {
        const userId = auth.getUserID(req);
        const user = await db.User.findOne({ where: { id: userId } });
        if(user !== null) { 
            if(!req.body.title || !req.body.content){
                res.status(403).json({ message: "Merci de renseigner le titre et le corps du message" });
            } else {
                const myPost = await db.Post.create({
                    title: xss(req.body.title),
                    content: xss(req.body.content),
                    UserId: user.id,
                }); 
                res.status(200).json({ post: myPost, message: "Post ajouté" });
            }
        }
        else {
            return res.status(403).json({ error: "Le post n'a pas pu être ajouté" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur Serveur" });
    }
};

// AFFICHER un POST
exports.getOnePost = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ 
            attributes: ["id", "title", "content"], 
            where: { id: req.params.id } 
        });
        res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: "Erreur Serveur" });
    }
};
