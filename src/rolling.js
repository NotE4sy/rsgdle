// AI could never code this...
const main_roll_digit_1 = document.getElementById("main_roll_digit_1");
const main_roll_digit_2 = document.getElementById("main_roll_digit_2");
const main_roll_digit_3 = document.getElementById("main_roll_digit_3");
const main_roll_digit_4 = document.getElementById("main_roll_digit_4");
const main_roll_seperator = document.getElementById("main_roll_seperator");

const reload_bar = document.getElementById("reload_bar");

const main_roll_split = document.getElementById("main_roll_split");

const splits_div = document.getElementById("splits_div");

const timestamp_list = ["Start", "Nether Enter", "Bastion", "Fortress", "Blind", "Stronghold", "End", "Completion", "Death"];
const timestamp_icon_list = ["assets/split_icons/nether_enter.webp", "assets/split_icons/bastion.webp", "assets/split_icons/fortress.webp", "assets/split_icons/blind.webp", "assets/split_icons/stronghold.webp", "assets/split_icons/end.webp", "assets/split_icons/completion.webp", "assets/split_icons/death.png"]
const split_info_data = {
    timestamp: ["Nether Enter", "4:44"],
    split: ["Overworld", "4:44"],
    icon: "assets/split_icons/nether_enter.webp",
    gradiented: "element_1"
}

/* TIME CONSTRAINTS (assuming no deaths o_O)

    OVERWORLD: 0m 30s - 4m 0s
    NETHER TERRAIN: 0m 10s - 1m 0s
    BASTION: 2m 0s - 5m 0s
    FORT: 1m 0s - 2m 30s
    BLIND: 1m 0s - 3m 30s
    STRONGHOLD: 0m 20s - 4m 0s
    END: 0m 46s - 3m 30s

    FASTEST POSSIBLE TIME: 5:46
    SLOWEST POSSIBLE TIME: 23:30
*/

function secs_to_mins_and_secs(secs) {
    let mins = parseInt(secs / 60);
    let remaining_secs = secs - mins * 60;
    let returned_string = `${mins}:`;

    if (mins < 10) {
        returned_string = `0${mins}:`;
    }

    if (remaining_secs < 10) {
        returned_string += `0${remaining_secs}`;
    } else {
        returned_string += remaining_secs;
    }

    return returned_string;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function roll_anim(roll_1_enabled, roll_2_enabled, roll_3_enabled, roll_4_enabled) {
    if (roll_1_enabled) {main_roll_digit_1.textContent = Math.floor(Math.random() * 6);}
    if (roll_2_enabled) main_roll_digit_2.textContent = Math.floor(Math.random() * 10);
    if (roll_3_enabled) main_roll_digit_3.textContent = Math.floor(Math.random() * 6);
    if (roll_4_enabled) main_roll_digit_4.textContent = Math.floor(Math.random() * 10);
}

function split_anim() {
    main_roll_split.textContent = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65, Math.floor(Math.random() * (90 - 65 + 1)) + 65, Math.floor(Math.random() * (90 - 65 + 1)) + 65, Math.floor(Math.random() * (90 - 65 + 1)) + 65, Math.floor(Math.random() * (90 - 65 + 1)) + 65, Math.floor(Math.random() * (90 - 65 + 1)) + 65, Math.floor(Math.random() * (90 - 65 + 1)) + 65, Math.floor(Math.random() * (90 - 65 + 1)) + 65)
}

function generate_times() {
    let splits = [
        Math.floor(Math.random() * (240 - 30 + 1)) + 30, // overworld
        Math.floor(Math.random() * (60 - 10 + 1)) + 10, // nether terrain
        Math.floor(Math.random() * (300 - 120 + 1)) + 120, // bastion
        Math.floor(Math.random() * (150 - 60 + 1)) + 60, // fortress
        Math.floor(Math.random() * (210 - 60 + 1)) + 60, // blind
        Math.floor(Math.random() * (240 - 20 + 1)) + 20, // stronghold
        Math.floor(Math.random() * (210 - 46 + 1)) + 46 // end
    ];

    let timestamps = { // assuming no deaths o_O
        "Nether Enter": 0, 
        "Bastion Enter": 0, 
        "Fortress Enter": 0, 
        "Blind": 0, 
        "Stronghold Enter": 0, 
        "End Enter": 0,
        "Final Time": 0
    };

    let itr = 0;
    let cumulative = 0;

    Object.keys(timestamps).forEach(time => {
        cumulative += splits[itr];
        timestamps[time] = cumulative;
        itr++;
    })

    //timestamps["Final Time"] = cumulative += splits[itr];

    console.log(timestamps);
    return timestamps;
}

function restart_anims(elememts) {
    for (const el of elememts) {
        el.style.animationPlayState = "paused";
        el.style.animationName = "none";
        requestAnimationFrame(() => {
            setTimeout(() => {
                el.style.animationName = "";
            }, 0);
        });   
    }
}

async function rolling_sequence(timestamp, time) {
    const roll_cycle_time = 70;
    const timestamp_cycle_time = 70;

    let roll_interval = setInterval(roll_anim, roll_cycle_time, true, true, true, true);
    let timestamp_interval = setInterval(split_anim, timestamp_cycle_time);

    await sleep(1000);
    main_roll_digit_1.textContent = time[0];
    main_roll_digit_1.style.animationPlayState = "running";

    clearInterval(roll_interval);
    roll_interval = setInterval(roll_anim, roll_cycle_time, false, true, true, true);

    await sleep(1000);
    main_roll_digit_2.textContent = time[1];
    main_roll_digit_2.style.animationPlayState = "running";

    clearInterval(roll_interval);
    roll_interval = setInterval(roll_anim, roll_cycle_time, false, false, true, true);
    
    await sleep(1000);
    main_roll_digit_3.textContent = time[3];
    main_roll_digit_3.style.animationPlayState = "running";

    clearInterval(roll_interval);
    roll_interval = setInterval(roll_anim, roll_cycle_time, false, false, false, true);

    await sleep(1000);
    main_roll_digit_4.textContent = time[4];
    main_roll_digit_4.style.animationPlayState = "running";

    clearInterval(roll_interval);
    roll_interval = setInterval(roll_anim, roll_cycle_time, false, false, false, false); 

    await sleep(1000);

    clearInterval(timestamp_interval);
    main_roll_split.textContent = timestamp;
    main_roll_split.style.animationPlayState = "running";
}

async function roll() {
    let timestamps = generate_times();
    let timestamp_itr = 0;
    let latest_timestamp = Object.keys(timestamps)[0];
    let last_timestamp_death = false;

    let death_count = 0;
    let time_offset = 0;

    let past_times = [0];
    let past_timestamps = ["Start"];

    const death_chances = [0.05, 0.05, 0.43, 0.2, 0.15, 0.11, 0.30]; // ow, nt, bast, fort, blind, sh, end

    for (let i = 0; i < Object.keys(timestamps).length; i++) {
        restart_anims([main_roll_split, main_roll_digit_1, main_roll_digit_2, main_roll_digit_3, main_roll_digit_4, reload_bar]);

        if (Math.random() <= death_chances[timestamp_itr]) { // diedederest
            let lower_bound = timestamps[Object.keys(timestamps)[timestamp_itr - 1]];

            if (isNaN(lower_bound)) lower_bound = 0;

            let death_timestamp = Math.floor(Math.random() * (timestamps[latest_timestamp] - lower_bound + 1)) + lower_bound;
            let death_recovery_time = Math.floor(Math.random() * (180 - 60 + 1)) + 60;

            console.log(`${secs_to_mins_and_secs(death_timestamp)} | ${secs_to_mins_and_secs(death_recovery_time)}`);
            death_count++;
            i--;

            await rolling_sequence(`Death ${death_count}`, secs_to_mins_and_secs(death_timestamp + time_offset));
            past_times.push(death_timestamp + time_offset);
            past_timestamps.push(`Death ${death_count}`);

            console.log(past_times);

            split_info_data.icon = timestamp_icon_list[7];

            if (last_timestamp_death) {
                split_info_data.split = [`Death ${death_count - 1} -> Death ${death_count}`, secs_to_mins_and_secs(past_times.at(-1) - past_times.at(-2))];
            } else {
                split_info_data.split = [`${timestamp_list[timestamp_itr]} -> Death ${death_count}`, secs_to_mins_and_secs(past_times.at(-1) - past_times.at(-2))];
            }

            split_info_data.timestamp = [`Death ${death_count}`, secs_to_mins_and_secs(death_timestamp + time_offset)];
            time_offset += death_recovery_time + (timestamps[Object.keys(timestamps)[timestamp_itr]] - death_timestamp);
            last_timestamp_death = true;
        } else {
            await rolling_sequence(latest_timestamp, secs_to_mins_and_secs(timestamps[latest_timestamp] + time_offset));
            past_times.push(timestamps[latest_timestamp] + time_offset);
            past_timestamps.push(Object.keys(timestamps)[timestamp_itr]);

            timestamp_itr += 1;
            latest_timestamp = Object.keys(timestamps)[timestamp_itr];

            console.log(past_times);

            let prev_split_time = timestamps[Object.keys(timestamps)[timestamp_itr - 2]];

            if (timestamp_itr - 2 < 0) prev_split_time = 0;

            if (last_timestamp_death) {
                split_info_data.split = [`${past_timestamps.at(-2)} -> ${timestamp_list[timestamp_itr]}`, secs_to_mins_and_secs(past_times.at(-1) - past_times.at(-2))];
            } else {
                split_info_data.split = [`${timestamp_list[timestamp_itr - 1]} -> ${timestamp_list[timestamp_itr]}`, secs_to_mins_and_secs(past_times.at(-1) - past_times.at(-2))];
            }

            split_info_data.timestamp = [Object.keys(timestamps)[timestamp_itr - 1], secs_to_mins_and_secs(timestamps[Object.keys(timestamps)[timestamp_itr - 1]] + time_offset)];
            split_info_data.icon = timestamp_icon_list[timestamp_itr - 1];

            if (Object.keys(timestamps)[timestamp_itr - 1] == "Final Time") {
                split_info_data.gradiented = "element_1_de"
            }

            last_timestamp_death = false;
        }

        const timestamp_info_html = `
            <div class="${split_info_data.gradiented} element_2" style="margin-bottom: 30px;display: grid;">
                <div id="icon"><img src="${split_info_data.icon}" alt="timestamp info" width="100px" height="100px"></div>
                <div id="header"><h2>${split_info_data.timestamp[0]}</h2></div>
                <div id="subtext"><p>${split_info_data.split[0]}: ${split_info_data.split[1]} | ${split_info_data.timestamp[0]}: ${split_info_data.timestamp[1]} </p></div>
            </div>
        `;
        splits_div.insertAdjacentHTML("afterbegin", timestamp_info_html);

        reload_bar.style.animationPlayState = "running";

        await sleep(2000);
    }
}