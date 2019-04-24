const NYT = "nytimes.com";
const WAPO = "washingtonpost.com";
const CNN = "cnn.com";
const WSJ = "wsj.com";
const FOX = "foxnews.com";

const websites = [NYT, WAPO, CNN, WSJ, FOX];

function getWebsitePreviewText(site) {
    const previewText = {
        [WAPO]: "For large parts of January and February 2019, screenshots failed " +
            "only for washingtonpost.com. You may see a higher rate of blank " +
            "screenshots during this period."
    }

    // Fine with returning a default of null
    return previewText[site];
}

export {
    websites,
    getWebsitePreviewText
}
