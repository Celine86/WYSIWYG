const db = require("../models"); 
const auth = require("../middleware/auth")

// AJOUT d'une IMAGE
exports.addImage = async (req, res, next) => {
    try {
        let imageUrl = "";
        const userId = auth.getUserID(req);
        const user = await db.User.findOne({ where: { id: userId } });
        if(user !== null) { 
            if (req.file) {
                imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                const myImage = await db.Image.create({
                    UserId: user.id,
                    imageUrl: imageUrl,
                }); 
                res.status(200).json({ myImage: myImage.imageUrl, message: "Image ajoutée" });
            } else {
                res.status(403).json({ message: "Merci de rajouter une image" });
            }
        }
        else {
            return res.status(403).json({ error: "Merci de vous connecter" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur Serveur" });
    }
};


