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
  'AST': 'https://ffxiv.gamerescape.com/w/images/7/79/Astrologian_Icon_1.png',
  'SAM': 'https://ffxiv.gamerescape.com/w/images/b/bd/Samurai_Icon_1.png',
  'RDM': 'https://ffxiv.gamerescape.com/w/images/8/8b/Red_Mage_Icon_1.png'
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
  'AST': 'https://ffxiv.gamerescape.com/w/images/5/5f/Astrologian_Icon_7.png',
  'SAM': 'https://ffxiv.gamerescape.com/w/images/2/2f/Samurai_Icon_7.png',
  'RDM': 'https://ffxiv.gamerescape.com/w/images/2/25/Red_Mage_Icon_7.png'
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
  if ($authorID[0]) {
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
  }

  let $mainID = $('.main-name').attr('id');
  if ($mainID && $mainID.length > 55) {
    $mainID = $mainID.split('character/')[1].split('/')[0];
  } else $mainID = '';

  getCharacterInfo($mainID, 'main');

  const $currentJob = $('.current-job');
  const $currentStats = $('.current-stats');
  let currentJob;
  if ($currentJob[0]) {
    $
      .get(`https://api.xivdb.com/character/${$mainID}?data=gearsets`)
      .fail(console.log('fail'))
      .done(gear => {
        console.log(gear[0].stats);
        $currentJob.text(gear[0].role.abbr);
        currentJob = gear[0].role.abbr;
        // console.log(currentJob);
        const currentStats = gear[0].stats;
        // $currentStats.text(gear[0].stats);
          // console.log(stat);
        const listOpen = '<li><h4 class="grd-silver dib mv0">';
        const listMiddle = ': </h4> <h4 class="grd-gold dib mv0 fr">';
        const listClose = '</h4></li>';
        // CORE STATS
        $.each(currentStats.core, function(key, stat) {

          $(`${listOpen}${key}${listMiddle}${stat}${listClose}`).appendTo('.current-stats1');
        });

        $.each(currentStats.attributes, function(key, stat) {
          // console.log(stat);
          $(`${listOpen}${getAbbr(key)}${listMiddle}${stat}${listClose}`).appendTo('.current-stats1');
        });

        if (currentStats.offensive) {
          $.each(currentStats.offensive, function(key, stat) {
            // console.log(stat);
            $(`${listOpen}${getAbbr(key)}${listMiddle}${stat}${listClose}`).appendTo('.current-stats2');
          });
          $.each(currentStats.defensive, function(key, stat) {
            // console.log(stat);
            $(`${listOpen}${getAbbr(key)}${listMiddle}${stat}${listClose}`).appendTo('.current-stats2');
          });
            // console.log(stat);
          $(`${listOpen}SPSP${listMiddle}${currentStats.mental['Spell Speed']}${listClose}`).appendTo('.current-stats2');
        } else {
          $.each(currentStats.properties, function(key, stat) {
            // console.log(stat);
            $(`${listOpen}${getAbbr(key)}${listMiddle}${stat}${listClose}`).appendTo('.current-stats2');
          });
        }
        const $currentJobIcon = $('.current-job-icon');
        $currentJobIcon.attr({ src: `${icons2[currentJob]}` });

      });

  }

  function getAbbr(key) {
    let abbr;
    switch (key) {
      case 'Defense':
        abbr = 'Def';
        break;
      case 'Parry':
        abbr = 'Parry';
        break;
      case 'Magic Defense':
        abbr = 'Mag Def';
        break;
      case 'Direct Hit Rate':
        abbr = 'DIR';
        break;
      case 'Critical Hit Rate':
        abbr = 'CRIT';
        break;
      case 'Determination':
        abbr = 'DET';
        break;
      case 'Strength':
        abbr = 'STR';
        break;
      case 'Dexterity':
        abbr = 'DEX';
        break;
      case 'Vitality':
        abbr = 'VIT';
        break;
      case 'Intelligence':
        abbr = 'INT';
        break;
      case 'Mind':
        abbr = 'MND';
        break;
      case 'Piety':
        abbr = 'PIE';
        break;
      case 'Healing Magic Potency':
        abbr = 'HEAL MAG POT';
        break;
      case 'Attack Magic Potency':
        abbr = 'ATK MAG POT';
        break;
      case 'Skill Speed':
        abbr = 'SKSP';
        break;
      case 'Spell Speed':
        abbr = 'SPSP';
        break;
      case 'Attack Power':
        abbr = 'ATK PWR';
        break;
      default:
    }
    return abbr;
  }


  function getCharacterInfo(characterID, type) {
    if (!characterID) {
      return;
    }
    $
    .get(`https://api.xivdb.com/character/${characterID}`)
    .done(char => {

      $(`.${type}-author`).html(char.name);
      $(`.${type}-name`).html(char.name);
      $(`.${type}-title`).html(char.data.title);
      $(`.${type}-avatar`).attr({ src: char.avatar });
      $(`.${type}-server`).html(char.server);

      Object.values(char.data.classjobs).forEach(classjob => {
        if (classjob.level === 70) {
          if (classjob.name === 'Paladin') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['PLD']}"></div>PLD</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Monk') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['MNK']}"></div>MNK</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Ninja') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['NIN']}"></div>NIN</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Samurai') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['SAM']}"></div>SAM</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Warrior') {
            $(`<li class="w-third"><div><img class="vm" src="${icons2['WAR']}"></div>WAR</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Dragoon') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['DRG']}"></div>DRG</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Bard') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['BRD']}"></div>BRD</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'White Mage' ) {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['WHM']}"></div>WHM</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Black Mage') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['BLM']}"></div>BLM</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Red Mage') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['RDM']}"></div>RDM</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Summoner') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['SCH']}"></div>SCH</li>`).appendTo(`.${type}-jobs`);
            $(`<li class="w-third"><div><img class="vm"  src="${icons2['SMN']}"></div>SMN</li>`).appendTo(`.${type}-jobs`);
          } else if (classjob.name === 'Astrologian' || classjob.name === 'Machinist' || classjob.name === 'Dark Knight') {
            $(`<li class="w-third"><div><img class="vm"  src="${icons2[classjob.data.abbr]}"></div>${classjob.data.abbr}</li>`).appendTo(`.${type}-jobs`);
          }
        }
      });
    })
    .fail(() => {
      $(`.${type}-avatar`).attr({ src: 'https://ffxiv.gamerescape.com/w/images/3/3d/Main_Command_16_Icon.png' });
      $(`.${type}-server`).html('???');
      $(`.${type}-name`).html('???');
    });

  }

}
