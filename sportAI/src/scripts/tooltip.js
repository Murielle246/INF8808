const months = {1: 'janvier', 2: 'fevrier', 3:'mars', 4:'avril', 5:'mai', 6:'juin', 7:'juillet', 8:'aout', 9:'septembre', 10:'octobre', 11:'novembre', 12:'decembre' }
const players = {1: 'Kilian Mbappe', 2: 'Kharim Benzema', 3:'Sadio Mane'}
const Attributs = {"SoT": "Tirs cadrés (SoT)", "Gls": "buts (Gls)"}



/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
 export function getContents (d, nbr) {

      if (nbr == 1)
        return `
            <span style="font-family: Open Sans Condensed'; font-size:24px; font-weight:normal">
              Mois :  ${months[d.Months]}
            </span>
            <div> 
              <br> 
                <span style="font-weight:bold;  margin-bottom: 1em">
                  Joeur : ${players[1]} 
                </span>
              <br> 
                <span> 
                  Compte : ${d.Players[0].Count}
                </span>
              <br> 
                <span> 
                  Catégorie : ${Attributs[d.Attribut]}
                </span> 
            </div>
            `
      if (nbr == 2 )
          return `
            <span style="font-family: Open Sans Condensed'; font-size:24px; font-weight:normal">
              Mois :  ${months[d.Months]}
            </span>
            <div> 
              <br> 
                <span style="font-weight:bold;  margin-bottom: 1em">
                  Joeur : ${players[2]} 
                </span>
              <br> 
                <span> 
                  Compte : ${d.Players[1].Count}
                </span>
              <br> 
                <span> 
                  Catégorie : ${Attributs[d.Attribut]}
                </span> 
            </div>
            `
      if (nbr == 3)
          return `
            <span style="font-family: Open Sans Condensed'; font-size:24px; font-weight:normal">
              Mois :  ${months[d.Months]}
            </span>
            <div> 
              <br> 
                <span style="font-weight:bold;  margin-bottom: 1em">
                  Joeur : ${players[3]} 
                </span>
              <br> 
                <span> 
                  Compte : ${d.Players[2].Count}
                </span>
              <br> 
                <span> 
                  Catégorie : ${Attributs[d.Attribut]}
                </span> 
            </div>
            `
      if (nbr == 4)
            return `
                <span style="font-family: Open Sans Condensed'; font-size:24px; font-weight:normal">
                  Categorie :  ${d.Cat}
                </span>
                <div> 
                  <br> 
                    <span style="font-weight:bold;  margin-bottom: 1em">
                      Joeur : ${d.Player} 
                    </span>
                  <br> 
                    <span> 
                      Compte : ${d.Count}
                    </span>
                </div>
                `

          
  }
  