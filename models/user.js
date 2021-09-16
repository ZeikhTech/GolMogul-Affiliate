const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-type-url");
require("mongoose-type-email");

const userSchema = new Schema(
  {
    created: {
      type: Date,
      // required: true,
      default: Date.now(),
    },
    sessionActivity: {
      lastActive: Date,
      sessionCount: Number,
      meanMinutesBetweenSessions: Number,
    },
    name: {
      // publicly visible
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    // TODO add privacy controls for who can see this info
    dateOfBirth: {
      type: String,
    },
    // password not required upon sign up, as user can get an email later on to set it
    password: {
      type: String,
    },
    followersCount: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    email: {
      address: {
        type: String,
        // sparse: true,
        // unique: true,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      lastUpdated: {
        type: Date,
      },
    },
    inviteCode: {
      type: String,
      unique: false,
    },
    inviteCode: {
      type: String,
      unique: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Affiliate", "Follower"],
    },
    phone: {
      number: {
        type: String,
        validate: {
          validator(v) {
            return v.length > 6 && v.length < 20; // just make sure the number is a realistic length
          },
          message: "{VALUE} is not a valid phone number.",
        },
        sparse: true,
        unique: true,
      },
      isVerified: Boolean,
      lastUpdated: Date,
    },
    headline: {
      // publicly visible
      type: String,
      maxlength: 42,
    },

    privacy: {
      // account privacy
      friends: {
        // controls who can view who I'm friends with [NOTE: only as long as those friends have also made themselves visible to the person viewing my friends list]
        type: String,
        enum: [
          "Public", // everyone can see who I'm friends with
          "Mutual", // anyone can see the friends we have in common
          "Friends", // friends can see who I'm friends with
          "CloseFriends", // designated friends can see who I'm friends with
          "Private", // only I can know who I'm friends with
        ],
      },
      // profile: {
      // 	type: String,
      // 	enum: [
      // 		'Public', // everyone can see my profile
      // 		'Friends', // only friends can see my profile
      // 		'Private', // only I can see my profile
      // 	],
      // },
    },
    profile: {
      about: String,
      pointsEarned: Number,
      lastUpdatedPointsEarned: Date,
      views: Number,
      location: String,
      elevatorPitch: {
        type: String,
        maxlength: 250,
      },
      image: {
        type: String, // id of s3 object
        validate: {
          validator(v) {
            return v.length > 5;
          },
          message: "Invalid image",
        },
      },
      occupation: {
        type: String,
        maxlength: 42,
      },
      badges: {
        milestoneBadge: {
          currentMilestone: Number,
          isAwardAlertShown: Boolean,
        },
      },
    },
    notificationPreferences: {
      expoPushTokens: [String],
      fcmPushTokens: [String],
      pushDisabled: Boolean,
      emailDisabled: Boolean,
      lastPushSentDate: Date,
    },
    chatNotificationPreferences: {
      pushDisabled: Boolean,
      mutedChatRoomRefs: [
        {
          type: Schema.ObjectId,
          ref: "chatrooms",
        },
      ],
    },
    inviteCode: {
      type: String,
      // sparse: true,
      // unique: true,
    },
    invitedBy: {
      type: Schema.ObjectId,
      ref: "users",
    },
    FirstDegreeCount: {
      type: Number,
    },
    SecondDegreeCount: {
      type: Number,
    },
    isDeleted: {
      default: false,
      type: Boolean,
      sparse: true,
    },
    followersPerDay: {
      type: Array,
    },
    followersPerMonth: {
      type: Array,
    },

    followersPerYear: {
      type: Array,
    },

    affiliatesPerDay: {
      type: Array,
      // sparse: true,
      // unique: true,
    },
    affiliatesPerMonth: {
      type: Array,
      // sparse: true,
      // unique: true,
    },
    affiliatesThisYear: {
      type: Array,
      // sparse: true,
      // unique: true,
    },
    allUsersPerDay: {
      type: Array,
      // sparse: true,
      // unique: true,
    },
    allUsersPerMonth: {
      type: Array,
      // sparse: true,
      // unique: true,
    },
    allUsersThisYear: {
      type: Array,
      // sparse: true,
      // unique: true,
    },
    tiersCount: {
      tier1Count: Number,
      tier2Count: Number,
    },

    isOnBoarded: Boolean,
    favoriteTribes: [
      {
        type: Schema.ObjectId,
        ref: "tribes",
      },
    ],
  },

  { usePushEach: true }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
