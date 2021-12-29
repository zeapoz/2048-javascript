export default class Cell {
    value = 0;

    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
    }

    updateValue(value) {
        this.value = value;
        this.updateText();
    }

    updateText() {
        if (this.value == 0) {
            this.text.innerHTML = "";
            this.text.parentElement.removeAttribute("id");
            return
        }
        this.text.innerHTML = "<b>" + this.value;
        this.text.parentElement.id = "tile-" + this.value;
    }
}
