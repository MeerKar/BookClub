const db = require("../config/connection");
const { User, Book, Review, Club } = require("../models");
const userSeeds = require("./userSeeds.json");
const bookSeeds = require("./bookSeeds.json");
const reviewSeeds = require("./reviewSeeds.json");
const clubSeeds = require("./clubSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Book", "books");
    await cleanDB("User", "users");
    await cleanDB("Review", "reviews");
    await cleanDB("Club", "clubs");

    await User.create(userSeeds);

    for (let i = 0; i < bookSeeds.length; i++) {
      const { _id, author } = await Book.create(bookSeeds[i]);
      await User.findOneAndUpdate(
        { username: author },
        {
          $addToSet: {
            books: _id,
          },
        }
      );
    }

    for (let i = 0; i < clubSeeds.length; i++) {
      const { _id, books, users } = await Club.create(clubSeeds[i]);
      await Book.updateMany(
        { _id: { $in: books } },
        {
          $addToSet: {
            clubs: _id,
          },
        }
      );
      await User.updateMany(
        { _id: { $in: users } },
        {
          $addToSet: {
            clubs: _id,
          },
        }
      );

    }for (let i = 0; i < reviewSeeds.length; i++) {
      const { _id, books, users } = await Review.create(reviewSeeds[i]);
      await Book.updateMany(
        { _id: { $in: books } },
        {
          $addToSet: {
            clubs: _id,
          },
        }
      );
      await User.updateMany(
        { _id: { $in: users } },
        {
          $addToSet: {
            clubs: _id,
          },
        }
      );
    }

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
