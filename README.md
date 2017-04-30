# WDI Project 2: XIV Blogs 
![](https://cloud.githubusercontent.com/assets/25905279/25563964/313ac7d4-2da0-11e7-98fd-7185d290af61.png)

## What is XIV Blogs?
XIV Blogs (or XIVB) is a blogging platform for people who play the MMORPG Final Fantasy XIV. It features user profiles that pull information from the [XIVDB](http://xivdb.com/) API to get stats on your in-game characters. Once you add characters you can then make blog posts and comments as those characters for roleplay. You can find the live site [here](https://cryptic-waters-59869.herokuapp.com/). 

## Profiles 
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
  'WAR': ... etc
```

This is the mongoose schema for user profiles: 

```
const profileSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  alts: [{ type: String }],
  main: { type: String, default: '' },
  mainJob: { type: String, default: ''},
  age: { type: Number, default: null },
  about: { type: String, default: '' }
});
```

On creation, each user gets a profile and blog created that has a mongoose reference to their account. This is the user schema: 

```
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.ObjectId, ref: 'Profile' },
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog' }
}, { timestamps: true });
```
The profile and blog for each newly registered user gets created in the user pre-save function shown below. 

```
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  let newProfile;
  Profile
    .create({ owner: this.id })
    .then(profile => {
      newProfile = profile;
      this.profile = profile.id;
    })
    .then(() => {
      Blog
        .create({ owner: this.id, profile: newProfile.id })
        .then(blog => {
          this.blog = blog.id;
          console.log('NEW USER', this);
        })
        .then(() => {
          next();
        });
    });
});
```



## Blogs 
![](https://cloud.githubusercontent.com/assets/25905279/25566169/0b7562e4-2dcc-11e7-8fa9-62a4a26ca322.png)

Originally user blogs were going to have an owner and an array of posts stored as embedded documents but this meant that searching for specific posts in the array became very difficult without a unique ID to search by. In keeping the models separate it's possible to search for individual blogs, posts and comments all by their unique ID. This also means each model has its own RESTful routes, although some routes are unused e.g. a single user cannot create or edit blogs. 

### Authors 
![](https://cloud.githubusercontent.com/assets/25905279/25566213/b63d18de-2dcc-11e7-8719-92f4022c90df.png)

Once FFXIV game characters are added to a user's profile it's then possible to write posts with any of these characters listed as an author. A nice feature for people who want to use the site to roleplay as their characters. 

###Markdown support 
The site uses the node package [showdown](https://www.npmjs.com/package/showdown) so that users can format text using markdown in their profiles, blog posts and comments. 
