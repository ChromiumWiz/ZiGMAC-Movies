const { resume } = require("./db.js");
const sql = require("./db.js");
const bcrypt = require("bcrypt");

const Card = function (scratchCard) {
  this.id = scratchCard.id;
  this.secret = scratchCard.secret;
  this.used_date = scratchCard.used_date;
  this.used_by = scratchCard.used_by;
  this.created_by = scratchCard.created_by;
  this.created_on = scratchCard.created_on;
  this.used = scratchCard.used;
  this.value = scratchCard.value;
};

Card.topupUser = (card, user, result) => {
  //   var scratchs = Card.getAllNot();
  //   bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
  //     // result == true
  // });
  console.log(user);
  //   const salt = bcrypt.genSaltSync(saltRounds);

  //   console.log(salt);
  console.log(card);
  const hash = bcrypt.hashSync(card, "$2b$10$5otoS6tUwoKNYCpU0mKPX.");
  //   console.log(hash);
  Card.cardCount(hash, (err, data) => {
    var msg;
    if (err) {
      console.log(err);
    } else {
      if (data.data.count) {
        console.log(data.data.card.secret);
        const cardSecret = data.data.card.secret;
        const cardValue = data.data.card.value;
        var dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
        sql.query(
          "UPDATE `scratch` SET `used_date`='" +
            dateTime +
            "',`used_by`='" +
            user +
            "' ,`used`='1' WHERE secret = '" +
            cardSecret +
            "'",
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );

        sql.query(
          "UPDATE `user` SET `balance`= `balance` + " +
            cardValue +
            "  WHERE id = '" +
            user +
            "'",
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        msg = { status: 0, code: "TOPUP_SUCCESS", data: "" };
        result(null, msg);
      } else {
        msg = {
          status: 1,
          code: "USED_CARD",
          data: "",
        };
        result(null, msg);
      }
    }
  });

  //   bcrypt.hash(card, saltRounds).then(function (hash) {
  //     // Store hash in your password DB.
  //     // sql.query();

  //     // Card.cardCount(hash, (err, data) => {
  //     //   if (err) {
  //     //     console.log(err);
  //     //   } else {
  //     //     console.log(data);
  //     //   }
  //     // });
  //   });
  //   console.log(scratchs);
  //   result(null, scratches);
};

Card.getAll = async (result) => {
  await sql.query(
    "SELECT * FROM FROM scratch WHERE used = '0'",
    (err, res) => {}
  );
};

Card.cardCount = async (card, result) => {
  //   console.log(card);
  var msg;
  await sql.query(
    "SELECT COUNT(*) AS cardCount FROM scratch WHERE secret = '" +
      card +
      "' AND used = '0'",
    (err, res) => {
      // if()
      // {

      // }
      sql.query(
        "SELECT * FROM scratch WHERE secret = '" + card + "'",
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            msg = {
              status: 0,
              code: "CARD_DETAILS",
              data: { count: res[0].cardCount, card: data[0] },
            };
            result(null, msg);
          }
        }
      );
      //   result(null, res[0].cardCount);
    }
  );
};

module.exports = Card;
