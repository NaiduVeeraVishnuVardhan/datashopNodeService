const port = 'http://13.239.0.148:8000'
async function updateJob(jobID, insightsS3Link) {
    /**
     * updating the job with insights link in the datashop.
     * @param  {jobID}                    string   jobID of the job.
     * @param  {insightsS3Link}           string   s3 url of the insights.
     * @return {statusObject}             object   contains status code and message.
     */
    const statusObj = {
        status : "",
        message: ""
    }

    var axios = require('axios');
    const updateJobLink = port + '/api/job/updateJob'

    var data = JSON.stringify({
        "insightFileURL": insightsS3Link,
        "jobid": jobID
    });

    var config = {
        method: 'put',
        url: updateJobLink,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    await axios(config)
        .then(function (response) {
            statusObj.status = response.data.statusCode
            statusObj.message = response.data.message
            
        })
        .catch(function (error) {
            console.log(error);
        });
    return statusObj    
}

async function uploadDocument(file_name, file_path){
     /**
     * uploading document to s3
     * @param  {file_name}   string   File name.
     * @param  {file_path}   string   File path
     * @return {url}         object   downloadable url link.
     */
    var axios = require('axios');
    var FormData = require('form-data');
    var fs = require('fs');
   
    const dataShopUploadURL = port + '/api/upload/uploadDocument'
    var data = new FormData();
    data.append('documentFile', fs.createReadStream(file_path+file_name));
    
    var config = {
        method: 'post',
        url: dataShopUploadURL,
        headers: {
            ...data.getHeaders()
        },
        data : data
    };
    
    await axios(config)
        .then(function (response) {
            downloadFileUrl = response.data
            url = downloadFileUrl.data["documentFileUrl"]["original"]
            
        })
        .catch(function (error) {
            console.log(error);
        });
    return url

}

async function uploadImage(fileName, filePath){
    /**
     * uploading image to s3
     * @param  {file_name}   string   image File name.
     * @param  {file_path}   string   image File path
     * @return {url}         object   downloadable url link.
     */
    var axios = require('axios');
    var FormData = require('form-data');
    var fs = require('fs');
    var data = new FormData();

    const dataShopUploadURL = port +"/api/upload/uploadImage"
    data.append('imageFile', fs.createReadStream(filePath+fileName));

    var config = {
        method: 'post',
        url: dataShopUploadURL,
        headers: {
            ...data.getHeaders()
        },
        data : data
    };

    await axios(config)
        .then(function (response) {
            downloadFileUrl = response.data
            url = downloadFileUrl.data["documentFileUrl"]["original"]

        })
        .catch(function (error) {
            console.log(error);
        });
    return url
}

module.exports = {
    uploadDocument : uploadDocument,
    uploadImage : uploadImage,
    updateJob : updateJob
}