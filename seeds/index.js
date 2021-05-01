const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60879492cca77f2898367839",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/dto90upom/image/upload/v1619617538/YelpCamp/r7z1ba7tnalg1qiotbss.png",
          filename: "YelpCamp/r7z1ba7tnalg1qiotbss",
        },
        {
          url:
            "https://res.cloudinary.com/dto90upom/image/upload/v1619617539/YelpCamp/bir5zapuctg406rw8ymd.png",
          filename: "YelpCamp/bir5zapuctg406rw8ymd",
        },
        {
          url:
            "https://res.cloudinary.com/dto90upom/image/upload/v1619617546/YelpCamp/e3dc9x39kytm5ssjdasg.png",
          filename: "YelpCamp/e3dc9x39kytm5ssjdasg",
        },
        {
          url:
            "https://res.cloudinary.com/dto90upom/image/upload/v1619617549/YelpCamp/hnk9nurbdbddyohv12sl.png",
          filename: "YelpCamp/hnk9nurbdbddyohv12sl",
        },
      ],
      description: "Cheap Camping",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
