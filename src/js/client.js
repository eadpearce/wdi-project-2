$(init);

const icons1 = {
  'PLD': 'https://ffxiv.gamerescape.com/w/images/6/68/Paladin_Icon_1.png',
  'MNK': 'https://ffxiv.gamerescape.com/w/images/5/54/Monk_Icon_1.png',
  'WAR': 'https://ffxiv.gamerescape.com/w/images/d/d0/Warrior_Icon_1.png',
  'DRG': 'https://ffxiv.gamerescape.com/w/images/1/12/Dragoon_Icon_1.png',
  'BRD': 'https://ffxiv.gamerescape.com/w/images/0/05/Bard_Icon_1.png',
  'WHM': 'https://ffxiv.gamerescape.com/w/images/0/08/White_Mage_Icon_1.png',
  'BLM': 'https://ffxiv.gamerescape.com/w/images/c/c2/Black_Mage_Icon_1.png',
  'SMN': 'https://ffxiv.gamerescape.com/w/images/5/5f/Summoner_Icon_1.png',
  'SCH': 'https://ffxiv.gamerescape.com/w/images/5/51/Scholar_Icon_1.png',
  'NIN': 'https://ffxiv.gamerescape.com/w/images/b/bb/Ninja_Icon_1.png',
  'MCH': 'https://ffxiv.gamerescape.com/w/images/7/71/Machinist_Icon_1.png',
  'DRK': 'https://ffxiv.gamerescape.com/w/images/a/aa/Dark_Knight_Icon_1.png',
  'AST': 'https://ffxiv.gamerescape.com/w/images/7/79/Astrologian_Icon_1.png'
};
const icons2 = {
  'PLD': 'https://ffxiv.gamerescape.com/w/images/d/d6/Paladin_Icon_7.png',
  'MNK': 'https://ffxiv.gamerescape.com/w/images/8/84/Monk_Icon_7.png',
  'WAR': 'https://ffxiv.gamerescape.com/w/images/5/56/Warrior_Icon_7.png',
  'DRG': 'https://ffxiv.gamerescape.com/w/images/9/91/Dragoon_Icon_7.png',
  'BRD': 'https://ffxiv.gamerescape.com/w/images/2/21/Bard_Icon_7.png',
  'WHM': 'https://ffxiv.gamerescape.com/w/images/2/28/White_Mage_Icon_7.png',
  'BLM': 'https://ffxiv.gamerescape.com/w/images/8/83/Black_Mage_Icon_7.png',
  'SMN': 'https://ffxiv.gamerescape.com/w/images/1/12/Summoner_Icon_7.png',
  'SCH': 'https://ffxiv.gamerescape.com/w/images/5/52/Scholar_Icon_7.png',
  'NIN': 'https://ffxiv.gamerescape.com/w/images/1/14/Ninja_Icon_7.png',
  'MCH': 'https://ffxiv.gamerescape.com/w/images/4/47/Machinist_Icon_7.png',
  'DRK': 'https://ffxiv.gamerescape.com/w/images/3/30/Dark_Knight_Icon_7.png',
  'AST': 'https://ffxiv.gamerescape.com/w/images/5/5f/Astrologian_Icon_7.png'
};

// NOTE TO SELF: JQUERY DOESN'T LIKE ARROW FUNCTIONS

function init() {

  // responsive header nav
  const $header = $('header');
  $('.menu-btn').click(function(e) {
    console.log(e);
    $header.toggleClass('expanded');
  });

  // markdown converter for posts
  const $blogPost = $('.blog-post');
  // if there are blog posts on the page convert them
  if ($blogPost[0]) {
    const converter = new showdown.Converter();
    $.each($blogPost, function() {
      const converted = converter.makeHtml($(this).text());
      // console.log(converted);
      $(this).html(converted);
    });
  }

  const mainJob = $('.main-job').text();
  // console.log(mainJob);
  const $jobIcon1 = $('.job-icon1');
  if ($jobIcon1[0] && mainJob && mainJob.length === 3) {
    $(`<img src="${icons1[mainJob]}" height="32">`).appendTo($jobIcon1);
    const $jobIcon2 = $('.job-icon2');
    $(`<img src="${icons2[mainJob]}">`).appendTo($jobIcon2);
  }


  // warning before delete ???
  // $('.warning').click(e => {
  //   console.log('delete', e);
  // });

  const $alts = $('.alts');
  $alts.each(function(i) {
    const id = $(this).attr('id');
    const type = `alt${i}`;
    // console.log($alts);
    getCharacterInfo(id, type);
  });

  const $authorID = $('.main-author');
  $authorID.each(function() {
    const characterID = $(this).text();
    $
    .get(`https://api.xivdb.com/character/${characterID}`)
    .done(char => {
      if (char.name){
        $(this).text(char.name);
      }

    });
  });

  // console.log('AUTHOR ID', $authorID);

  let $mainID = $('.main-name').attr('id');
  if ($mainID && $mainID.length > 55) {
    $mainID = $mainID.split('character/')[1].split('/')[0];
  } else $mainID = '';

  getCharacterInfo($mainID, 'main');
  getCharacterInfo($authorID, 'main');

  // $.get('https://api.xivdb.com/data/classjobs')
  // .done(jobs => console.log(jobs));

  function getCharacterInfo(characterID, type) {
    if (!characterID) {
      return;
    }
    $
    .get(`https://api.xivdb.com/character/${characterID}`)
    .done(char => {
      // console.log(char);

      $(`.${type}-author`).html(char.name);
      $(`.${type}-name`).html(char.name);
      $(`.${type}-title`).html(char.data.title);
      $(`.${type}-avatar`).attr({ src: char.avatar });
      $(`.${type}-server`).html(char.server);

      $(`
        <p><b>Current Class:</b> ${char.data.active_class.role.abbr}</p>
        <p><b>Hometown:</b> ${char.data.city.name}</p>
        <p><b>Race:</b> ${char.data.clan} ${char.data.race} </p>

        <p><b>Nameday:</b> ${char.data.nameday} </p>
        `).appendTo(`.${type}-info`);
      Object.values(char.data.classjobs).forEach(classjob => {
        if (classjob.level === 60) {
          if (classjob.name === 'Gladiator' && char.data.classjobs['6'].level >= 15) {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['PLD']}"></div>PLD</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Pugilist' && char.data.classjobs['4'].level >= 15) {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['MNK']}"></div>MNK</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Marauder' && char.data.classjobs['2'].level >= 15) {
            $(`<li class="w-third"><div><img class="vm" src="${icons2['WAR']}"></div>WAR</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Lancer' && char.data.classjobs['3'].level >= 15) {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['DRG']}"></div>DRG</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Archer' && char.data.classjobs['2'].level >= 15) {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['BRD']}"></div>BRD</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Conjurer' && char.data.classjobs['26'].level >= 15) {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['WHM']}"></div>WHM</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Thaumaturge' && char.data.classjobs['5'].level >= 15) {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['BLM']}"></div>BLM</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Arcanist') {
            if (char.data.classjobs['6'].level >= 15) {
              $(`<li class="w-third"><div><img class="vm"  src="${icons2['SCH']}"></div>SCH</li>`).appendTo(`.${type}-jobs`);
              if (char.data.classjobs['7'].level >= 15) {
                $(`<li class="w-third"><div><img class="vm"  src="${icons2['SMN']}"></div>SMN</li>`).appendTo(`.${type}-jobs`);
              }
            }
          } else if (classjob.name === 'Astrologian' || classjob.name === 'Machinist' || classjob.name === 'Dark Knight') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2[classjob.data.abbr]}"></div>${classjob.data.abbr}</li>`).appendTo(`.${type}-jobs`);
          }
        }
      });
    });

  }

}
