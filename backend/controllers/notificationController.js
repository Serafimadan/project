import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

export const notificationForUserCreateArt = async (
  userId,
  artOnwerId,
  productId,
  message
) => {
  const notification = new Notification({
    user: userId,
    product: productId,
    message: `${message}`,
    users: [{ userId: artOnwerId, isRead: false }],
  });
  await notification.save();
};

export const createValidateArtNotification = async (
  userId,
  productId,
  productName
) => {
  const userCreatedNotification = await User.findById(userId);

  const allUsers = await User.find({});

  const notifiedUsers = allUsers
    .filter((user) => user.isExpert && user._id.toString() !== userId.toString())
    .map((user) => {
      return { userId: user._id, isRead: false };
    });

  if (notifiedUsers.length > 0) {
    const notification = new Notification({
      user: userId,
      product: productId,
      message: `${userCreatedNotification.name} added ${productName}, please validate it`,
      users: notifiedUsers,
    });
    await notification.save();
  }
};

export const createNotification = async (
  userId,
  productId,
  type,
  productName
) => {
  const userCreatedNotification = await User.find({ _id: userId });

  const allUsers = await User.find({});
  const notifiedUsers = allUsers
    .map((user) => {
      return { userId: user._id, isRead: false };
    })
    .filter((user) => user.userId.toString() !== userId.toString());

  const notification = new Notification({
    user: userId,
    product: productId,
    message: `${userCreatedNotification[0].name} ${type} ${productName}`,
    users: notifiedUsers,
  });
  await notification.save();
};

const getNotificationForOneUser = async (schema, userId) => {
  const allNotification = await schema.find();

  const userNotification = allNotification
    .filter(
      (notification) =>
        notification.users.filter(
          (user) => user.userId.toString() === userId.toString()
        ).length > 0
    )
    .map((notification) => {
      const userObject = notification.users.filter(
        (user) => user.userId.toString() === userId.toString()
      );
      const notifications = {
        ...notification,
        _doc: { ...notification._doc, users: userObject },
      };
      return notifications._doc;
    })
    .reverse();

  return userNotification;
};

// Get Notifications: GET /api/notification (private)
const getNotification = asyncHandler(async (req, res) => {
  const userNotification = await getNotificationForOneUser(
    Notification,
    req.user._id
  );

  res.status(200).json(userNotification);
});

// Update(delete) Notifications: PUT /api/notification/:id (private)
// Remove the user id from the users array to remove the notification from his screen.
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  const userId = req.user._id;

  if (notification) {
    const userIdsArray = notification.users.filter(
      (user) => user.userId.toString() !== userId.toString()
    );
    if (userIdsArray.length === 0) {
      await notification.remove();
    } else {
      notification.users = userIdsArray;
      await notification.save();
    }

    const userNotification = await getNotificationForOneUser(
      Notification,
      req.user._id
    );

    res.status(200).json(userNotification);
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});

// Update Notifications: PUT /api/notification/read/:id (private)
// mark the notifications as read.
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  const userId = req.user._id;

  if (notification) {
    const userIdsArray = notification.users.map((user) => {
      if (user.userId.toString() === userId.toString()) {
        return { ...user, isRead: true };
      } else {
        return user;
      }
    });

    notification.users = userIdsArray;
    await notification.save();

    const userNotification = await getNotificationForOneUser(
      Notification,
      req.user._id
    );

    res.status(200).json(userNotification);
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});

export { getNotification, deleteNotification, markAsRead };
