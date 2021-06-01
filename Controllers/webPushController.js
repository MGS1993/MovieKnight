const webPush = require('web-push');
const userModel = require('../models/userModel');

// TODO Make subscribe check if the data has changed before updating it
exports.subscribe = async (req, res) => {
  try {
    // Get pushSubscription object from client
    const subscription = req.body;
    // Get user to compare subscriptions
    const user = await userModel.findById(subscription.userId);
    // Only runs if req endpoint is different than userModel endpoint
    if (
      subscription.userId !== null &&
      subscription.endPoint !== user.subscription.endPoint
    ) {
      await userModel
        .findOneAndUpdate(
          { _id: subscription.userId },
          { $set: { subscription: subscription } },
          {
            upsert: true,
            new: true,
          }
        )
        .exec();

      // Send back 201 - resource created successfully
      res.status(201).json({ msg: "User subscription updated successfully" });
    } 
    
  } catch ( err ) {
    console.log(err)
    res
    .status(500)
    .json({msg: 'Oops! Something went wrong'})
  }
}