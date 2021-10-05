document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const button = e.target;
        const inputField = button.parentElement.querySelector('input');

        if (button.className === 'increment') {
            inputField.value = +inputField.value + 1;
        }

        if (button.className === 'decrement' && inputField.value > 0) {
            inputField.value = +inputField.value - 1;
        }

        updateResults();
    });
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', updateResults)
});

function updateResults() {
    const dice_ai = Number(document.querySelector('#dice_ai').value);
    const dice_ap = Number(document.querySelector('#dice_ap').value);
    const dice_he = Number(document.querySelector('#dice_he').value);
    const dice_miss = Number(document.querySelector('#dice_miss').value);
    const dice_hit = Number(document.querySelector('#dice_hit').value);
    const dice_crit = Number(document.querySelector('#dice_crit').value);
    const dice_flame = Number(document.querySelector('#dice_flame').value);

    const cover_yellow = document.querySelector('#cover_yellow').checked;
    const cover_green = document.querySelector('#cover_green').checked;
    const cover_building = document.querySelector('#cover_building').checked;

    const extra_defence = Number(document.querySelector('#extra_defence').value);
    const frontal_hit = document.querySelector('#frontal_hit').checked;

    const defence_green = document.querySelector('#defence_green');
    const defence_yellow = document.querySelector('#defence_yellow');
    const defence_red = document.querySelector('#defence_red');
    const defence_purple = document.querySelector('#defence_purple');

    const dice_successful = Number(document.querySelector('#dice_successful').value);

    const damage_green = document.querySelector('#damage_green');
    const damage_yellow = document.querySelector('#damage_yellow');
    const damage_red = document.querySelector('#damage_red');
    const damage_purple = document.querySelector('#damage_purple');

    // Figure out High Explosive
    const he_defence = (dice_miss > 0 || dice_hit > 0 || dice_crit > 0)
        ? dice_hit + dice_crit
        : dice_he;

    const he_damage = (dice_miss > 0 || dice_hit > 0 || dice_crit > 0)
        ? dice_hit + (dice_crit * 2)
        : dice_he;

    // Update number of defence dice
    let defence_green_total = dice_ap + extra_defence;
    if (cover_yellow === true) defence_green_total += 1;
    if (cover_green === true) defence_green_total += 2;
    if (cover_building === true) defence_green_total += 3;
    defence_green.textContent = defence_green_total;

    defence_yellow.textContent = dice_ai + he_defence + extra_defence;
    defence_red.textContent = (dice_ap > 0 && frontal_hit === true)
        ? 2 + he_defence + extra_defence
        : he_defence + extra_defence;
    defence_purple.textContent = dice_ai + extra_defence;

    // Update damage applied
    damage_green.textContent = ((dice_ai + dice_ap + he_damage - dice_successful) <= 0)
        ? 0 + dice_flame
        : (dice_ai + dice_ap + he_damage - dice_successful) + dice_flame;

    damage_yellow.textContent = ((dice_ai + dice_ap + he_damage - dice_successful) <= 0)
        ? 0 + dice_flame
        : (dice_ai + dice_ap + he_damage - dice_successful) + dice_flame;

    damage_red.textContent = ((dice_ap + he_damage - dice_successful) <= 0)
        ? 0
        : dice_ap + he_damage - dice_successful;

    damage_purple.textContent = ((dice_ai + dice_ap + he_damage - dice_successful) <= 0)
        ? 0 + dice_flame
        : (dice_ai + dice_ap + he_damage - dice_successful) + dice_flame;
}
