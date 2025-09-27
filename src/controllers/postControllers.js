const Posts = require('../Models/PostModel')
require('dotenv').config()

async function addPost(req, res) {
  const {post, department, creator, title, description, requirements, open_date, close_date} = req.body;

  try{
    const result = await Posts.createPost(post, department, creator, title, description, requirements, open_date, close_date);

    res.status(201).json({message: 'Post added Successfully'})
  }catch(err){
    console.error('Error creating application: ', err);
    res.status(500).json({error: 'Internal Server Error'})
  }
}

async function removePost(req, res) {
  const { id } = req.params;

  try {
    const result = await Posts.deletePost(id);

    console.log(result)

    if(result.affectedRows === 0){
      return res.status(404).json({message: 'No post found'})
    }

    res.status(201).json({message: 'Post deleted successfully'})
  } catch (error) {
    console.error('Error creating user: ',error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


module.exports = {addPost, removePost}