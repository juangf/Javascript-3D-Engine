class Loader {
    constructor() {}

    load(file) {
        let data = null;

        if (file !== null) {
            let rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status === 0) {
                        data = rawFile.responseText;
                    }
                }
            };
            rawFile.send(null);
        }

        return data;
    }
}

export default Loader;