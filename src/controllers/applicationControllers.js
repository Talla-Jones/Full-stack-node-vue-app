const Application = require('../Models/applicationModel')
require('dotenv').config()

async function addApplication(req, res) {
  const {application, post, applicant, cover_letter, notes} = req.body;

  try{
    const result = await Application.createApplication(post, applicant, cover_letter, notes);

    res.status(201).json({message: 'Application submiitted Successfully'})
    return result;
  }catch(err){
    console.error('Error creating application: ', err);
    res.status(500).json({error: 'Internal Server Error'})
  }
}

async function removeApplication(req, res) {
  const { id } = req.params;

  try {
    const result = await Application.deleteApplication(id);

    console.log(result)

    if(result.affectedRows === 0){
      return res.status(404).json({message: 'No application found'})
    }

    res.status(201).json({message: 'Application deleted successfully'})
  } catch (error) {
    console.error('Error creating user: ',error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


module.exports = {addApplication, removeApplication}