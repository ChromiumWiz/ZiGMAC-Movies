const sql = require("./db.js");
// var crypto = require("crypto");
// const UUID = require("uuid-int");

const FlakeId = require("flakeid");
// const jetpack = require("fs-jetpack");
const bcrypt = require("bcrypt");

const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);

const saltRounds = 0;

const Card = function (card) {
  this.id = card.id;
  this.secret - card.secret;
  this.used_date = card.used_date;
  this.used_by = card.used_by;
  this.created_by = card.created_by;
  this.created_on = card.created_on;
  this.used = card.used;
  this.value = card.value;
};

Card.create = async (req, result) => {
  var value = req.amount;
  var count = req.count;
  var user = "0";

  var cards = [];
  const id = 511;
  var y = 1;

  for (var x = 0; x < count; x++) {
    const flake = new FlakeId({
      mid: id, //optional, define machine id
      timeOffset: (2021 - 1970) * 31536000 * 1000, //optional, define a offset time
    });

    var card_val = flake.gen();
    card_val = card_val.slice(9);

    // var hash = encrypt(card_val);
    // hash = hash.content;
    // console.log("encrypted" + hash);
    // console.log("decrypted" + decrypt);
    // inserScratchCard(card_val, hash, value, (msg) => {
    //   console.log(msg);
    //   if (!msg.status) {
    //     cards.push(msg.data.card);
    //   }
    //   // console.log(cards);
    //   if (y == count) {
    //     console.log("x: " + y);
    //     // console.log(cards);
    //     result(null, Object.assign({}, cards));
    //   }
    //   y = y + 1;
    // });
    const hash = bcrypt.hashSync(card_val, "$2b$10$5otoS6tUwoKNYCpU0mKPX.");

    console.log(card_val);
    console.log(hash);
    inserScratchCard(card_val, hash, value, (msg) => {
      console.log(msg);
      if (!msg.status) {
        cards.push(msg.data.card);
      }
      // console.log(cards);
      if (y == count) {
        console.log("x: " + y);
        // console.log(cards);
        result(null, Object.assign({}, cards));
      }
      y = y + 1;
    });

    // await bcrypt.hash("0", saltRounds).then(function (hash) {

    //   // console.log("in: " + card_val);
    // });
    // console.log("out: " + card_val);
  }
};
const cardEncrypt = async (card_val) => {
  await encrypt(card_val);
};

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

const inserScratchCard = async (
  card_val,
  hash,
  value,
  response = (msg) => {
    return msg;
  }
) => {
  var msg1;
  await sql.query(
    "INSERT INTO `scratch`(`secret`, `created_by`, `value`) VALUES ('" +
      hash +
      "','0','" +
      value +
      "')",
    (err, res) => {
      if (err) {
        // console.log(err);
        msg1 = { status: 1, code: err.code, data: "" };
        response(msg1);
      } else {
        msg1 = {
          status: 0,
          code: "SUCCESS",
          data: {
            card: card_val,
          },
        };
        response(msg1);
      }
    }
  );
};

module.exports = Card;
