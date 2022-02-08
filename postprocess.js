const api = require('./datashopService.js');
async function run(jobID, dataLocation){
    /**
     * postprocess - upload the insights to s3 and update the datashop.
     * @param  {jobID}                    string   jobID of the job.
     * @param  {dataInput}                string   s3 url of the dataset.
     * @return {statusObject}             object   contains status code and message. 
     */
    var insightsS3Link,statusObject;
    
    const fileName = dataLocation.split("/").pop()
    const filePath = dataLocation.replace(fileName, "")
    
    if(fileName.endsWith(".csv") || fileName.endsWith(".zip") ){
        insightsS3Link = await api.uploadDocument(fileName, filePath) 
        statusObject = await api.updateJob(jobID, insightsS3Link)
    }
    
    else if (fileName.endsWith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif'))){
        insightsS3Link = await api.uploadImage(fileName, filePath)
        statusObject = await api.updateJob(jobID, insightsS3Link)
    }
    
    //other format files goes here 
    else {
    statusObject = await api.updateJob(jobID, insightsS3Link)
    }
    
    return statusObject
}

module.exports = {
    run : run
}