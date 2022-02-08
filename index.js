const runModel = require("./model.js");
const preprocess = require("./preprocess.js");
const postprocess = require("./postprocess.js")

exports.handler = async (event) => {
    //Loads the body of the event.
    let inputdata = JSON.parse(event["body"])
    
    //running the preprocessing steps for the model. It takes dataset URL, json and jobID as input, download the dataset and read the input.
    const inputPayloadForService = await preprocess.run(inputdata["jobID"], inputdata["dataFileURL"]["url"],inputdata["dataFileURL"]["json"])
    
    //model buliding/ getting the predictions here. It takes jobID and inputPayloadForService as input, run the model and get precitions saved in the temp folder of lambda.
    const insightsFileLocation = await runModel.run(inputdata["jobID"], inputPayloadForService)
    
    //It takes insightsDataFileLocation, jobID as Input, upload the insights file to s3 and get the downloadable link for the same. and also send the jobID and insights link to the Datashop application.
    const statusObject = await postprocess.run(inputdata["jobID"], insightsFileLocation)

    const response = {
        statusCode: statusObject.status,
        body: JSON.stringify(statusObject.message),
    };
    
    return response;
};

