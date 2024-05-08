const { visionapi } = require("../services/vision-api");

module.exports.process = async( req, res, next) => {
    try{
        if(!req.file)
            res.status('400').json({message: 'invalid file received'});
        const metadata = await visionapi(req.file.location);
        res.status(200).json({...metadata, img_url: req.file.location});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'something went wrong while processing the image'});
    }
}
