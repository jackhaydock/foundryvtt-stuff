// Setup Variables
// -----------------------------------------------------------------

const actor = canvas.tokens.controlled[0].actor
// console.log(actor)
// console.log(actor.system)
// console.log(actor.classes)

// console.log(actor.classes[0])

// console.log(actor.classes["rogue"])

// console.log(actor.classes["rogue"].classLink)
// console.log(actor.classes["rogue"].classLink["name"])
let assassin = true


let rogue_level = actor.system.details.level;
let base_dice = Math.ceil(rogue_level/2)

let strike_options = {
    "none": 0,
    "disarm": 1,
    "poison": 1,
    "trip": 1,
    "withdraw": 1
}

if (rogue_level >= 14) {
    strike_options["daze"] = 2,
    strike_options["knock out"] = 6,
    strike_options["obscure"] = 3

}

// Setup Dialog
// -----------------------------------------------------------------

options = ""
for (var opt in strike_options) {
    options += `<option id="${opt}" value="${strike_options[opt]}">${opt[0].toUpperCase() + opt.slice(1)} (${strike_options[opt]}d6 Cost)</option>`
    }

html_form = `
    <p>
        Rogue Level: <b>${rogue_level}</b>
        <br>Base Sneak Attack: <b>${base_dice}d6</b>
    </p>
    <form>
        <div class="form-group">
            <label>Strike #1:</label>
            <select id="opt-sel-1" name="opt-sel-1">
                ${options}
            </select>
        </div>
        <div class="form-group">
            <label>Strike #2:</label>
    `

if (rogue_level >= 11) {
    html_form += `
            <select id="opt-sel-2" name="opt-sel-2">
                ${options}
    `
} else {
    html_form += `
            <select id="opt-sel-2" name="opt-sel-2" disabled>
                <option id="disabled" value=0>11th Level Required</option>
    `
}
html_form += `
            </select>
        </div>
    `

if (assassin == true) {
    html_form += `
        <div>
            <input type="checkbox" id="assassinate" name="assassinate" value=true>
            <label for="assassinate">Assassinate</label><br>
        </div>
    `
}

html_form += `<hr>

    <h3>Cunning Strikes</h3>
    <b>Disarm (Cost: 1d6).</b> The target must succeed on a Dexterity saving throw, or it drops one item of your choice that it's holding.
    <br><b>Poison (Cost: 1d6).</b> You add a toxin to your strike, forcing the target to make a Constitution saving throw. On a failed save, the target has the Poisoned condition for 1 minute. At the end of each of its turns, the Poisoned target can repeat the save, ending the effect on itself on a success. To use this effect, you must have a Poisoner's Kit on your person.
    <br><b>Trip (Cost: 1d6).</b> If the target is Large or smaller, it must succeed on a Dexterity saving throw or have the Prone condition.
    <br><b>Withdraw (Cost: 1d6).</b> Immediately after the attack, you move up to half your Speed without provoking Opportunity Attacks.

    <h3> Devious Strikes (14th Level)</h3>
    <b>Daze (Cost: 2d6).</b> The target must succeed on a Constitution saving throw, or it has the Dazed condition until the end of its next turn.
    <br><b>Knock Out (Cost: 6d6).</b> The target must succeed on a Constitution saving throw, or it has the Unconscious condition for 1 minute or until it takes any damage. The Unconscious target can repeat the save at the end of each of its turns, ending the effect on itself on a success.
    <br><b>Obscure (Cost: 3d6).</b> You strike near the target's eyes. The target must succeed on a Dexterity saving throw, or it has the Blinded condition until the end of its next turn. 
`


// Execute Dialog
// -----------------------------------------------------------------------

let applyChanges = false;
new Dialog(
    {
        title: `Cunning Strike Options`,
        content: html_form,
        buttons: {
            continue: {
                label: `<b>⚔ Strike!</b>`,
                callback: () => applyChanges = true
            },
                cancel: {
                label: `Cancel`
            },
        },
        default: "Strike!",
        close: html => {
            if (applyChanges) {
                let selected_1 = html.find('[name="opt-sel-1"]')[0]
                let selected_2 = html.find('[name="opt-sel-2"]')[0]
                let final_dice = base_dice - selected_1.value - selected_2.value 
                let roll = new Roll(`${final_dice}d6`).toMessage()

                // Assassin Rogue
                if (assassin == true) {
                    if (selected_1.options[selected_1.selectedIndex].id == "poison" || selected_2.options[selected_2.selectedIndex].id == "poison")  {
                        let envenom_roll = new Roll(`2d8`).toMessage() // NOTE: 2d8 is specific to Lamonix, the normal roll is 2d6
                    }
                    if (html.find('[name="assassinate"]')[0].value == true) {
                        let assassinate_roll = new Roll(`${rogue_level}`).toMessage()
                    }
                }
            }
        }
    }
    ).render(true)