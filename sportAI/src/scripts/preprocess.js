

export function summarizeLinesV3 (data) {
  
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
  // class by act, get all the acts
  const months = {1: 'janvier', 2: 'fevrier', 3:'mars', 4:'avril', 5:'mai', 6:'juin', 7:'juillet', 8:'aout', 9:'septembre', 10:'octobre', 11:'novembre', 12:'decembre' }
  let getMonths = [...new Set(data.map((row) => parseInt(row.Date.substring(5,7))))].sort((a, b) => a - b)
  console.log (getMonths)
  // class by players, get all the players
  let getPlayers = [...new Set(data.map((row) => parseInt(row.ID)))].sort((a, b) => a - b)
  
  console.log (getPlayers)
  // return the structure
  return getMonths.map((month) => ({
    Months: months[month],
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
    tempsot += parseInt(row.SoT)
    tempgls += parseInt(row.Gls)
  })
  let temp = [tempsot, tempgls]
  return temp
}


export function summarizeLinesG11 (data) {
  const allCategorys = ["Buts", "Tirs Cadrés", "Occasion Crées", "Pénalty tiré", "Passe Decisive"]
  const allPlayers = {1:"Kylian Mbappé",2:"Karim Benzema", 3:"Sadio Mane"}

  let getPlayers = [...new Set(data.map((row) => parseInt(row.ID)))].sort((a, b) => a - b)
  

  return allCategorys.map((cat) => ({
    Cat: cat,
    Players: getPlayers
      .map((player) => ({
        Player: allPlayers[player],
        Count: countCategory11 (data.filter((row) => parseInt(row.ID) === player), cat)
      }))
  }))
}

export function summarizeLinesG12 (data) {
  const allCategorys = ["Dribbles réussis %", "Tirs cadrés %", "Rendement de but %", "Buts %", "Pénalty réussis %"]
  const allPlayers = {1:"Kylian Mbappé",2:"Karim Benzema", 3:"Sadio Mane"}

  let getPlayers = [...new Set(data.map((row) => parseInt(row.ID)))].sort((a, b) => a - b)
  

  return allCategorys.map((cat) => ({
    Cat: cat,
    Players: getPlayers
      .map((player) => ({
        Player: allPlayers[player],
        Count: countCategory12 (data.filter((row) => parseInt(row.ID) === player), cat)
      }))
  }))
}

export function summarizeLinesG13 (data) {
  const allCategorys = ["Tirs Cadrés", "Dribbles réussis", "Interceptions", "Passes Decisives", "Buts"]
  const allPlayers = {1:"Kylian Mbappé",2:"Karim Benzema", 3:"Sadio Mane"}

  let getPlayers = [...new Set(data.map((row) => parseInt(row.ID)))].sort((a, b) => a - b)
  

  return allCategorys.map((cat) => ({
    Cat: cat,
    Players: getPlayers
      .map((player) => ({
        Player: allPlayers[player],
        Count: countCategory13 (data.filter((row) => parseInt(row.ID) === player), cat)
      }))
  }))
}


function countCategory11(dataLines, cat) {
  let countCat = 0;
  switch (cat) {
      case "Buts":
        dataLines.forEach((row) =>{
          countCat += (row.Gls ?parseInt(row.Gls):0);
        })
        break;
      case "Tirs Cadrés":
        dataLines.forEach((row) =>{
          countCat += (row.SoT ? parseInt(row.SoT):0);  
        })
        break;
      case "Occasion Crées":
        dataLines.forEach((row) =>{
          countCat += (row.GCA ? parseInt(row.GCA):0); 
        })
        break;
      case "Pénalty tiré":
        dataLines.forEach((row) =>{
          countCat += (row.PKatt ? parseInt(row.PKatt):0); 
        })
        break;
      case "Passe Decisive":
        dataLines.forEach((row) =>{
          countCat += (row.Ast ? parseInt(row.Ast):0); 
        })
        break;
      default:
          
    }
  return countCat;
}

function countCategory12(dataLines, cat) {
  let countCat = 0;
  let countCat1 = 0;
  let countCat2 = 0;
  switch (cat) {
      case "Dribbles réussis %":
        dataLines.forEach((row) =>{
          countCat1 += (row.Succ ?parseInt(row.Succ):0);
          countCat2 += (row.Att ?parseInt(row.Att):1);
          
          
        })
        countCat = parseInt((countCat1/countCat2) * 100);
        break;
      case "Tirs cadrés %":
        dataLines.forEach((row) =>{
          countCat1 += (row.SoT ? parseInt(row.SoT):0);  
          countCat2 += (row.Sh ?parseInt(row.Sh):1);
        })
        countCat = parseInt((countCat1/countCat2) * 100);
        break;
      case "Rendement de but %":
        dataLines.forEach((row) =>{
          countCat1 += (row.Gls ? parseInt(row.Gls):0); 
          countCat2 += (row.xG ?parseInt(row.xG):1);
        })
        countCat = parseInt((countCat1/countCat2) * 100);
        break;
      case "Buts %":
        dataLines.forEach((row) =>{
          countCat1 += (row.Gls ? parseInt(row.Gls):0); 
          countCat2 += (row.SoT ?parseInt(row.SoT):1);
        })
        countCat = parseInt((countCat1/countCat2) * 100);
        break;
        case "Pénalty réussis %":
          dataLines.forEach((row) =>{
            countCat1 += (row.PK ?parseInt(row.PK):0);
            countCat2 += (row.PKatt ?parseInt(row.PKatt):1);
            
            
          })
          countCat = parseInt((countCat1/countCat2) * 100);
          break;
      default:
          
    }
  return countCat;
}

function countCategory13(dataLines, cat) {
  let countCat = 0;
  switch (cat) {
      case "Tirs Cadrés":
        dataLines.forEach((row) =>{
          countCat += (row.SoT ?parseInt(row.SoT):0);
        })
        break;
      case "Dribbles réussis":
        dataLines.forEach((row) =>{
          countCat += (row.Succ ? parseInt(row.Succ):0);  
        })
        break;
      case "Interceptions":
        dataLines.forEach((row) =>{
          countCat += (row.Int ? parseInt(row.Int):0); 
        })
        break;
      case "Passes Decisives":
        dataLines.forEach((row) =>{
          countCat += (row.Ast ? parseInt(row.Ast):0); 
        })
        break;
      case "Buts":
        dataLines.forEach((row) =>{
          countCat += (row.Gls ? parseInt(row.Gls):0); 
        })
        break;
      default:
          
    }
  return countCat;
}