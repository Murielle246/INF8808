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

  data.features.forEach((feature) =>{
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
  let aspects = ['Tkl', 'Ast', 'Gls', 'Succ','Int']
  let indexplayer = -1
  players.forEach((player) => {
    indexplayer += 1
    aspects.forEach((aspect)=> {
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