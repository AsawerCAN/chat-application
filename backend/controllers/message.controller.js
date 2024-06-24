import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // Save the new message and the conversation in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Error sending message" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Actusl Messages instead of refrence

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Error getting message" });
  }
};
