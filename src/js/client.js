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
          if (classjob.name === 'Gladiator' && char.data.classjobs['6'].level >= 15) {
            $(`<li>Paladin</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Pugilist' && char.data.classjobs['4'].level >= 15) {
            $(`<li>Monk</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Marauder' && char.data.classjobs['2'].level >= 15) {
            $(`<li>Warrior</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Lancer' && char.data.classjobs['3'].level >= 15) {
            $(`<li>Dragoon</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Archer' && char.data.classjobs['2'].level >= 15) {
            $(`<li>Bard</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Conjurer' && char.data.classjobs['26'].level >= 15) {
            $(`<li>White Mage</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Thaumaturge' && char.data.classjobs['5'].level >= 15) {
            $(`<li>Black Mage</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Arcanist' && char.data.classjobs['6'].level >= 15) {
            $(`<li>Scholar</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Arcanist' && char.data.classjobs['7'].level >= 15) {
            $(`<li>Summoner</li>`).appendTo('.classes');
            console.log(classjob.name);
          } else if (classjob.name === 'Astrologian' || classjob.name === 'Machinist' || classjob.name === 'Dark Knight') {
            $(`<li>${classjob.name}</li>`).appendTo('.classes');
          }
        }
      });
    });
}
