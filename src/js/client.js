$(init);

// NOTE TO SELF: JQUERY DOESN'T LIEK ARROW FUNCTIONS

function init() {

  let $mainID = $('.main-name').attr('href');
  if ($mainID) {
    $mainID = $mainID.split('character/')[1].split('/')[0];
  }

  const $alts = $('.alts');
  const alts = [];
  $alts.each(function(i) {
    const id = $(this).attr('id');
    const type = `alt${i}`;
    getCharacterInfo(id, type);
  });
  // console.log('ALTS ARRAY', alts);

  getCharacterInfo($mainID, 'main');

  function getCharacterInfo(characterID, type) {
    if (!characterID) {
      return;
    }
    $
    .get(`https://api.xivdb.com/character/${characterID}`)
    .done(char => {
      console.log(char);

      if ($(`.${type}-name`).is('option')) {
        $(`.${type}-name`).attr({ value: char.name });
      } else $(`.${type}-name`).html(char.name);
      $(`.${type}-title`).html(char.data.title);
      $(`.${type}-avatar`).attr({ src: char.avatar });

      $(`
        <p><b>Current Class:</b> ${char.data.active_class.role.abbr}</p>
        <p><b>Hometown:</b> ${char.data.city.name}</p>
        <p><b>Race:</b> ${char.data.clan} ${char.data.race} </p>
        <p><b>Server:</b> ${char.server} </p>
        <p><b>Nameday:</b> ${char.data.nameday} </p>
        `).appendTo(`.${type}-info`);
        Object.values(char.data.classjobs).forEach(classjob => {
          if (classjob.level === 60) {
            if (classjob.name === 'Gladiator' && char.data.classjobs['6'].level >= 15) {
              $(`<li>Paladin</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Pugilist' && char.data.classjobs['4'].level >= 15) {
              $(`<li>Monk</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Marauder' && char.data.classjobs['2'].level >= 15) {
              $(`<li>Warrior</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Lancer' && char.data.classjobs['3'].level >= 15) {
              $(`<li>Dragoon</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Archer' && char.data.classjobs['2'].level >= 15) {
              $(`<li>Bard</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Conjurer' && char.data.classjobs['26'].level >= 15) {
              $(`<li>White Mage</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Thaumaturge' && char.data.classjobs['5'].level >= 15) {
              $(`<li>Black Mage</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Arcanist' && char.data.classjobs['6'].level >= 15) {
              $(`<li>Scholar</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Arcanist' && char.data.classjobs['7'].level >= 15) {
              $(`<li>Summoner</li>`).appendTo(`.${type}classes`);
            } else if (classjob.name === 'Astrologian' || classjob.name === 'Machinist' || classjob.name === 'Dark Knight') {
              $(`<li>${classjob.name}</li>`).appendTo(`.${type}classes`);
            }
          }
        });
    });

  }

}
