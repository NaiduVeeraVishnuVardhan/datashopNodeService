const fs = require('fs');
var axios = require('axios');
const AdmZip = require('adm-zip');

async function write(file, fileContent) {
     /**
     * writing files
     * @param  {file}          string   path of the file.
     * @param {fileContent}    string  data in the file.
     */
    
    try {
        fs.writeFileSync(file, fileContent);
        return {
            statusCode: 200,
            body: 'data was written'
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: 'data was not written'
        };
    }
};

async function downloadFile(jobID, downloadURL){
    /**
     * download the data from s3 url
     * @param  {jobID}         string   jobID of the job.
     * @param {downloadURL}    string   s3 url of the dataset.
     * @return {fullFilePath}   string  file path of downloaded file.
     */
    
    const fileName = downloadURL.split("/").pop();
    const fullFilePath = "/tmp/" + jobID + "-" + fileName
    const response = await axios.get(downloadURL)
    const fileContent = response["data"]
    const fileWriteResponse = await write(fullFilePath, fileContent)


    return fullFilePath
}

async function readFile(path) {
    /**
     * download the data from s3 url
     * @param  {path}   string  path of the file to be read.
     * @return {data}   string  content of file.
     */
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function extractZipFile(source, target){
    const promisify = require('util.promisify')
    
    console.log("Source Folder: " + source)
    console.log("Target Folder: " +  target)
    
    const zip = new AdmZip(source)
     const pExtractAll = promisify(zip.extractAllToAsync.bind(zip))
     await pExtractAll(`${target}/..`, false)
}


async function listFiles(directory){
    const files = []
    const fs = require('fs');
    
    fs.readdir(directory, (err, files) => {
        if (err) {
             throw err
            }
        files.forEach(file => {
        files.push(file)
        });
    });
}

module.exports = {
    write : write,
    readFile: readFile,
    downloadFile : downloadFile,
    extractZipFile: extractZipFile,
    listFiles: listFiles
}
