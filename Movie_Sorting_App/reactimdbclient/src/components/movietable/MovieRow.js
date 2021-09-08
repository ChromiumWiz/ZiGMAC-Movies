import React from "react";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./movietable.css";

function MovieRow({ index, title, rating, genre, date_published, actors }) {
  // var gen =JSON.parse(genre);
  // gen = JSON.parse(gen);
  var gen = genre.split(',');
  var result =[];
  for(var x in gen)
  {
    result.push(gen [x]);
  }
// gen.forEach(element => {
//     console.log(element);
// });
// console.log(result);

    var cast = actors.split(",");


  var i = index + 1;

  return (
    <tr>
      <td>{i}</td>
      <td>{title}</td>
      <td>{rating}</td>
      <td>
          {
              result.map((g) => (
                <p className="pWrapper">{g}</p>
              ))
        }
      </td>
      <td>{date_published}</td>
      <td>{cast.map((g) => (
                <p className="pWrapper2">{g}</p>
              ))}</td>
    </tr>
  );
}

export default MovieRow;
