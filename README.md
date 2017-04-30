# WDI Project 2: XIV Blogs 
![](https://cloud.githubusercontent.com/assets/25905279/25563964/313ac7d4-2da0-11e7-98fd-7185d290af61.png)

## What is XIV Blogs?
XIV Blogs (or XIVB) is a blogging platform for people who play the MMORPG Final Fantasy XIV. It features user profiles that pull information from the [XIVDB](http://xivdb.com/) API to get stats on your in-game characters. Once you add characters you can then make blog posts and comments as those characters for roleplay. You can find the live site [here](https://cryptic-waters-59869.herokuapp.com/). 

## User profiles 
![](https://cloud.githubusercontent.com/assets/25905279/25565244/9ef7e23c-2dbb-11e7-8e4f-ee7aaba75e44.png)
![](https://cloud.githubusercontent.com/assets/25905279/25565267/05b6d9c4-2dbc-11e7-90a3-7f53f410785b.png)
The profile grabs information on FFXIV player characters using the unique character ID that can be found in their [lodestone](http://na.finalfantasyxiv.com/lodestone/) link. For example, Klynthota Drysfalkwyn's lodestone link is http://eu.finalfantasyxiv.com/lodestone/character/9010552/ and her unique character ID is 9010552. This bit of code cuts out the ID from the full link: 
```link.split('character/')[1].split('/')[0]```

This function pulls all the relevant info from the XIVDB API: 

```
function getCharacterInfo(characterID, type) {
  if (!characterID) {
    return;
  }
  $
  .get(`https://api.xivdb.com/character/${characterID}`)
  .done(char => {

    $(`.${type}-author`).html(char.name);
    $(`.${type}-name`).html(char.name);
    $(`.${type}-avatar`).attr({ src: char.avatar });
    $(`.${type}-server`).html(char.server);

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
```

This adds to the page the character's name, the game server they play on, their avatar image, and which jobs they have at level 60. The way the game works, you start off levelling a class and then when you get to level 30 in that class and have another class at level 15, you unlock a new job. For example: when you level Gladiator to 30 and Conjurer to 15, you unlock the Paladin job. The code to work out jobs was needed because the info pulled from the API only stores information on classes, not jobs. `char.data.classjobs['number']` was required to get data on sub-classes as the keys for them were numbers rather than their names.

Icons for each job were taken from [gamerescape](https://ffxiv.gamerescape.com/wiki/Dictionary_of_Icons) and their links entered into these two objects using the job name abbreviation as keys. 

```
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
```
## Blogs 

