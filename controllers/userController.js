const User = require('../models/User');

// Controller function to get user profile by ID
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID, exclude password field
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the required user info
    res.status(200).json({
      id: user._id,
      username: user.username,
      bio: user.bio,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
 const updateUserprofile = async(req, res) =>{
 try{
    const jwtUserId = req.user.id;
    const jwtUsername = req.user.username;
    // Data from the headers (you can retrieve this but should not trust it over JWT)
    const headerUserId = req.header('userId');
    // const headerUsername = req.header('username');
    if (headerUserId && headerUserId !== jwtUserId) {
        return res.status(400).json({ 
          success: false, 
          message: 'User ID in headers does not match the authenticated user.' 
        });
      }
      const { username, bio, profilePicture } = req.body;

    // Update user profile in the database
    await User.findByIdAndUpdate(jwtUserId, {
      username: username || jwtUsername, // Update with the provided or existing JWT username
      bio,
      profilePicture
    });

    // Send success response
    res.json({
      success: true,
      message: 'Profile updated',
    });
  }catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  } 
 }
 

module.exports = {
  getUserProfile,
  updateUserprofile
};
