const lib = require("./lib.js")
async function run(jobID, dataInput){
     /**
     * Build/Run the model
     * @param  {jobID}                    string   jobID of the job.
     * @param  {dataInput}                string   s3 url of the dataset.
     * @return {insightsDataFileLocation} string   location of the insights file. 
     */
     
    let insightsData 
    //Call your model and get the insights results
    
    // const ENDPOINT_NAME = process.env.ENDPOINT_NAME;
    // const { SageMakerClient, AddAssociationCommand } = require("@aws-sdk/client-sagemaker");
    // const client = new SageMakerClient({ region: "REGION" });
    // const params = {
    //     /** input parameters */
    // };
    // const command = new AddAssociationCommand(params);
    // // async/await.
    // try {
    //     const data = await client.send(command);
    //     // process data.
    // } catch (error) {
    //     // error handling.
    // } finally {
    //     // finally.
    // } 
    
    insightsData = "insights data" 
    const insightsDataFileLocation = "/tmp/" + jobID + "-insights.csv"
    //steps to write data to insightsDataFileLocation
    const insightsWriteResponse = await lib.write(insightsDataFileLocation, insightsData) 
        
    return insightsDataFileLocation
}



module.exports = {
    run : run
}
