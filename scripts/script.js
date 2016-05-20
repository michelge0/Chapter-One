var currentDepth;
var layers;

var dampingConstant = 5;
var scrollVelocity = 0;

function update() {
    for (var i = 0; i < layers.length; i++) {
        var elem = document.querySelector(".sp-container #layer" + i);

        var delta = layers[i].depth - currentDepth;
        var scale = delta > 0 ? 1 / (1 + Math.pow(Math.E, -delta)) + .5 :
                                1 / (1 + Math.pow(Math.E, - .5 * delta)) + .5;
        var op = delta > 0 ? Math.pow(Math.E, -5 * Math.pow(delta, 2)) :
                             Math.pow(Math.E, -1.5 * Math.pow(delta, 2));

        //elem.innerHTML += "OP: " + op + " SCALE: " + scale;
        elem.style.transform = "scale(" + scale + ")";
        elem.style.opacity = op;
    }
}

document.onkeydown = function(e) {
    // 87 w, 83 s
    if (e.keyCode == 87) {
        scrollVelocity += 1 / (1 + Math.abs(scrollVelocity));
    } else if (e.keyCode == 83) {
        scrollVelocity -= 1 / (1 + Math.abs(scrollVelocity));
    }
    update();
}

$(document).ready(function() {
    currentDepth = 0;

    $.get("reader.php", function(data) {
        layers = JSON.parse(data);

        for (var i = 0; i < layers.length; i++) {
            var container = document.createElement("div");
            var newEl = document.createElement("p");
            var header = document.createElement("h2");

            container.id = "layer" + i;
            newEl.innerHTML = layers[i].text;
            header.innerHTML = "Chapter One";

            container.appendChild(header);
            container.appendChild(newEl);
            document.querySelector(".sp-container").appendChild(container);
        }
        update();
        window.setInterval(function(){
            var newDepth = currentDepth + scrollVelocity * .1;

            // prevents user from going too far away from content
            if (newDepth < -1.5 && newDepth < currentDepth ||
                newDepth > 14 && newDepth > currentDepth) {
                velocity = 0;
                return;
            }

            currentDepth = newDepth;
            scrollVelocity -= scrollVelocity / dampingConstant;
            if (Math.abs(scrollVelocity) < .01) {
                scrollVelocity = 0;
            }
            update();
        }, 100);
    });
});