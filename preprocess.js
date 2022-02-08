const lib = require("./lib.js")
const csv = require('csv-parser');
const fs = require('fs');

async function run(jobID, url, JSON) {
     /**
     * preprocess the data for model input.
     * @param  {jobID} string   jobID of the job.
     * @param {url}    string   s3 url of the dataset.
     * @param {JSON}   json     json data from user.
     * @return {inputPayloadForService} string/json payload for the model
     */
    console.log("printing here",JSON)
    console.log("printing here url",url)
    let inputPayloadForService 
    
    //if both json and url are null, sending the empty string to model.
    if ((!JSON) && (!url)) {
        inputPayloadForService = ''
        return inputPayloadForService
    } //if url is null, send the json to model.
    else if (url == '' && JSON ) {
        inputPayloadForService = JSON['body']
        return inputPayloadForService
    } //if json is null
    else if (JSON == '' && url ){
        //check if zip  
        const downlaodedFilePath = await lib.downloadFile(jobID, url)
        const fileName = url.split("/").pop();
        if (fileName.endsWith('.zip')){
            const targetFolder = "/tmp/preprocess/" + fileName.replace(".zip", "")
            console.log("Zipped File") 
            await lib.extractZipFile(downlaodedFilePath, targetFolder)
            
            const fileList =  await lib.listFiles(targetFolder)
            inputPayloadForService = await lib.readFile(fileList[0])
            return inputPayloadForService
        }
        else {
            inputPayloadForService = await lib.readFile(downlaodedFilePath)
            console.log("Downloaded File Content: " + inputPayloadForService)
            return inputPayloadForService 
        }
    } // if both json and url
    else {
        const  urlData = await lib.downloadFile(jobID, url)
        urlDatacontent = await lib.readFile(downlaodedFilePath)
        const  jsonData = JSON['body']
        const inputPayloadForService = [urlDatacontent,jsonData]
        return inputPayloadForService
    }
    
}

module.exports = {
    run : run
}