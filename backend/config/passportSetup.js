import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/userModel.js";
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const GOOGLE_CLIENT_ID =
  "214535411588-vbejcbt5m2i7bhfgs7uuo7pub3097b2k.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "gIwrrJj94AQldJTN7iaeY1Nc";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userExist = await User.findOne({ googleId: profile.id });
      if (userExist) {
        done(null, userExist);
      } else {
        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "123",
        });
        done(null, newUser);
      }
    }
  )
);
export default passport;
