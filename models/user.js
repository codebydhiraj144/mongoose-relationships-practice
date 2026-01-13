const addUsers = async () => {
  await User.deleteMany({ username: "sherlockholmes" });

  let user1 = new User({
    username: "sherlockholmes",
    address: [
      {
        location: "221B Baker Street",
        city: "London",
      }
    ]
  });

  user1.address.push({
    location: "p32 wellstreet",
    city: "London"
  });

  await user1.save();
  console.log("✅ User saved successfully");
};
