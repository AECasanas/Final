const mongoose = require("mongoose");
consttool = mongoose.model("tool");

exports.findAll = function (req, res) {
tool.find({}, function (err, results) {
    return res.send(results);
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;
tool.findOne({ _id: id }, (err, json) => {
    if (err) return console.log(err);
    return res.send(json);
  });
};

exports.add = function (req, res) {
tool.create(req.body, function (err, recipe) {
    if (err) return console.log(err);
    return res.send(recipe);
  });
};

exports.update = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
tool.findByIdAndUpdate(id, req.body, { new: true }, (err, response) => {
    if (err) return console.log(err);
    res.send(response);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
tool.deleteOne({ _id: id }, () => {
    return res.sendStatus(202);
  });
};

exports.upload = function (req, res) {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let file = req.files.file;
  file.mv(`./public/img/${req.body.filename}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ file: `public/img/${req.body.filename}` });
    console.log(" res.json", res.json);
  });
};

exports.import = function (req, res) {
tool.create(
    {
      title: "drill",
      description:
        "Variable Speed Reversible Electric Drill with 3/8 in. Keyless Chuck, Rubberized Grip and Lock-On Button."
      image: "drill.jpg",
      year: "2015",
    },
    {
      title: "screwdriver",
      description:
        "9-in-1 Square Drive Ratcheting Multi-Bit Screwdriver with 8-in-1 Compact Ratcheting Multi-Bit Screwdriver",
      image: "screwdriver.jpg",
      year: "2016",
    },

    {
      title: "wrench",
      description:
        "Adjustable steel jaws easily turn or clamp pipes up to 1-1/2 in. Features sturdy cast-iron body with high-quality steel jaw. Heavy-duty straight pipe wrench suitable for all pipe work",
      image: "wrench.jpg",
      year: "2017",
    },

    {
      title: "hammer",
      description:
        "Hammer features a forward weight design to amplify force of swing. Wrecking bar forged steel ideal for construction and renovation. Lifetime Warranty, no receipt required.",
      image: "hammer.jpg",
      year: "2018",
    },
    function (err) {
      if (err) return console.log(err);
      return res.sendStatus(201);
    }
  );
};

exports.killall = function (req, res) {
tool.deleteMany({}, (err) => {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
