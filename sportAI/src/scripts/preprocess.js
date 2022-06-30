const TITLES = {
  '1. Noyau villageois': 'Noyau villageois',
  '2. Rue commerciale de quartier, d’ambiance ou de destination': 'Rue commerciale de quartier, d’ambiance ou de destination',
  '3. Rue transversale à une rue commerciale': 'Rue transversale à une rue commerciale',
  '4. Rue bordant un bâtiment public ou institutionnel  (tels qu’une école primaire ou secondaire, un cégep ou une université, une station de métro, un musée, théâtre, marché public, une église, etc.)': 'Rue bordant un bâtiment public ou institutionnel',
  '5. Rue en bordure ou entre deux parcs ou place publique': 'Rue en bordure ou entre deux parcs ou place publique',
  '6. Rue entre un parc et un bâtiment public ou institutionnel': 'Rue entre un parc et un bâtiment public ou institutionnel',
  '7. Passage entre rues résidentielles': 'Passage entre rues résidentielles'
}

/**
 *  Uses the projection to convert longitude and latitude to xy coordinates.
 *
 * The keys for the coordinate are written to each feature object in the data.
 *
 * @param {object[]} data The data to be displayed
 * @param {*} projection The projection to use to convert the longitude and latitude
 */
export function convertCoordinates (data, projection) {
  // TODO : Add an x and y key to each feature object in the data
  // representing its x and y position according to the projection.
  // Each resulting object should be structured as :

  /*
    {
      type:'...'
      properties:{...}
      geometry:{...}
      x:...
      y:...
    }
  */

  data.features.forEach((feature) => {
    [feature.x, feature.y] = projection([feature.properties.LONGITUDE, feature.properties.LATITUDE])
  })
}

/**
 * Simplifies the titles for the property 'TYPE_SITE_INTERVENTION'. The names
 * to use are contained in the constant 'TITLES' above.
 *
 * @param {*} data The data to be displayed
 */
export function simplifyDisplayTitles (data) {
  // TODO : Simplify the titles as required

  data.features.forEach((feature) =>{
    feature.properties.TYPE_SITE_INTERVENTION = TITLES[feature.properties.TYPE_SITE_INTERVENTION]
  })
}

export function summarizeLinesV3 (data) {
  // TODO : Generate the data structure as defined above
  
  // class by players, get all the players
  let getPlayers = [...new Set(data.map((row) => parseInt(row.ID)))].sort((a, b) => a - b)

  // return the structure
  return getPlayers.map((player) => ({
        Player: player,
        Tkl: countGoalV3(data.filter((row) => parseInt(row.ID) === player))[0],
        Ast: countGoalV3(data.filter((row) => parseInt(row.ID) === player))[1],
        Gls: countGoalV3(data.filter((row) => parseInt(row.ID) === player))[2],
        Succ: countGoalV3(data.filter((row) => parseInt(row.ID) === player))[3],
        Int: countGoalV3(data.filter((row) => parseInt(row.ID) === player))[4],
      }))
      .filter((elt) => elt.Count !== 0)
}

export function arrangeV3(tabtemp) {
  let tableResult = [];
  let players = ['Mbappe', 'Benzema', 'Mane']
  let aspectsNoAbbr = [
    "Nombre de joueurs tacklés",
    "Nombre de passes décisives",
    "Nombre de buts marqué",
    "Nombre de dribles réussis",
    "Nombre d’intersections"
  ]
  let aspects = ['Tkl', 'Ast', 'Gls', 'Succ','Int']
  let indexplayer = -1
  let indexAspect = -1
  players.forEach((player) => {
    indexplayer += 1
    aspects.forEach((aspect)=> {
    indexAspect += 1
      tableResult.push({"Players" : player, "Aspects" :aspect, "Counts" :tabtemp[indexplayer][aspect]})
    })
  })
  
  return tableResult;
}

function countGoalV3(temps) {
  let tempTkl = 0;
  let tempAst = 0;
  let tempGls = 0;
  let tempSucc = 0;
  let tempInt = 0;
  temps.forEach((row) =>{
    if(row.Tkl != null) {
      tempTkl += parseInt(row.Tkl)
    }
    if(row.Ast != null) {
      tempAst += parseInt(row.Ast)
    }
    if(row.Gls != null) {
      tempGls += parseInt(row.Gls)
    }
    if(row.Succ != null) {
      tempSucc += parseInt(row.Succ)
    }
    if(row.Int != null) {
      tempInt += parseInt(row.Int)
    }
    
  })
  let temp = [tempTkl, tempAst, tempGls, tempSucc, tempInt]
  return temp
}


export function summarizeLines (data) {
  // TODO : Generate the data structure as defined above
  // class by act, get all the acts
  let getMonths = [...new Set(data.map((row) => parseInt(row.Date.substring(5,7))))].sort((a, b) => a - b)
  console.log (getMonths)
  // class by players, get all the players
  let getPlayers = [...new Set(data.map((row) => parseInt(row.ID)))].sort((a, b) => a - b)
  
  console.log (getPlayers)
  // return the structure
  return getMonths.map((month) => ({
    Months: month,
    Attributs: [{ 
        Attribut: 'SoT',
        Players: getPlayers.map((player) => ({
          Player : player,
          Count: countGoal (data.filter((row) => parseInt(row.Date.substring(5,7)) === month &&  parseInt(row.ID) === player))[0]
      }))},
      {
        Attribut: "Gls",
        Players: getPlayers.map((player) => ({
          Player : player,
          Count: countGoal (data.filter((row) => parseInt(row.Date.substring(5,7)) === month &&  parseInt(row.ID) === player))[1]
      }))}]

      .filter((elt) => elt.Count !== 0)
  }))
}

function countGoal(temps) {
  console.log(temps)
  let tempsot = 0;
  let tempgls = 0
  temps.forEach((row) =>{
    //console.log(row.SoT)
    tempsot += parseInt(row.SoT)
    tempgls += parseInt(row.Gls)
  })
  console.log(tempsot)
  console.log(tempgls)
  let temp = [tempsot, tempgls]
  return temp
}


export function summarizeLinesG1 (data) {
  const allCategorys = ["Gls", "SoT", "GCA", "PKatt", "Ast"]
  const allPlayers = {1:"Mbappe",2:"Benzema", 3:"Mane"}

  let getPlayers = [...new Set(data.map((row) => parseInt(row.ID)))].sort((a, b) => a - b)
  

  return allCategorys.map((cat) => ({
    Cat: cat,
    Players: getPlayers
      .map((player) => ({
        Player: allPlayers[player],
        Count: countCategory (data.filter((row) => parseInt(row.ID) === player), cat)
      }))
  }))
}


function countCategory(dataLines, cat) {
  let countCat = 0;
  switch (cat) {
      case "Gls":
        dataLines.forEach((row) =>{
          countCat += (row.Gls ?parseInt(row.Gls):0);
        })
        break;
      case "SoT":
        dataLines.forEach((row) =>{
          countCat += (row.SoT ? parseInt(row.SoT):0);  
        })
        break;
      case "GCA":
        dataLines.forEach((row) =>{
          countCat += (row.GCA ? parseInt(row.GCA):0); 
        })
        break;
      case "PKatt":
        dataLines.forEach((row) =>{
          countCat += (row.PKatt ? parseInt(row.PKatt):0); 
        })
        break;
      case "Ast":
        dataLines.forEach((row) =>{
          countCat += (row.Ast ? parseInt(row.Ast):0); 
        })
        break;
      default:
          
    }
  return countCat;
}
