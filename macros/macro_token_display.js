let applyChanges = false;
new Dialog({
  title: `Token Name, Bar and Disposition Display`,
  content: `
    <form>
      <div class="form-group">
        <label>Tokens:</label>
        <select id="token-sel" name="token-sel">
          <option value="ALL">All Tokens in Scene</option>
          <option value="SEL">Selected Tokens Only</option>
        </select>
     </div>
      <div class="form-group">
        <label>Name:</label>
        <select id="name-sel" name="name-sel">
          <option value="nochange">No Change</option>
          <option value="ALWAYS">Always</option>
          <option value="OWNER">Owner</option>
          <option value="HOVER">Hover</option>
          <option value="NONE">Hide</option>
        </select>
     </div>
     <div class="form-group">
        <label>Bars:</label>
        <select id="bar-sel" name="bar-sel">
          <option value="nochange">No Change</option>
          <option value="ALWAYS">Always</option>
          <option value="OWNER">Owner</option>
          <option value="HOVER">Hover</option>
          <option value="NONE">Hide</option>
        </select>
      </div>
      <div class="form-group">
        <label>Disposition Type:</label>
        <select id="dispo-sel" name="dispo-sel">
          <option value="nochange">No Change</option>
          <option value="HOSTILE">Hostile</option>
          <option value="NEUTRAL">Neutral</option>
          <option value="FRIENDLY">Friendly</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      let toks = html.find('[name="token-sel"]')[0].value || "none";
      let name = html.find('[name="name-sel"]')[0].value || "none";
      let bar = html.find('[name="bar-sel"]')[0].value || "none";
      let dispo = html.find('[name="dispo-sel"]')[0].value || "none";

      var tokens;
      if (toks == "ALL") {
        tokens = canvas.tokens.placeables
      } else if (toks == "SEL") {
        tokens = canvas.tokens.controlled
      }

      const updates = tokens.map(token => {
        return {
            _id: token.id,
            "displayName": CONST.TOKEN_DISPLAY_MODES[name],
            "displayBars": CONST.TOKEN_DISPLAY_MODES[bar],
            disposition: CONST.TOKEN_DISPOSITIONS[dispo] 
            }
        });

        canvas.scene.updateEmbeddedDocuments('Token', updates)

    }
}
}).render(true);
