


module.exports.visionapi = async (image) => {
    try{
        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');
    
        // Creates a client
        const client = new vision.ImageAnnotatorClient();
    
        // Performs label detection on the image file
        const [result] = await client.objectLocalization(image);
        let labels = result.localizedObjectAnnotations;

        //filtering labels with name as Person
        labels = labels.filter(label=>{
        if(label.name==='Person')
            return label;
        });

        return labels;
        // labels.forEach(label => console.log(label, label.boundingPoly.normalizedVertices));
    }
    catch(err){
        throw new Error('Image-Annotation-service :: Image processing error');
    }
}