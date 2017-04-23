$(init);

function init() {

  const $characterName = $('.character-name');
  const $characterTitle = $('.character-title');
  const characterID = '9010552';

  $
    .get(`https://api.xivdb.com/character/${characterID}`)
    .done(char => {
      console.log(char);
      $characterName.html(char.name);
      $characterTitle.html(char.data.title);
      $(`<img src="${char.portrait}" width="300">`).appendTo('.portrait');
      $(`
        <p><b>Current Class:</b> ${char.data.active_class.role.abbr}</p>
        <p><b>Hometown:</b> ${char.data.city.name}</p>
        <p><b>Race:</b> ${char.data.clan} ${char.data.race} </p>
        <p><b>Server:</b> ${char.server} </p>
        <p><b>Nameday:</b> ${char.data.nameday} </p>
        `).appendTo('.info');
      Object.values(char.data.classjobs).forEach(classjob => {
        if (classjob.level === 60) {
          $(`<li>${classjob.name}</li>`).appendTo('.classes');
          console.log(classjob.name);
        }
      });
        // $(`<p>${field}</p>`).appendTo('.info');
        // console.log(field.name);


    });
}
