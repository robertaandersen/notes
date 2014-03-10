var mouseX = 0,
mouseY = 0;
function handleMouse(evt) {
mouseX = evt.clientX - canvas.offsetLeft;
mouseY = evt.clientY - canvas.offsetTop;
// If no button is being pressed, then bail
if (!evt.which) return;
//entityManager.yoinkNearestShip(g_mouseX, g_mouseY);
}
// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);