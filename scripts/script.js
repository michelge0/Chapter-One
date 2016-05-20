var currentDepth;
var layers = [
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ante, convallis vitae dictum id, ultrices vitae dolor. Integer facilisis tellus eget enim ullamcorper, ut porta eros convallis. Duis eget lectus sed neque euismod tempor at at purus. Vestibulum est dolor, pharetra eu vehicula in, ullamcorper sit amet dolor. Nunc consectetur quam lectus, sit amet mattis odio vestibulum quis. Etiam luctus, lacus non facilisis finibus, tortor magna varius diam, vitae gravida nisl neque a felis. Nulla facilisi. Aliquam erat volutpat. Quisque in consequat ipsum, sed congue ex.",
        depth: 0
    },
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ante, convallis vitae dictum id, ultrices vitae dolor. Integer facilisis tellus eget enim ullamcorper, ut porta eros convallis. Duis eget lectus sed neque euismod tempor at at purus. Vestibulum est dolor, pharetra eu vehicula in, ullamcorper sit amet dolor. Nunc consectetur quam lectus, sit amet mattis odio vestibulum quis. Etiam luctus, lacus non facilisis finibus, tortor magna varius diam, vitae gravida nisl neque a felis. Nulla facilisi. Aliquam erat volutpat. Quisque in consequat ipsum, sed congue ex.",
        depth: 1
    },
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ante, convallis vitae dictum id, ultrices vitae dolor. Integer facilisis tellus eget enim ullamcorper, ut porta eros convallis. Duis eget lectus sed neque euismod tempor at at purus. Vestibulum est dolor, pharetra eu vehicula in, ullamcorper sit amet dolor. Nunc consectetur quam lectus, sit amet mattis odio vestibulum quis. Etiam luctus, lacus non facilisis finibus, tortor magna varius diam, vitae gravida nisl neque a felis. Nulla facilisi. Aliquam erat volutpat. Quisque in consequat ipsum, sed congue ex.",
        depth: 2
    }
]

function update() {
    for (var i = 0; i < layers.length; i++) {
        var elem = document.querySelector(".sp-container #layer" + i);

        var delta = layers[i].depth - currentDepth;
        var scale = 1 / (1 + Math.pow(Math.E, -delta)) + .5;
        var op = scale > 1 ? Math.pow(Math.E, -3 * Math.pow(delta, 2)) :
                             Math.pow(Math.E, -2 * Math.pow(delta, 2));

        //elem.innerHTML += "OP: " + op + " SCALE: " + scale;
        elem.style.transform = "scale(" + scale + ")";
        elem.style.opacity = op;
    }
}

document.onkeydown = function(e) {
    // 38 up, 40 down
    if (e.keyCode == 38) {
        currentDepth += .1;
    } else if (e.keyCode == 40) {
        currentDepth -= .1;
    }
    update();
}

$(document).ready(function() {
    currentDepth = 0;
    for (var i = 0; i < layers.length; i++) {
        var newEl = document.createElement("p");
        newEl.id = "layer" + i;
        newEl.innerHTML = layers[i].text;
        document.querySelector(".sp-container").appendChild(newEl);
    }
    update();
});