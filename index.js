const canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
function fill() {
	ctx.fillStyle = "#222";
	ctx.fillRect(0, 0, ctx.canvas.width, canvas.height);
}
const map_value = (value, x1, y1, x2, y2) =>
	((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

const draw_arc = (value, max, rad) => {
	angle = map_value(value, 0, max, 0, 2 * Math.PI) - Math.PI / 2;
	ctx.beginPath();
	ctx.arc(originX, originY, rad, -Math.PI / 2, angle);
	ctx.stroke();
};
const draw_line = (value, max, rad) => {
	angle = map_value(value, 0, max, 0, 2 * Math.PI) - Math.PI / 2;
	const radius_center = rad / 8;
	const cos = Math.cos(angle),
		sin = Math.sin(angle);
	const start_point_x = radius_center * cos,
		start_point_y = radius_center * sin;
	const end_point_x = rad * cos,
		end_point_y = rad * sin;
	ctx.moveTo(originX + start_point_x, originY + start_point_y);
	ctx.lineTo(originX + end_point_x, originY + end_point_y);
	ctx.stroke();
};
const draw = (value, max, rad, color) => {
	ctx.strokeStyle = color;
	ctx.lineWidth = 10;
	ctx.lineCap = "round";
	draw_arc(value % max, max, rad);
	draw_line(value % max, max, rad);
};
const getMillis = (hr, mn, sc) => {
	let minutes = hr * 60 + mn;
	let seconds = minutes * 60 + sc;
	let millis = new Date().getMilliseconds();
	return seconds * 1000 + millis;
};
function main() {
	if (
		canvas.width != window.innerWidth ||
		canvas.height != window.innerHeight
	) {
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		radius =
			canvas.width > canvas.height ? canvas.height / 3 : canvas.width / 3;
		(originX = canvas.width / 2), (originY = canvas.height / 2);
	}
	const sc = new Date().getSeconds(),
		mn = new Date().getMinutes(),
		hr = new Date().getHours();
	const milliseconds = getMillis(hr, mn, sc);
	const seconds = milliseconds / 1000;
	const minutes = seconds / 60;
	const hours = minutes / 60;

	fill();
	draw(seconds, 60, radius, "#A8DADC");
	draw(minutes, 60, (radius * 4) / 5, "#A4DF90");
	draw(hours, 24, (radius * 3) / 5, "#e63946");
	setTimeout(main, 1);
}

main();
