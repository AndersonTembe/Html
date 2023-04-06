class Favs {
    available = false;
    storage = null;
    types = ["Athletes", "competitions", "countries", "games", "Modalities"];
    shortcuts = ["a",   "c",            "t",        "g",     "m", ];

    constructor() {
        this.storage = window.localStorage;
        this.available = true;
        this.init();
    }

    init() {
        this.types.forEach((t) => {
            if (!this.storage.getItem(t))
                this.saveList(t, []);
        });
    }

    getList(type) {
        var iShortcut = this.shortcuts.indexOf(type)
        if (iShortcut != -1)
            type = this.types[iShortcut];

        return JSON.parse(this.storage.getItem(type.toLowerCase()));
    }

    saveList(type, list) {
        var iShortcut = this.shortcuts.indexOf(type)
        if (iShortcut != -1)
            type = this.types[iShortcut];
        
        this.storage.setItem(type.toLowerCase(), JSON.stringify(list));
    }

    get(type, id) {
        return (this.getList(type.toLowerCase()).indexOf(id) != -1) ? true : false;
    }

    add(type, id) {
        type = type.toLowerCase();

        var list = this.getList(type);
        if (!list.includes(id))
            list.push(id);
        
        this.saveList(type, list);
    }

    remove(type, id) {
        type = type.toLowerCase();

        var list = this.getList(type);
        var index = list.indexOf(id);
        list.splice(index, 1);

        this.saveList(type, list);
    }
}