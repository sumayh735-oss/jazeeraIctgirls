const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const fullName = profile.displayName;

          const { sequelize } = require("./database");

          const [users] = await sequelize.query(
            "SELECT * FROM users WHERE email = ?",
            { replacements: [email] }
          );

          let user = users[0];

          if (!user) {
            await sequelize.query(
              `INSERT INTO users (fullName, email, password, role, createdAt, updatedAt)
               VALUES (?, ?, ?, ?, NOW(), NOW())`,
              {
                replacements: [fullName, email, "google_auth", "student"],
              }
            );

            const [newUser] = await sequelize.query(
              "SELECT * FROM users WHERE email = ?",
              { replacements: [email] }
            );

            user = newUser[0];
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
};