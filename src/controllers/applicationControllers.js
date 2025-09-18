const Application = require('../Models/applicationModel')

async function addApplication(req, res) {
  const {user_id, category_id, years_of_experience, field_id} = req.body;

  try{
    const result = await Application.createApplication(user_id, category_id, years_of_experience, field_id);

    res.status(201).json({message: 'Application submitted Successfully'})
  }catch(err){
    console.error('Error creating application: ', err);
    res.status(500).json({error: 'Internal Server Error'})
  }
}

async function removeApplication(req, res) {
  const { id } = req.params;

  try {
    const result = await Application.deleteApplication(id);

    if(result.affectedRows === 0){
      return res.status(404).json({message: 'Application not found'})
    }

    res.status(201).json({message: 'Application deleted successfully'})
  } catch (error) {
    console.error('Error creating user: ',error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


module.exports = {addApplication, removeApplication}